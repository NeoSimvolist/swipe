import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('ns-rich-input')
export class RichInput extends LitElement {

    static styles = css`
        :host {
          display: flex;
          min-height: 100px;
          max-height: 200px;
          border: 1px solid #eee;
        }
        :host div {
          flex: 1 1 auto;
          overflow: auto;
        }
      `;

    @property({type: String})
    value: string;

    @query('.input')
    private inputEl: HTMLElement;

    private get inputElValue() {
        return this.inputEl.innerHTML;
    }

    private set inputElValue(value) {
        this.inputEl.innerHTML = value;
    }

    render() {
        return html`
            <div contenteditable="true" class="input" @input="${this.valueChange}"></div>  
        `;
    }

    /**
     * Проверяет нужно ли перерендерить value
     */
    shouldUpdate(changedProperties: PropertyValues): boolean {
        if (!changedProperties.has('value')) return true;
        return this.value !== this.inputElValue;
    }

    /**
     * Рендерит входящее значение value
     */
    updated(changedProperties: PropertyValues) {
        if (!changedProperties.has('value')) return;
        this.inputElValue = this.value;
    }

    /**
     * Испускает значение value при вводе
     */
    valueChange() {
        this.dispatchEvent(new CustomEvent('richValueChange', {bubbles: true, composed: true, detail: this.inputElValue}));
    }
}
