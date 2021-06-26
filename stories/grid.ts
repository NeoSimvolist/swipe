import {html} from 'lit-html';
import './grid.css';
import {IGridColumn} from '@neosimvolist-ui/grid';

export interface GridProps {
    columns?: IGridColumn[];
    rows?: Array<unknown>;
    Init?: (event: CustomEvent) => void;
    UpdateState?: (event: CustomEvent) => void;
    ColumnResizeStart?: (event: CustomEvent) => void;
    ColumnResizeProcess?: (event: CustomEvent) => void;
    ColumnSort?: (event: CustomEvent) => void;
    ColumnFilter?: (event: CustomEvent) => void;
    ColumnFilterDropDown?: (event: CustomEvent) => void;
    ScrollDown?: (event: CustomEvent) => void;
}

/**
 * Primary UI component for user interaction
 */
export const Grid = ({columns, rows, Init, UpdateState, ColumnResizeStart, ColumnResizeProcess, ColumnSort, ColumnFilter, ColumnFilterDropDown, ScrollDown}: GridProps) => {
    return html`
        <ns-grid
            .columns="${columns}" 
            .rows="${rows ?? []}" 
            @Init="${Init}"
            @UpdateState="${UpdateState}"
            @ColumnResizeStart="${ColumnResizeStart}"
            @ColumnResizeProcess="${ColumnResizeProcess}"
            @ColumnSort="${ColumnSort}"
            @ColumnFilter="${ColumnFilter}"
            @ColumnFilterDropDown="${ColumnFilterDropDown}"
            @ScrollDown="${ScrollDown}"
            class="storybook-ns-grid"
        >
        </ns-grid>
  `;
};
