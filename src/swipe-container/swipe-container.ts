// @ts-ignore
import style from '!css-loader!sass-loader!./swipe-container.scss';
import {LitElement, customElement, unsafeCSS, html} from 'lit-element';

interface Point {
    x: number;
    y: number;
}

function getGesturePointFromEvent(event: TouchEvent | PointerEvent): Point {
    if ((event as TouchEvent).targetTouches) {
        return {
            x: (event as TouchEvent).targetTouches[0].clientX,
            y: (event as TouchEvent).targetTouches[0].clientY
        }
    }
    return {
        x: (event as any).clientX,
        y: (event as any).clientY
    }
}

function getOffset(value: number): 0 | 1 | -1 {
    if (value > 0) {
        return 1
    } else if (value < 0) {
        return -1;
    } else {
        return 0
    }
}

export enum SwipeItemEvents {
    SwipeItemShow = 'SwipeItemShow',
    SwipeItemHide = 'SwipeItemHide',
}

export interface ISwipeContainerOptions {
    cssTransition?: string;
    currentItemIndex?: number;
    debug?: boolean;
}

export class SwipeContainer {

    private initialPoint: Point;
    private currentPoint: Point;
    private renderPending: boolean;

    private currentItemIndex: number;
    private currentItem: HTMLElement;
    private gestureEndedOnIndex: number;

    private leftVirtualItem: HTMLElement;
    private rightVirtualItem: HTMLElement;

    private options: ISwipeContainerOptions;

    private mutationObserver: MutationObserver;

    constructor(
        private containerElement: HTMLElement,
        options: ISwipeContainerOptions = {}
    ) {
        this.containerElement.classList.add('swipe-container');
        this.options = {
            cssTransition: 'all 150ms ease-out',
            currentItemIndex: 0,
            debug: false,
            ...options
        };
        this.updateItems();
        this.mutationObserver = new MutationObserver(this.updateItems);
        this.mutationObserver.observe(this.containerElement, {childList: true});
    }

    get items(): HTMLElement[] {
        return Array.from(this.containerElement.children) as HTMLElement[];
    }

    addItem(text?: string): HTMLElement {
        const newItem = document.createElement('div');
        if (text) {
            const newContent = document.createTextNode(text);
            newItem.appendChild(newContent);
        }
        this.containerElement.appendChild(newItem);
        return newItem;
    }

    removeItem(index: number) {
        if (index > (this.items.length - 1)) return;
        if (this.currentItemIndex === index) {
            this.currentItem.dispatchEvent(new CustomEvent(SwipeItemEvents.SwipeItemHide, {bubbles: true, composed: true}));
            this.unsetCurrentItem();
            this.items[index].remove();
            return;
        }
        this.items[index].remove();
    }

    setCurrentItem(newItemIndex: number): void {
        if (this.currentItemIndex === newItemIndex) return;
        if (newItemIndex > (this.items.length - 1)) return;
        this.removeContainerListeners();
        this.addContainerListeners();
        this.currentItem && this.removeCurrentItemListeners();
        this.currentItem = this.items[newItemIndex];
        this.currentItemIndex = newItemIndex;
        this.updateItemsClasses();
        this.addCurrentItemListeners();
        this.options.debug && console.log(`SWIPE: set ${newItemIndex} item`);
    }

    clear() {
        while (this.items.length) this.removeItem(0);
    }

    updateItems = () => {
        console.log('update');
        this.setDefaultItemIfNecessaryAndPossible();
        this.updateItemsClasses();
    }

    destroy() {
        this.mutationObserver.disconnect();
        this.removeContainerListeners();
    }

    private addContainerListeners() {
        this.containerElement.addEventListener('pointerdown', this.handleGestureStart, true);
        this.containerElement.addEventListener('pointermove', this.handleGestureMove, true);
        this.containerElement.addEventListener('pointerup', this.handleGestureEnd, true);
        this.containerElement.addEventListener('pointercancel', this.handleGestureEnd, true);
    }

