import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dateDirective } from '../core/directives/date.directive';

@customElement('ns-note-date-filter')
export class DateFilter extends LitElement {

    static styles = css`
      :host {
        display: flex;
      }
    `;

    @property({
        type: Number
    })
    current: number | null;

    render() {
        return html`
            <button @click="${this.today}">Сегодня</button>
            <button @click="${this.downDate}" .disabled=${!this.current}><</button>
            ${dateDirective(this.current)}
            <button @click="${this.upDate}" .disabled=${!this.current}>></button>
            <button @click="${this.clear}">Все</button>
        `;
    }

    clear() {
        this.current = null;
        this.dispatchEvent(new CustomEvent('nsNoteDateFilter', {bubbles: true, composed: true, detail: this.current}));
    }

    today() {
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        this.current = currentDate.getTime();
        this.dispatchEvent(new CustomEvent('nsNoteDateFilter', {bubbles: true, composed: true, detail: this.current}));
    }

    downDate() {
        const currentDate = new Date(this.current);
        currentDate.setHours(0,0,0,0);
        currentDate.setDate(currentDate.getDate() - 1);
        this.current = currentDate.getTime();
        this.dispatchEvent(new CustomEvent('nsNoteDateFilter', {bubbles: true, composed: true, detail: this.current}));
    }

    upDate() {
        const currentDate = new Date(this.current);
        currentDate.setHours(0,0,0,0);
        currentDate.setDate(currentDate.getDate() + 1);
        this.current = currentDate.getTime();
        this.dispatchEvent(new CustomEvent('nsNoteDateFilter', {bubbles: true, composed: true, detail: this.current}));
    }
}
