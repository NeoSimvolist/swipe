import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {GridEvents, GridSort} from './_models';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
  <style>
    @font-face {
      font-family: 'ns-grid-sorter-icon';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
`;

document.head.appendChild($_documentContainer.content);

@customElement('ns-grid-sorter')
export class GridSorter extends LitElement {

    @property({type: String})
    name: string;

    @property({type: String, reflect: true})
    sort: GridSort;

    static styles = css`
        :host {
          display: flex;
          flex-grow: 1;
          align-items: center;
          cursor: pointer;
          font-weight: bold;
        }
        
        :host([sort='asc']), :host([sort='desc']) {
          color: var(--ns-grid-color-active);
        }
        
        :host([sort='asc']:hover), :host([sort='desc']:hover) {
          color: var(--ns-grid-color-active-accent);
        }
        
        :host .grid-sorter-none,
        :host .grid-sorter-desc,
        :host .grid-sorter-asc {
          font-family: 'ns-grid-sorter-icon';
          margin-left: 4px;
        }
        
        :host .grid-sorter-none {
          color: var(--ns-grid-color-no-active);
        }
        
        :host(:hover) .grid-sorter-none {
          color: var(--ns-grid-color-no-active-accent);
        }
        
        :host .grid-sorter-none:before {
          content: '\\e901';
        }
        
        :host .grid-sorter-desc:before {
          content: '\\e902';
        }
        
        :host .grid-sorter-asc:before {
          content: '\\e900';
        }
    `;
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.toggleColumnSort);
        this.addEventListener('keypress', this.onKeypress, true);
    }

    disconnectedCallback() {
        this.removeEventListener('keypress', this.onKeypress, true);
        this.removeEventListener('click', this.toggleColumnSort);
        super.disconnectedCallback();
    }

    render() {
        return html`<slot></slot>${this.renderSort()}`;
    }

    renderSort() {
        switch (this.sort) {
            case GridSort.ASC:
                return html`<div class="grid-sorter-asc"></div>`;
            case GridSort.DESC:
                return html`<div class="grid-sorter-desc"></div>`;
            default:
                return html`<div class="grid-sorter-none"></div>`;
        }
    }

    onKeypress = (e: KeyboardEvent) => {
        if (e.code !== 'Enter' && e.code !== 'Space') return;
        // Иначе срабатывает сколлинг при нажатии на Space
        e.preventDefault();
        this.toggleColumnSort();
    }

    toggleColumnSort = () => {
        const prevSort = this.sort;
        let sort: GridSort;
        switch (prevSort) {
            case GridSort.ASC:
                sort = GridSort.DESC;
                break;
            case GridSort.DESC:
                sort = GridSort.NONE;
                break;
            default:
                sort = GridSort.ASC;
                break;
        }
        this.dispatchEvent(new CustomEvent(GridEvents.ColumnSort,
            {bubbles: true, composed: true, detail: {name: this.name, sort}}
        ));
    }
}
