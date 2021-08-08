import './demo.scss';
import {Grid} from '../grid/grid';
import {GridEvents, GridSort, IGridColumn} from '../grid/_models';

function getRows(count: number) {
    let rows = [];
    for (let i = 0; i < count; i++) {
        rows = [...rows, {id: i, name: `test${i}`}]
    }
    return rows;
}

customElements.whenDefined('ns-grid').then(() => {
    const element = document.getElementById('grid') as Grid;
    element.setAttribute('columns', JSON.stringify(<IGridColumn[]> [
        {
            name: 'id',
            width: '50px',
            resizable: true,
            sortable: true
        },
        {
            name: 'name',
            width: '100px',
            resizable: true,
            sortable: true,
            filterable: true,
            filterTagName: 'ns-grid-filter-select'
        }
    ]));

    element.addEventListener(GridEvents.ColumnSort, (event: CustomEvent) => {
        const {name: sortColumnName, sort} = event.detail;
        let rows = getRows(100);

        if (!sortColumnName || sort === GridSort.NONE) {
            element.setColumnState(event.detail.name, {sort: GridSort.NONE});
            element.rows = rows;
            return;
        }

        if (sort === GridSort.ASC) {
            element.setColumnState(event.detail.name, {sort: GridSort.ASC});
            element.rows = rows.sort((a, b) => {
                if (typeof a[sortColumnName] === 'string') return a[sortColumnName].localeCompare(b[sortColumnName]);
                return a[sortColumnName] - b[sortColumnName];
            });
            return;
        }

        element.setColumnState(event.detail.name, {sort: GridSort.DESC});
        element.rows = rows.sort((a, b) => {
            if (typeof a[sortColumnName] === 'string') return b[sortColumnName].localeCompare(a[sortColumnName]);
            return b[sortColumnName] - a[sortColumnName];
        });
    });

    element.addEventListener(GridEvents.ScrollDown, (event: CustomEvent) => {
        element.rows = [...element.rows, ...getRows(100)];
    });

    element.addEventListener(GridEvents.ColumnFilter, (event: CustomEvent) => {
        if (event.detail.name !== 'name') return;
        const rows = getRows(100);
        element.rows = [...rows.filter(row => row.name.includes(event.detail.value))];
    });

    element.addEventListener(GridEvents.UpdateState, (event: CustomEvent) => {
        element.setColumnState(event.detail.name, {width: event.detail.width});
    });

    element.rows = getRows(100);
});

document.addEventListener('WebComponentsReady', () => {
    console.log('WebComponentsReady');
});
