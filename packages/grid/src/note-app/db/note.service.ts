import { dbService } from './db.service';

export interface INote {
    id?: number;
    value: string;
    created: number;
}

function fromDbRequest<IDBValidKey>(request: IDBRequest<IDBValidKey>): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
        request.addEventListener('success', () => resolve(request.result));
        request.addEventListener('error', () => reject(request.error));
    });
}

function fromDbCursorRequest<T>(request: IDBRequest<IDBCursorWithValue>, {offset, limit}: {offset: number, limit: number}): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const result = [];
        let skip = 0;
        request.addEventListener('success', () => {
            if (!request.result || (limit && (result.length === limit))) {
                resolve(result);
                return;
            }

            if (skip < offset) {
                skip++;
                request.result.continue();
                return;
            }

            result.push(request.result.value);
            request.result.continue();
        });
        request.addEventListener('error', () => reject(request.error));
    });
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

    async search(): Promise<INote[]> {
        const db = await this.dbService.getDb();
        const transaction = db.transaction(['notes'], 'readonly');
        const objectStore = transaction.objectStore('notes');
        const index = objectStore.index('id');
        const cursor = index.openCursor(null, 'prev');
        return fromDbCursorRequest<INote>(cursor, {offset: 0, limit: 0});
    }
}

export const noteService = new NoteService();