export enum GridSort {
    NONE = '',
    ASC = 'asc',
    DESC = 'desc'
}

export interface IGridColumn {
    name: string;
    title?: string;
    width?: string;
    resizable?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    filterTagName?: string;
    customTagName?: string;
}

export interface IGridColumnState {
    sort: GridSort;
    filter: unknown;
    width: number;
}

export type TGridColumnsState = { [columnName: string]: IGridColumnState };

export enum GridEvents {
    Init = 'Init',
    UpdateState = 'UpdateState',
    ColumnResizeStart = 'ColumnResizeStart',
    ColumnResizeProcess = 'ColumnResizeProcess',
    ColumnSort = 'ColumnSort',
    ColumnFilter = 'ColumnFilter',
    ColumnFilterDropDown = 'ColumnFilterDropDown',
    ScrollDown = 'ScrollDown',
}
