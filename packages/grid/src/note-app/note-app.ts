import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ISearchFilter, noteService } from './db/note.service';
import { tagService } from './db/tag.service';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomDate() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + getRandomArbitrary(-2, 2));
    return date.getTime();
}

function getCurrentDate() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
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
      
      .app-container {
        display: flex;
        height: 100%;
        min-height: 0;
      }
      
      .app-tags {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        min-height: 0;
        height: 100%;
      }
      
      .app-content {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
        height: 100%;
      }
    `;

    noteService = noteService;
    tagService = tagService;
    noteValue: string;
    tagValue: string;
    notes: string[] = [];
    tags: string[] = [];
    currentDate: number | null = null;
    searchFilter: ISearchFilter | null;

    render() {
        return html`
            <div class="app-container">
                <div class="app-tags">
                    <ns-rich-input .value="${this.tagValue}" @richValueChange="${this.onTagInputChange}"
                                   @keypress="${this.onTagKeypress}"></ns-rich-input>
                    <ns-list .rows="${this.tags}" itemTagName="ns-note-list-tag">
                </div>
                <div class="app-content">
                    <ns-rich-input .value="${this.noteValue}" @richValueChange="${this.onNoteInputChange}"
                                   @keypress="${this.onNoteKeypress}"></ns-rich-input>
                    <ns-note-date-filter .current="${this.currentDate}"
                                         @nsNoteDateFilter="${this.onChangeDate}"></ns-note-date-filter>
                    <ns-list .rows="${this.notes}" itemTagName="ns-note-list-note" minRowHeight="70"></ns-list>
                </div>
            </div>

        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.currentDate = getCurrentDate();
        this.setFilterByDate(this.currentDate);
    }

    firstUpdated() {
        this.showLastNote();
        this.showNotes();
        this.showTags();
        // this.runGenerateData();
    }

    onNoteKeypress(event: KeyboardEvent) {
        if (!event.ctrlKey || event.code !== 'Enter') return;
        this.onNoteSubmit();
    }

    onTagKeypress(event: KeyboardEvent) {
        if (!event.ctrlKey || event.code !== 'Enter') return;
        this.onTagSubmit();
    }

    onNoteSubmit() {
        this.noteService.insert({value: this.noteValue, created: getCurrentDate()})
            .then(() => {
                this.noteValue = '';
                this.requestUpdate();
                this.showNotes();
            });
    }

    onTagSubmit() {
        this.tagService.insert({value: this.tagValue})
            .then(() => {
                this.tagValue = '';
                this.requestUpdate();
                this.showTags();
            });
    }

    onNoteInputChange(e: CustomEvent<string>) {
        this.noteValue = e.detail;
        this.requestUpdate();
    }

    onTagInputChange(e: CustomEvent<string>) {
        this.tagValue = e.detail;
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
            this.searchFilter = {date: {lower: lower.getTime(), upper: upper.getTime() - 1}};
        } else {
            this.searchFilter = null;
        }
    }

    private showLastNote() {
        this.noteService.last().then(note => {
            if (!note) return;
            this.noteValue = note.value;
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

    private showTags() {
        this.tagService.search()
            .then(tags => {
                this.tags = tags.map(tag => JSON.stringify(tag));
                this.requestUpdate();
            });
    }

    private runGenerateData() {
        setInterval(() => {
            fetch('https://fish-text.ru/get').then(response => response.json()).then((data: { text: string }) => {
                if (!data?.text) return;
                this.noteValue = data.text
                this.requestUpdate();
                setTimeout(() => {
                    this.onNoteSubmit();
                }, 200);
            });
        }, 500);
    }
}
