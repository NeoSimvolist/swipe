import { dbService } from './db.service';
import { fromDbCursorRequest, fromDbRequest } from './db-core';

export interface ITag {
    id?: number;
    value: string;
}

export class TagService {

    dbService = dbService;

    async insert(value: ITag): Promise<ITag> {
        const db = await this.dbService.getDb();
        const transaction = db.transaction(['tags'], 'readwrite');
        const objectStore = transaction.objectStore('tags');

        return fromDbRequest(objectStore.add(value))
            .then(id => fromDbRequest<ITag>(objectStore.get(id)));
    }

    async search(): Promise<ITag[]> {
        const db = await this.dbService.getDb();
        const transaction = db.transaction(['tags'], 'readonly');
        const objectStore = transaction.objectStore('tags');
        const index = objectStore.index('id');
        const cursor = index.openCursor(null, 'prev');
        return fromDbCursorRequest<ITag>(cursor, {offset: 0, limit: 0});
    }
}

export const tagService = new TagService();
