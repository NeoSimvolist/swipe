import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { ITag } from './db/tag.service';

@customElement('ns-note-list-tag')
export class NoteListTag extends LitElement {

    static styles = css`
      :host {
        display: flex;
      }
    `;

    @property({
        type: Object,
    })
    value: ITag;

    render() {
        return html`${this.value.id}: ${unsafeHTML(this.value.value)}`;
    }
}
