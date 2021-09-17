export enum ListEvents {
    ScrollDown = 'ScrollDown',
}

export interface IListItem<T = unknown> {
    value: T;
}
