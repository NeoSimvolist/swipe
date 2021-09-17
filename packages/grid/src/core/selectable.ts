export class Selectable<T> {

    private itemsMap = new Map<string, T>();
    private itemsSet = new Set<T>();
    private item: T;

    constructor(
        private key: string | null = null,
        private multi: boolean = true
    ) {
    }

    select(value: T) {
        if (!this.multi) {
            this.item = value;
            return;
        }

        if (this.key) {
            this.itemsMap.set(value[this.key], value);
            return;
        }

        this.itemsSet.add(value);
    }

    unselect(value: T) {
        if (!this.multi) {
            this.item = null;
            return;
        }

        if (this.key) {
            this.itemsMap.delete(value[this.key]);
            return;
        }

        this.itemsSet.delete(value);
    }

    isSelected(value: T): boolean {
        if (!this.multi) {
            return this.key ? value[this.key] === this.item[this.key] : value === this.item;
        }

        return this.key ? this.itemsMap.has(value[this.key]) : this.itemsSet.has(value);
    }

    toggleSelect(value: T) {
        this.isSelected(value) ? this.unselect(value) : this.select(value);
    }
}
