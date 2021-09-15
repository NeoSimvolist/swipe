import { dbService } from './db.service';
import { fromDbCursorRequest, fromDbRequest } from './db-core';

export interface INote {
    id?: number;
    value: string;
    created: number;
}

export interface ISearchFilter {
    date?: {lower: number, upper: number};
}

export class NoteService {

    dbService = dbService;

    async insert(value: INote): Promise<INote> {
        const db = await this.dbService.getDb();
        const transaction = db.transaction(['notes'], 'readwrite');
        const objectStore = transaction.objectStore('notes');

        return fromDbRequest(objectStore.add(value))
            .then(id => fromDbRequest<INote>(objectStore.get(id)));
    }

    async last(): Promise<INote | null> {
        const db = await this.dbService.getDb();
        const transaction = db.transaction(['notes'], 'readonly');
        const objectStore = transaction.objectStore('notes');
        const index = objectStore.index('id');
        return fromDbCursorRequest<INote>(index.openCursor(null, 'prev'), {offset: 0, limit: 1}).then(result => result?.[0] ?? null);
    }

    async search(filter?: ISearchFilter): Promise<INote[]> {
        const db = await this.dbService.getDb();
        const transaction = db.transaction(['notes'], 'readonly');
        const objectStore = transaction.objectStore('notes');
        const index = objectStore.index('created');
        const query = filter?.date ? IDBKeyRange.bound(filter.date.lower, filter.date.upper) : null;
        const cursor = index.openCursor(query, 'prev');
        return fromDbCursorRequest<INote>(cursor, {offset: 0, limit: 0});
    }
}

export const noteService = new NoteService();
