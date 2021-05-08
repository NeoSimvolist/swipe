// @ts-ignore
import style from '!css-loader!sass-loader!./overlay.scss';
import {customElement, html, LitElement, property, unsafeCSS} from 'lit-element';
import {OverlayEvents} from './_models';

@customElement('ns-overlay')
export class Overlay extends LitElement {

    static get styles() {
        return unsafeCSS(style);
    }

    @property({type: Object})
    origin: HTMLElement;

    private timoutHandle: NodeJS.Timeout;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('tabIndex', '-1');
        this.addEventListener('focusout', this.onFocusOut);
        this.addEventListener('focusin', this.onFocusIn);
        window.addEventListener('resize', this.updatePosition);
        // true нужен чтобы реакция была на скролл в любом родительском контейнере
        window.addEventListener('scroll', this.updatePosition, true);
        this.focus();
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.updatePosition, true);
        window.removeEventListener('resize', this.updatePosition);
        this.removeEventListener('focusin', this.onFocusIn);
        this.removeEventListener('focusout', this.onFocusOut);
        super.disconnectedCallback();
    }

    render() {
        return html`<slot></slot>`;
    }

    updated(props: Map<string, unknown>) {
        if (!props.has('origin')) return;
        this.updatePosition();
    }

    private onFocusIn = () => {
        clearTimeout(this.timoutHandle);
    }

    private onFocusOut = (event) => {
        this.timoutHandle = setTimeout(() => {
            this.dispatchEvent(new CustomEvent(OverlayEvents.OverlayFocusOut,
                {bubbles: true, composed: true, detail: {sourceEvent: event}}
            ));
        });
    }

    private updatePosition = () => {
        if (!this.origin) return;
        this.style.left = this.origin.getBoundingClientRect().left + 'px';
        this.style.top = this.origin.getBoundingClientRect().bottom + 'px';
    }
}
