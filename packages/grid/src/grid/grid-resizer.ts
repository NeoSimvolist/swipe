import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {GridEvents} from './_models';
import {IGridColumnResizeStartDetail} from './grid-head-cell';

@customElement('ns-grid-resizer')
export class GridResizer extends LitElement {

    @property({type: String})
    name: string;

    static styles = css`
        :host {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 2px;
          background-color: #dee2e6;
          cursor: col-resize;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('pointerdown', this.onHeadCellResizeStart, true);
    }

    disconnectedCallback() {
        this.removeEventListener('pointerdown', this.onHeadCellResizeStart, true);
        super.disconnectedCallback();
    }

    // Пустой render ужен, т.к. без этого не работает в IE11
    render() {
        return html``;
    }

    onHeadCellResizeStart = (event: PointerEvent) => {
        this.dispatchEvent(new CustomEvent<IGridColumnResizeStartDetail>(GridEvents.ColumnResizeStart, {
            detail: {
                name: this.name,
                clientX: event.clientX,
                pointerId: event.pointerId
            },
            bubbles: true,
            composed: true
        }));
    }
}
