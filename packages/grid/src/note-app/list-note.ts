import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { INote } from './db/note.service';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { dateDirective } from '../core/directives/date.directive';

@customElement('ns-note-list-note')
export class NoteListNote extends LitElement {

    static styles = css`
      :host {
        min-height: 70px;
        display: flex;
      }

      :host .note {
        flex-grow: 1;
        margin: 10px 10px 0 10px;
        padding: 10px;
        overflow: hidden;
        background: yellow;
        border-radius: 10px;
      }

      :host .date {
        font-size: 12px;
        color: #a2a244;
        margin-top: 5px;
      }
    `;

    @property({
        type: Object,
    })
    value: INote;

    render() {
        return html`
            <div class="note">
                ${unsafeHTML(this.value.value)}
                <div class="date">${dateDirective(this.value.created)}</div>
            </div>
        `;
    }
}
