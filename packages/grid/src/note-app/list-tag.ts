import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { ITag } from './db/tag.service';
import { IListItem } from '../list/_models';

@customElement('ns-note-list-tag')
export class NoteListTag extends LitElement implements IListItem<ITag> {

    static styles = css`
      :host {
        display: flex;
        min-height: 35px;
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
