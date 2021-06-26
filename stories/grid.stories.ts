import {Story, Meta} from '@storybook/web-components';
import {Grid, GridProps} from './grid';
import {GridEvents, GridSort} from '@neosimvolist-ui/grid';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Example/Grid',
    argTypes: {
        columns: {
            control: {type: 'object'},
        },
        rows: {
            control: {type: 'object'},
        }
    },
} as Meta;

const Template: Story<Partial<GridProps>> = ({...args}) => Grid(args);

function getRows(count) {
    let rows = [];
    for (let i = 0; i < count; i++) {
        rows = [...rows, {id: i, name: `test${i}`}]
    }
    return rows;
}

export const Simple = Template.bind({});
Simple.args = {
    columns: [
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
            filterable: true
        }
    ],
    rows: getRows(100),
    ...(Object.keys(GridEvents).reduce((previous, current) => ({
        ...previous,
        [current]: event => action(current, {depth: 1})({detail: event.detail})
    }), {})),
    Init: (event: CustomEvent) => {
        const element = event.detail;
        element.addEventListener(GridEvents.ColumnSort, (event) => {
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

        element.addEventListener(GridEvents.ScrollDown, (event) => {
            element.rows = [...element.rows, ...getRows(100)];
        });

        element.addEventListener(GridEvents.ColumnFilter, (event) => {
            if (event.detail.name !== 'name') return;
            const rows = getRows(100);
            element.rows = [...rows.filter(row => row.name.includes(event.detail.value))];
        });

        element.addEventListener(GridEvents.UpdateState, (event) => {
            element.setColumnState(event.detail.name, {width: event.detail.width});
        });

        action('Init', {depth: 1})({detail: event.detail});
    },
};

// export const Secondary = Template.bind({});
// Secondary.args = {};
//
// export const Large = Template.bind({});
// Large.args = {};
//
// export const Small = Template.bind({});
// Small.args = {};
