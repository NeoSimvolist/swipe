// @ts-ignore
import style from '!css-loader!sass-loader!./grid-filter-select.scss';
import {customElement, html, LitElement, property, query, unsafeCSS} from 'lit-element';
import {GridEvents} from './_models';

@customElement('ns-grid-filter-select')
export class GridFilterSelect extends LitElement {

    static get styles() {
        return unsafeCSS(style);
    }

    @property({type: String})
    name: string;

    @property({type: Object})
    filter: unknown;

    @query('input')
    private inputEl: HTMLInputElement;

    async connectedCallback() {
        super.connectedCallback();
        await this.inputEl;
        this.inputEl.addEventListener('input', this.inputChange);
    }

    disconnectedCallback() {
        this.inputEl.removeEventListener('input', this.inputChange);
        super.disconnectedCallback();
    }

    render() {
        return html`<input type="text"/>`;
    }

    inputChange = () => {
        this.dispatchEvent(new CustomEvent(GridEvents.ColumnFilter,
            {bubbles: true, composed: true, detail: {name: this.name, value: this.inputEl.value}}
        ));
    }
}
