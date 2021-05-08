export type TDatasourceFind<T, P = unknown> = (params: P) => Promise<T> | T;

export interface IDatasource<T, P = unknown> {
    find: (params: P) => Promise<T> | T;
}

export class Datasource<T, P = unknown> implements IDatasource<T, P> {
    constructor(private options: { find: TDatasourceFind<T, P> }) {
    }

    find(params: P): Promise<T> | T {
        return this.options.find(params)
    }
}

export function dataSourceFindFactory<T, P = unknown>(find: TDatasourceFind<T, P>) {
    return new Datasource({find})
}
