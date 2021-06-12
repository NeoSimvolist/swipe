// @ts-ignore
import style from '!css-loader!sass-loader!./grid-head.scss';
import {LitElement, unsafeCSS, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {GridEvents} from './_models';
import {IGridColumnResizeStartDetail} from './grid-head-cell';

export interface IGridColumnResizeProcessDetail {
    name: string;
    width: number
}

@customElement('ns-grid-head')
export class GridHead extends LitElement {

    private resizeColumnName: string | null;
    private resizeColumnInitialWidth: number | null;
    private resizeInitialClientX: number | null;

    static get styles() {
        return unsafeCSS(style);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(GridEvents.ColumnResizeStart, this.resizeStart, true);
        this.addEventListener('pointermove', this.resizeProcess, true);
        this.addEventListener('pointerup', this.resizeCancel, true);
        this.addEventListener('pointercancel', this.resizeCancel, true);
    }

    disconnectedCallback() {
        this.removeEventListener(GridEvents.ColumnResizeStart, this.resizeStart, true);
        this.removeEventListener('pointermove', this.resizeProcess, true);
        this.removeEventListener('pointerup', this.resizeCancel, true);
        this.removeEventListener('pointercancel', this.resizeCancel, true);
        super.disconnectedCallback();
    }

    render() {
        return html`<slot></slot>`;
    }

    private resizeStart = (event: CustomEvent<IGridColumnResizeStartDetail>) => {
        this.resizeColumnName = event.detail.name;
        // TODO переделать на querySelector(`[:scope > name=${this.resizeColumnName}]`) и альтернативу для IE11(:scope не поддерживает).
        // Иначе есть шанс захватить не столбец, а что-то еще
        this.resizeColumnInitialWidth = this.querySelector(`[name=${this.resizeColumnName}]`).clientWidth;
        this.resizeInitialClientX = event.detail.clientX;
        this.setPointerCapture(event.detail.pointerId);

    }

    private resizeCancel = (event: PointerEvent) => {
        this.resizeColumnName = null;
        this.resizeColumnInitialWidth = null;
        this.resizeInitialClientX = null;
        this.releasePointerCapture(event.pointerId);
    }

    private resizeProcess = (event: PointerEvent) => {
        if (!this.resizeColumnName) return;
        const width = this.resizeColumnInitialWidth + event.clientX - this.resizeInitialClientX;
        this.dispatchEvent(new CustomEvent<IGridColumnResizeProcessDetail>(GridEvents.ColumnResizeProcess, {
            detail: {
                name: this.resizeColumnName,
                width
            },
            // Чтобы событие всплывало через shadowDom
            composed: true
        }));
    }
}
