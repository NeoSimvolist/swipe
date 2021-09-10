import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ISearchFilter, noteService } from './db/note.service';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomDate() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + getRandomArbitrary(-2, 2));
    return date.getTime();
}

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
    currentDate: number | null = null;
    searchFilter: ISearchFilter | null;

    render() {
        return html`
            <ns-rich-input .value="${this.value}" @richValueChange="${this.onRichInputChange}"
                           @keypress="${this.onKeypress}"></ns-rich-input>
            <ns-note-date-filter .current="${this.currentDate}"
                                 @nsNoteDateFilter="${this.onChangeDate}"></ns-note-date-filter>
            <ns-list .rows="${this.notes}" itemTagName="ns-note-list-note" minRowHeight="70"></ns-list>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.currentDate = getRandomDate();
        this.setFilterByDate(this.currentDate);
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
        this.noteService.insert({value: this.value, created: getRandomDate()})
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

    onChangeDate(event: CustomEvent<number>) {
        this.setFilterByDate(event.detail);
        this.showNotes();
    }

    private setFilterByDate(date: number) {
        if (date) {
            const lower = new Date(date);
            const upper = new Date(lower.getTime());
            upper.setDate(lower.getDate() + 1);
            this.searchFilter = {date: {lower: lower.getTime(), upper: upper.getTime()}};
        } else {
            this.searchFilter = null;
        }
    }

    private showLastNote() {
        this.noteService.last().then(note => {
            if (!note) return;
            this.value = note.value;
            this.requestUpdate();
        });
    }

    private showNotes() {
        this.noteService.search(this.searchFilter)
            .then(notes => {
                this.notes = notes.map(note => JSON.stringify(note));
                this.requestUpdate();
            });
    }

    private runGenerateData() {
        setInterval(() => {
            fetch('https://fish-text.ru/get').then(response => response.json()).then((data: { text: string }) => {
                if (!data?.text) return;
                this.value = data.text
                this.requestUpdate();
                setTimeout(() => {
                    this.onSubmit();
                }, 200);
            });
        }, 500);
    }
}