    private removeContainerListeners() {
        this.containerElement.removeEventListener('pointerdown', this.handleGestureStart, true);
        this.containerElement.removeEventListener('pointermove', this.handleGestureMove, true);
        this.containerElement.removeEventListener('pointerup', this.handleGestureEnd, true);
        this.containerElement.removeEventListener('pointercancel', this.handleGestureEnd, true);
    }

    private handleGestureStart = (event: TouchEvent | PointerEvent) => {
        event.preventDefault();
        if ((event as TouchEvent).touches && (event as TouchEvent).touches.length > 1) return;

        (event.target as HTMLElement).setPointerCapture((event as PointerEvent).pointerId);
        this.initialPoint = getGesturePointFromEvent(event);
        this.options.debug && console.log('SWIPE: start');
    }

    private handleGestureMove = (event: TouchEvent | PointerEvent) => {
        event.preventDefault();

        if (!this.initialPoint) return;
        this.currentPoint = getGesturePointFromEvent(event);
        this.showVirtualItems();

        if (this.renderPending) return;
        this.renderPending = true;
        requestAnimationFrame(this.render);
    }

    private handleGestureEnd = (event: TouchEvent | PointerEvent) => {
        event.preventDefault();
        if ((event as TouchEvent).touches && (event as TouchEvent).touches.length > 0) return;

        this.renderPending = false;
        (event.target as HTMLElement).releasePointerCapture((event as PointerEvent).pointerId);

        if (this.currentPoint) {
            const indexOffset = this.getIndexOffset();
            this.gestureEndedOnIndex = this.currentItemIndex + indexOffset;

            const translateX = -indexOffset * this.containerElement.offsetWidth;
            this.currentItem.style.transform = `translateX(${translateX}px)`;
            this.currentItem.style.transition = this.options.cssTransition;

            if (this.leftVirtualItem) {
                this.leftVirtualItem.style.transform = `translateX(${translateX - this.containerElement.offsetWidth}px)`;
                this.leftVirtualItem.style.transition = this.options.cssTransition;
            }

            if (this.rightVirtualItem) {
                this.rightVirtualItem.style.transition = this.options.cssTransition;
                this.rightVirtualItem.style.transform = `translateX(${translateX + this.containerElement.offsetWidth}px)`;
            }
        }

        this.initialPoint = null;
        this.currentPoint = null;
        this.options.debug && console.log('SWIPE: end');
    }

    private handleGestureTransitionEnd = (event: TransitionEvent) => {
        const visibleItems = [this.leftVirtualItem, this.rightVirtualItem, this.currentItem];
        this.hideVirtualItems();
        this.currentItem.style.transition = null;
        this.currentItem.style.transform = null;
        this.setCurrentItem(this.gestureEndedOnIndex);
        visibleItems.forEach(item => {
            if (!item || [this.leftVirtualItem, this.rightVirtualItem, this.currentItem].includes(item)) return;
            item.dispatchEvent(new CustomEvent(SwipeItemEvents.SwipeItemHide, {bubbles: true, composed: true}));
        });
    }

    private unsetCurrentItem(): void {
        this.removeContainerListeners();
        this.removeCurrentItemListeners();
        this.currentItem = undefined;
        this.currentItemIndex = undefined;
    }

    private updateItemsClasses() {
        this.items.forEach((item, index) => {
            item.classList.add('swipe-item');
            if (index === this.currentItemIndex) {
                item.classList.add('swipe-item--active');
                item.classList.remove('swipe-item--virtual');
                item.classList.remove('swipe-item--hide');
                return;
            }
            item.classList.remove('swipe-item--active');
            item.classList.add('swipe-item--virtual');
            item.classList.add('swipe-item--hide');
        });
    }

