export function fromDbRequest<IDBValidKey>(request: IDBRequest<IDBValidKey>): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
        request.addEventListener('success', () => resolve(request.result));
        request.addEventListener('error', () => reject(request.error));
    });
}

export function fromDbCursorRequest<T>(request: IDBRequest<IDBCursorWithValue>, {offset, limit}: {offset: number, limit: number}): Promise<T[]> {
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
