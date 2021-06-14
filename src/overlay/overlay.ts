import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {OverlayEvents} from './_models';

@customElement('ns-overlay')
export class Overlay extends LitElement {

    static styles = css`
        :host {
          position: fixed;
          box-shadow: 4px 3px 8px -1px rgba(77, 77, 77, 0.2);
          background-color: #fff;
          border-radius: 4px;
          pointer-events: auto;
          z-index: 1;
          outline: none;
        }
    `;

    @property({type: Object})
    origin: HTMLElement;

    private timoutHandle: NodeJS.Timeout;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('tabIndex', '-1');
        this.addEventListener('focusout', this.onFocusOut);
        this.addEventListener('focusin', this.onFocusIn);
        window.addEventListener('resize', this.updatePosition);
        // true нужен чтобы реакция была на скролл в любом родительском контейнере
        window.addEventListener('scroll', this.updatePosition, true);
        this.focus();
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.updatePosition, true);
        window.removeEventListener('resize', this.updatePosition);
        this.removeEventListener('focusin', this.onFocusIn);
        this.removeEventListener('focusout', this.onFocusOut);
        super.disconnectedCallback();
    }

    render() {
        return html`<slot></slot>`;
    }

    updated(props: Map<string, unknown>) {
        if (!props.has('origin')) return;
        this.updatePosition();
    }

    private onFocusIn = () => {
        clearTimeout(this.timoutHandle);
    }

    private onFocusOut = (event) => {
        this.timoutHandle = setTimeout(() => {
            this.dispatchEvent(new CustomEvent(OverlayEvents.OverlayFocusOut,
                {bubbles: true, composed: true, detail: {sourceEvent: event}}
            ));
        });
    }

    private updatePosition = () => {
        if (!this.origin) return;
        this.style.left = this.origin.getBoundingClientRect().left + 'px';
        this.style.top = this.origin.getBoundingClientRect().bottom + 'px';
    }
}