    private getIndexOffset(): number {
        const diffX = this.currentPoint.x - this.initialPoint.x;
        if (diffX === 0) return 0;

        const offsetWidth = this.currentItem.offsetWidth;
        const sensitiveWidth = diffX < 0 ? offsetWidth * (1 / 4) : offsetWidth * (3 / 4);
        const indexOffset = getOffset(Math.floor((diffX + sensitiveWidth) / offsetWidth));
        if (indexOffset > 0 && this.currentItemIndex > 0) {
            return -1;
        } else if (indexOffset < 0 && this.currentItemIndex < this.items.length - 1) {
            return 1;
        } else {
            return 0;
        }
    }

    private render = () => {
        if (!this.renderPending) return;
        const transformX = this.currentPoint.x - this.initialPoint.x;
        this.currentItem.style.transform = `translateX(${transformX}px)`;
        if (this.leftVirtualItem) {
            this.leftVirtualItem.style.transform = `translateX(${transformX - this.containerElement.offsetWidth}px)`;
        }
        if (this.rightVirtualItem) {
            this.rightVirtualItem.style.transform = `translateX(${transformX + this.containerElement.offsetWidth}px)`;
        }
        this.renderPending = false;
    }

    private addCurrentItemListeners() {
        this.currentItem.addEventListener('transitionend', this.handleGestureTransitionEnd, true);
        this.currentItem.addEventListener('transitioncancel', this.handleGestureTransitionEnd, true);
    }

    private removeCurrentItemListeners() {
        this.currentItem.removeEventListener('transitionend', this.handleGestureTransitionEnd, true);
        this.currentItem.removeEventListener('transitioncancel', this.handleGestureTransitionEnd, true);
    }

    private showVirtualItems() {
        if (!this.leftVirtualItem) {
            this.leftVirtualItem = this.currentItemIndex === 0 ? null : this.items[this.currentItemIndex - 1];
            if (this.leftVirtualItem) {
                this.leftVirtualItem.classList.remove('swipe-item--hide');
                this.leftVirtualItem.dispatchEvent(new CustomEvent(SwipeItemEvents.SwipeItemShow, {bubbles: true, composed: true}));
            }
        }

        if (!this.rightVirtualItem) {
            this.rightVirtualItem = this.currentItemIndex === this.items.length - 1 ? null : this.items[this.currentItemIndex + 1];
            if (this.rightVirtualItem) {
                this.rightVirtualItem.classList.remove('swipe-item--hide');
                this.rightVirtualItem.dispatchEvent(new CustomEvent(SwipeItemEvents.SwipeItemShow, {bubbles: true, composed: true}));
            }
        }
    }

    private hideVirtualItems() {
        if (this.leftVirtualItem) {
            this.hideVirtualItem(this.leftVirtualItem);
            this.leftVirtualItem = null;
        }
        if (this.rightVirtualItem) {
            this.hideVirtualItem(this.rightVirtualItem);
            this.rightVirtualItem = null;
        }
    }

    private hideVirtualItem(virtualItem: HTMLElement) {
        virtualItem.style.transition = null;
        virtualItem.style.transform = null;
        virtualItem.classList.add('swipe-item--hide');
    }

    private setDefaultItemIfNecessaryAndPossible() {
        if (this.currentItem) return;
        if (this.options.currentItemIndex >= this.items.length) return;
        this.setCurrentItem(this.options.currentItemIndex);
        this.currentItem.dispatchEvent(new CustomEvent(SwipeItemEvents.SwipeItemShow, {bubbles: true, composed: true}));
    }
}

@customElement('ns-swipe-container')
export class SwipeContainerElement extends LitElement {

    static get styles() {
        return unsafeCSS(style);
    }

    swipeContainer: SwipeContainer;

    render() {
        return html`<slot></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();
        this.swipeContainer = new SwipeContainer(this);
    }

    disconnectedCallback() {
        this.swipeContainer.destroy();
        super.disconnectedCallback();
    }
}
