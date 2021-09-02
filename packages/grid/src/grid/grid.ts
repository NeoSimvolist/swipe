import {LitElement, css, html} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {IGridColumnResizeProcessDetail} from './grid-head';
import {virtualScrollDriver} from '../core/virtual-scroll-driver';
import {GridEvents, IGridColumn, IGridColumnState, TGridColumnsState} from './_models';
import {literal, html as staticHtml, unsafeStatic} from 'lit/static-html.js';
import debounce from 'debounce';

@customElement('ns-grid')
export class Grid extends LitElement {

    static styles = css`
        :host {
          display: flex;
          font-family: var(--ns-grid-font-family);
          font-size: var(--ns-grid-font-size);
        }
        
        :host .grid {
          position: relative;
          flex-grow: 1;
          flex-direction: column;
          border-spacing: 0;
          overflow-y: auto;
          overflow-anchor: none;
        }
        
        :host .grid-body {
          overflow: hidden;
        }
        
        :host .grid-row {
          display: flex;
          flex-grow: 1;
        }
        
        :host .grid-row:not(:last-child) {
          border-bottom: 1px solid #dee2e6;
        }
        
        :host .grid-cell {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 8px;
          box-sizing: border-box;
        }
      `;

    @property({type: Array})
    columns: IGridColumn[];

    @property({type: Object, reflect: true})
    columnsState: TGridColumnsState;

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
    limit: number = 100;

    @property({type: Number})
    minRowHeight: number = 35;

    @query('.grid')
    private gridEl: HTMLElement;

    @query('ns-grid-head')
    private headEl: HTMLElement;

    @state()
    private scrollState: any = {};

    private isScrollDown: boolean;
    private _rows: unknown[];

    constructor() {
        super();
        this.columnsState = {};
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(GridEvents.ColumnResizeProcess, this.columnResizeProcess, true);
        queueMicrotask(() => {
            this.dispatchEvent(new CustomEvent(GridEvents.Init, {
                bubbles: true,
                composed: true,
                detail: this
            }));
        });
    }

    disconnectedCallback() {
        this.removeEventListener(GridEvents.ColumnResizeProcess, this.columnResizeProcess, true);
        super.disconnectedCallback();
    }

    render() {
        return html`
            <div 
                @scroll="${this.onScroll}"
                class="grid"
            >
                <ns-grid-head>
                    <tr>${this.columns?.map(column => this.renderHeadCell(column, this.columnsState?.[column.name]))}
                </ns-grid-head>
                <div 
                    class="grid-body"
                    style=${styleMap(this.scrollState.targetHeight ? {height: this.scrollState.targetHeight + 'px'} : {})}
                >
                    <div style=${styleMap({height: this.scrollState.topPlaceholderHeight + 'px'})}></div>
                    ${this.rows?.slice(this.scrollState.firstMiddleItem, this.scrollState.firstMiddleItem + this.scrollState.middleItemCount)?.map(row => this.renderBodyRow(row, this.columns))}
                    <div style=${styleMap({height: this.scrollState.middlePlaceholderHeight + 'px'})}></div>
                    ${this.rows?.slice(-this.scrollState.lastItemCount)?.map(row => this.renderBodyRow(row, this.columns))}
                </div>
            </div>`;
    }

    renderHeadCell(column: IGridColumn, columnState: IGridColumnState) {
        return html
            `<ns-grid-head-cell
                style=${styleMap({width: (columnState?.width ? columnState.width + 'px' : null) || column.width})}
                ?sortable="${column.sortable}"
                .sort="${columnState?.sort}"
                ?filterable="${column.filterable}"
                .filter="${columnState?.filter}"
                ?resizable=${column.resizable}
                name="${column.name}"
            >${column.title || column.name}${this.renderHeadCellFilter(column, columnState)}</ns-grid-head-cell>`;
    }

    renderHeadCellFilter(column: IGridColumn, columnState: IGridColumnState) {
        if (!column.filterable || !column.filterTagName) return null;
        const tagName = literal`${unsafeStatic(column.filterTagName)}`;
        return staticHtml`<${tagName} .name="${column.name}" .filter="${columnState?.filter}" slot="filter"></${tagName}>`;
    }

    renderBodyRow(row: unknown, columns: IGridColumn[]) {
        return html`<div class="grid-row">${columns?.map(column => this.renderBodyCell(row[column.name], column, this.columnsState[column.name]))}</div>`;
    }

    renderBodyCell(value: unknown, column: IGridColumn, columnState: IGridColumnState) {
        return html`<div class="grid-cell" style=${styleMap({width: (columnState?.width ? columnState.width + 'px' : null) || column.width})}>${value}</div>`;
    }

    setColumnState(columnName: string, columnState: Partial<IGridColumnState>) {
        this.columnsState = {
            ...this.columnsState,
            [columnName]: {...this.columnsState[columnName], ...columnState}
        };
    }

    /**
     * Испускает событие изменения ширины столбца
     */
    private columnResizeProcess = (event: CustomEvent<IGridColumnResizeProcessDetail>) => {
        this.dispatchEvent(new CustomEvent(GridEvents.UpdateState, {
            bubbles: true,
            composed: true,
            detail: event.detail
        }));
    }

    /**
     * Обработчик скроллинга контента
     */
    private onScroll = () => {
        this.scrollState = this.getScrollState();
        const deltaY = this.scrollState.targetHeight - (this.scrollState.viewportHeight + this.gridEl.scrollTop);
        const isScrollDown = deltaY < this.scrollState.viewportHeight;
        isScrollDown && !this.isScrollDown && this.onScrollDownProcess();
        this.isScrollDown = isScrollDown;
    }

    /**
     * Испускает событие когда прокрутка достигает самого низа
     */
    private onScrollDownProcess = debounce(() => {
        this.dispatchEvent(new CustomEvent(GridEvents.ScrollDown, {bubbles: true, composed: true}));
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
                viewportHeight: this.getBoundingClientRect().height - this.headEl?.getBoundingClientRect().height ?? 0,
                scrollTop: this.gridEl?.scrollTop ?? 0
            },
            this.scrollState,
            function getRenderedItemHeight(itemIndex) {
                return minRowHeight;
            }
        );
    }
}
