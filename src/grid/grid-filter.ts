// @ts-ignore
import style from '!css-loader!sass-loader!./grid-filter.scss';
import {LitElement, unsafeCSS, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {GridEvents} from './_models';
import {OverlayEvents} from '../overlay/_models';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
  <style>
    @font-face {
      font-family: 'ns-grid-filter-icon';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAASgAAsAAAAABFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFKmNtYXAAAAFoAAAAVAAAAFQXVtKHZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAJgAAACYHFsupGhlYWQAAAJcAAAANgAAADYc2rLCaGhlYQAAApQAAAAkAAAAJAexA8ZobXR4AAACuAAAABQAAAAUCgAAEWxvY2EAAALMAAAADAAAAAwAKABgbWF4cAAAAtgAAAAgAAAAIAAHABtuYW1lAAAC+AAAAYYAAAGGmUoJ+3Bvc3QAAASAAAAAIAAAACAAAwAAAAMDAAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QADwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkA//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAR/8kD7wPAABgAAAEeARURFBY/AT4BNRE0NjcBNiYjISIGFwEBhggJJhCBDQ4JCAF1FRkf/GgfGRUBdQHcCRYM/i8VEQ+VEBQQAR8MFgkBlBc5ORf+bAAAAAABAAAAAAAAKJ6Pv18PPPUACwQAAAAAANzmtx4AAAAA3Oa3HgAA/8kD7wPAAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAPvAAEAAAAAAAAAAAAAAAAAAAAFBAAAAAAAAAAAAAAAAgAAAAQAABEAAAAAAAoAFAAeAEwAAQAAAAUAGQABAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGljb21vb24AaQBjAG8AbQBvAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGljb21vb24AaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcmljb21vb24AaQBjAG8AbQBvAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
`;

document.head.appendChild($_documentContainer.content);

@customElement('ns-grid-filter')
export class GridFilter extends LitElement {

    @property({type: String})
    name: string;

    @property({type: Object})
    filter: string;

    @state()
    isOpened: boolean;

    @property({type: Object})
    origin: HTMLElement;

    static get styles() {
        return unsafeCSS(style);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.open, true);
        this.addEventListener('keypress', this.onKeypress, true);
        this.addEventListener(OverlayEvents.OverlayFocusOut, this.onOverlayFocusOut);
    }

    disconnectedCallback() {
        this.removeEventListener(OverlayEvents.OverlayFocusOut, this.onOverlayFocusOut);
        this.removeEventListener('keypress', this.onKeypress, true);
        this.removeEventListener('click', this.open, true);
        super.disconnectedCallback();
    }

    render() {
        return html`${this.renderOverlay()}`;
    }

    renderOverlay() {
        return html`${this.isOpened ? html`<ns-overlay .origin="${this.origin}"><slot></slot></ns-overlay>` : null}`;
    }

    onKeypress = (e: KeyboardEvent) => {
        if (e.code !== 'Enter' && e.code !== 'Space') return;
        // Иначе срабатывает сколлинг при нажатии на Space
        e.preventDefault();
        this.open();
    }

    open = () => {
        this.isOpened = true;
        this.dispatchEvent(new CustomEvent(GridEvents.ColumnFilterDropDown, {
            detail: {
                name: this.name
            },
            bubbles: true,
            composed: true
        }));
    }

    onOverlayFocusOut = () => {
        this.isOpened = false;
    }
}
