// @ts-ignore
import style from '!css-loader!sass-loader!./grid-head-cell.scss';
import {customElement, html, LitElement, property, unsafeCSS} from 'lit-element';
import {GridSort} from './_models';

export interface IGridColumnResizeStartDetail {
    name: string,
    clientX: number,
    pointerId: number
}

@customElement('ns-grid-head-cell')
export class GridHeadCell extends LitElement {

    static get styles() {
        return unsafeCSS(style);
    }

    @property({type: String})
    name: string;

    @property({type: Boolean})
    sortable: boolean;

    @property({type: String})
    sort: GridSort;

    @property({type: Boolean})
    filterable: boolean;

    @property({type: Object})
    filter: unknown;

    @property({type: Boolean})
    resizable: boolean = true;

    render() {
        if (this.sortable) return html`<ns-grid-sorter .name="${this.name}" .sort="${this.sort}" tabindex="0"><div class="grid-head-cell-slot"><slot></slot></div></ns-grid-sorter>${this.renderFilter()}${this.renderResize()}`;
        return html`<div class="grid-head-cell-slot"><slot></slot></div>${this.renderFilter()}${this.renderResize()}`;
    }

    renderResize() {
        return html`${this.resizable ? html`<ns-grid-resizer .name="${this.name}"></ns-grid-resizer>` : null}`;
    }

    renderFilter() {
        return html`${this.filterable ? html`<ns-grid-filter .name="${this.name}" .filter="${this.filter}" .origin="${this}" tabindex="0"><slot name="filter"></slot></ns-grid-filter>` : null}`;
    }
}
