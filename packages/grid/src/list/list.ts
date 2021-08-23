import {LitElement, css, html} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {virtualScrollDriver} from '../core/virtual-scroll-driver';
import {ListEvents} from './_models';
import debounce from 'debounce';

@customElement('ns-list')
export class List extends LitElement {

    static styles = css`
        :host {
          display: flex;
          font-family: var(--ns-grid-font-family);
          font-size: var(--ns-grid-font-size);
        }
        
        :host .list {
          position: relative;
          flex-grow: 1;
          flex-direction: column;
          border-spacing: 0;
          overflow-y: auto;
          overflow-anchor: none;
        }
        
        :host .list-body {
          overflow: hidden;
        }
        
        :host .list-row {
          display: flex;
          flex-grow: 1;
          padding: 8px;
        }
        
        :host .list-row:not(:last-child) {
          border-bottom: 1px solid #dee2e6;
        }
      `;

    @property({type: Array})
    get rows(): unknown[] {
        return this._rows;
    }

    set rows(value: unknown[]) {
        const oldValue = this._rows;
        this._rows = value;
        this.scrollState = this.getScrollState();
        this.requestUpdate('rows', oldValue);
    }

    @property({type: Number})
    minRowHeight: number = 35;

    @query('.list')
    private listEl: HTMLElement;

    @state()
    private scrollState: any = {};

    private isScrollDown: boolean;
    private _rows: unknown[];

    render() {
        return html`
            <div 
                @scroll="${this.onScroll}"
                class="list"
            >
                <div 
                    class="list-body"
                    style=${styleMap(this.scrollState.targetHeight ? {height: this.scrollState.targetHeight + 'px'} : {})}
                >
                    <div style=${styleMap({height: this.scrollState.topPlaceholderHeight + 'px'})}></div>
                    ${this.rows?.slice(this.scrollState.firstMiddleItem, this.scrollState.firstMiddleItem + this.scrollState.middleItemCount)?.map(row => this.renderBodyRow(row))}
                    <div style=${styleMap({height: this.scrollState.middlePlaceholderHeight + 'px'})}></div>
                    ${this.rows?.slice(-this.scrollState.lastItemCount)?.map(row => this.renderBodyRow(row))}
                </div>
            </div>`;
    }

    renderBodyRow(row: unknown) {
        return html`<div class="list-row">${row}</div>`;
    }

    /**
     * Обработчик скроллинга контента
     */
    private onScroll = () => {
        this.scrollState = this.getScrollState();
        const deltaY = this.scrollState.targetHeight - (this.scrollState.viewportHeight + this.listEl.scrollTop);
        const isScrollDown = deltaY < this.scrollState.viewportHeight;
        isScrollDown && !this.isScrollDown && this.onScrollDownProcess();
        this.isScrollDown = isScrollDown;
    }

    /**
     * Испускает событие когда прокрутка достигает самого низа
     */
    private onScrollDownProcess = debounce(() => {
        this.dispatchEvent(new CustomEvent(ListEvents.ScrollDown, {bubbles: true, composed: true}));
    }, 200);

    /**
     * Возвращает состояние виртуального скроллинга
     */
    private getScrollState() {
        const minRowHeight = this.minRowHeight;
        return virtualScrollDriver(
            {
                totalItems: this.rows.length,
                minRowHeight: this.minRowHeight,
                viewportHeight: this.getBoundingClientRect().height,
                scrollTop: this.listEl?.scrollTop ?? 0
            },
            this.scrollState,
            function getRenderedItemHeight(itemIndex) {
                return minRowHeight;
            }
        );
    }
}
