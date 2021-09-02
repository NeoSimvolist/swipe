import {LitElement, css, html} from 'lit';
import { customElement } from 'lit/decorators.js';
import { noteService } from './db/note.service';

@customElement('ns-note-app')
export class NoteApp extends LitElement {

    static styles = css`
      :host {
        display: flex;
        flex-direction: column;
        height: 500px;
      }
      ns-rich-input {
        height: 70px;
      }
      ns-list {
        flex: 1 1 auto;
        min-height: 0;
      }
    `;

    noteService = noteService;
    value: string;
    notes: string[] = [];

    render() {
        return html`
            <ns-rich-input .value="${this.value}" @richValueChange="${this.onRichInputChange}" @keypress="${this.onKeypress}"></ns-rich-input>
<!--            <button @click="${this.onSubmit}">add</button><br>-->
            <ns-list .rows="${this.notes}" itemTagName="ns-note-list-note" minRowHeight="70"></ns-list>
        `;
    }

    firstUpdated() {

        this.showLastNote();
        this.showNotes();
        // this.runGenerateData();
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
                this.notes = notes.map(note => JSON.stringify(note));
                this.requestUpdate();
            });
    }

    private runGenerateData() {
        setInterval(() => {
            fetch('https://fish-text.ru/get').then(response => response.json()).then((data: {text: string}) => {
                if (!data?.text) return;
                this.value = data.text
                this.requestUpdate();
                setTimeout(() => {
                    this.onSubmit();
                }, 300);
            });
        }, 1000);
    }
}
