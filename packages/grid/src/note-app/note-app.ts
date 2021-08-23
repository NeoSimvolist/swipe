import {LitElement, css, html} from 'lit';
import { customElement } from 'lit/decorators.js';
import { noteService } from './db/note.service';

@customElement('ns-note-app')
export class NoteApp extends LitElement {

    static styles = css`
      ns-list {
        height: 100px;
      }
    `;

    noteService = noteService;
    value: string;
    notes: Array<any> = [];

    render() {
        return html`
            <ns-rich-input .value="${this.value}" @richValueChange="${this.onRichInputChange}" @keypress="${this.onKeypress}"></ns-rich-input>
<!--            <button @click="${this.onSubmit}">add</button><br>-->
            <ns-list .rows="${this.notes}"></ns-list>
        `;
    }

    firstUpdated() {
        this.showLastNote();
        this.showNotes();
    }

    onKeypress(event: KeyboardEvent) {
        if (!event.ctrlKey || event.code !== 'Enter') return;
        this.onSubmit();
    }

    onSubmit() {
        this.noteService.insert({value: this.value, created: (new Date()).getTime()})
            .then(() => {
                this.value = '';
                this.requestUpdate();
                this.showNotes();
            });
    }

    onRichInputChange(e: CustomEvent<string>) {
        this.value = e.detail;
        this.requestUpdate();
    }

    private showLastNote() {
        this.noteService.last().then(note => {
            if (!note) return;
            this.value = note.value;
            this.requestUpdate();
        });
    }

    private showNotes() {
        this.noteService.search()
            .then(notes => {
                this.notes = notes.map(note => note.value);
                this.requestUpdate();
            });
    }
}
