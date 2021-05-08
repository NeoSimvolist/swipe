// @ts-ignore
import style from '!css-loader!sass-loader!./grid.scss';
import {LitElement, customElement, unsafeCSS, property, state, query, html} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';
import {IGridColumnResizeProcessDetail} from './grid-head';
import {virtualScrollDriver} from '../core/virtual-scroll-driver';
import {debounce} from "debounce";
import {GridEvents, IGridColumn, IGridColumnState, TGridColumnsState} from './_models';

@customElement('ns-grid')
export class Grid extends LitElement {

    static get styles() {
        return unsafeCSS(style);
    }

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
        if (!column.filterable) return null;
        // TODO реализовать возможность менять тип фильтра (ns-grid-filter-select)
        return html`<ns-grid-filter-select .name="${column.name}" .filter="${columnState?.filter}" slot="filter"></ns-grid-filter-select>`;
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
        this.dispatchEvent(new CustomEvent(GridEvents.UpdateState, {bubbles: true, composed: true, detail: event.detail}));
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
