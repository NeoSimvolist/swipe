import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {GridEvents} from './_models';

@customElement('ns-grid-filter-select')
export class GridFilterSelect extends LitElement {

    static styles = css`
        :host {
          overflow: hidden;
          text-overflow: ellipsis;
          top: 0;
          position: relative;
          box-sizing: border-box;
        }
    `;

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
