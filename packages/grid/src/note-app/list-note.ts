import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { INote } from './db/note.service';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

@customElement('ns-note-list-note')
export class NoteListNote extends LitElement {

    static styles = css`
      :host {
        min-height: 70px;
        display: flex;
      }

      :host div {
        flex-grow: 1;
        margin: 10px 10px 0 10px;
        padding: 10px;
        overflow: hidden;
        background: yellow;
        border-radius: 10px;
      }
    `;

    @property({
        type: Object,
    })
    value: INote;

    render() {
        return html`
            <div>${unsafeHTML(this.value.value)}</div>
        `;
    }
}
