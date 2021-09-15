export class DbService {
    private cache: IDBDatabase;

    getDb(): Promise<IDBDatabase> {
        if (this.cache) return Promise.resolve(this.cache);

        return new Promise((resolve, reject) => {
            const request = indexedDB.open('notes', 1);
            request.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent & {target: IDBOpenDBRequest}) => {
                if (event.oldVersion) return;
                const db: IDBDatabase = (event.target as any).result;
                const notesStore = db.createObjectStore('notes', {keyPath: 'id', autoIncrement: true});
                notesStore.createIndex('value', 'value', {unique: false});
                notesStore.createIndex('created', 'created', {unique: false});
                notesStore.createIndex('id', 'id', {unique: true});

                const tagsStore = db.createObjectStore('tags', {keyPath: 'id', autoIncrement: true});
                tagsStore.createIndex('value', 'value', {unique: true});
                tagsStore.createIndex('id', 'id', {unique: true});

                const notesTagsStore = db.createObjectStore('notesTags', {keyPath: 'id', autoIncrement: true});
                notesTagsStore.createIndex('notesId', 'notesId');
                notesTagsStore.createIndex('tagsId', 'tagsId');
                notesTagsStore.createIndex('notesTagsIds', ['notesId', 'tagsId'], {unique: true});
            });
            request.addEventListener('success', () => {
                this.cache = request.result;
                resolve(this.cache);
            });
            request.addEventListener('error', () => reject(request.error));
        });
    }
}

export const dbService = new DbService();
