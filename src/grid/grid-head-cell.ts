import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {GridSort} from './_models';

export interface IGridColumnResizeStartDetail {
    name: string,
    clientX: number,
    pointerId: number
}

@customElement('ns-grid-head-cell')
export class GridHeadCell extends LitElement {

    static styles = css`
        :host {
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          top: 0;
          position: relative;
          padding: 8px;
          box-sizing: border-box;
        }

        :host ns-grid-filter {
          margin-left: 4px;
        }
        
        :host .grid-head-cell-slot {
          flex-grow: 1;
        }
    `;

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
