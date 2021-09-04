import {LitElement, css, html, PropertyValues, nothing} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {virtualScrollDriver} from '../core/virtual-scroll-driver';
import {ListEvents} from './_models';
import debounce from 'debounce';
import { literal, unsafeStatic, html as staticHtml } from 'lit/static-html.js';

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
    rows: unknown[];

    @property({type: Number})
    minRowHeight: number = 35;

    @property({type: String})
    itemTagName: string;

    @query('.list')
    private listEl: HTMLElement;

    @state()
    private scrollState: any = {};

    private isScrollDown: boolean;

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
                    ${this.renderTopPlaceholder()}
                    ${this.scrollState.middleItemCount ? this.renderBodyRows(this.scrollState.firstMiddleItem, this.scrollState.middleItemCount) : nothing}
                    ${this.renderMiddlePlaceholder()}
                    ${this.scrollState.lastItemCount ? this.renderBodyRows(this.rows.length - this.scrollState.lastItemCount, this.scrollState.lastItemCount) : nothing}
                </div>
            </div>`;
    }

    renderTopPlaceholder() {
        return this.scrollState.topPlaceholderHeight ? html`<div style=${styleMap({height: this.scrollState.topPlaceholderHeight + 'px'})}></div>` : nothing;
    }

    renderMiddlePlaceholder() {
        return this.scrollState.middlePlaceholderHeight ? html`<div style=${styleMap({height: this.scrollState.middlePlaceholderHeight + 'px'})}></div>` : nothing;
    }

    renderBodyRows(start: number, count: number) {
        return html`${this.rows?.slice(start, start + count)?.map((row, index) => this.renderBodyRow(row, start + index))}`;
    }

    renderBodyRow(row: unknown, index: number) {
        if (this.itemTagName) {
            const tagName = literal`${unsafeStatic(this.itemTagName)}`;
            return staticHtml`<${tagName} value="${row}" data-index="${index}"></${tagName}>`;
        }

        return html`<div class="list-row" data-index="${index}">${row}</div>`;
    }

    updated(changedProperties: PropertyValues) {
        if (!changedProperties.has('rows')) return;
        this.scrollState = this.getScrollState();
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
        return virtualScrollDriver(
            {
                totalItems: this.rows.length,
                minRowHeight: this.minRowHeight,
                viewportHeight: this.getBoundingClientRect().height,
                scrollTop: this.listEl?.scrollTop ?? 0
            },
            this.scrollState,
            itemIndex => this.shadowRoot.querySelector(`[data-index="${itemIndex}"`)?.getBoundingClientRect().height ?? 0
        );
    }
}
