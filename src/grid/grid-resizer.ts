// @ts-ignore
import style from '!css-loader!sass-loader!./grid-resizer.scss';
import {customElement, html, LitElement, property, unsafeCSS} from 'lit-element';
import {GridEvents} from './_models';
import {IGridColumnResizeStartDetail} from './grid-head-cell';

@customElement('ns-grid-resizer')
export class GridResizer extends LitElement {

    @property({type: String})
    name: string;

    static get styles() {
        return unsafeCSS(style);
    }

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
