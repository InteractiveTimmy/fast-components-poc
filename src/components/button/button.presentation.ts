import {LitElement, html, PropertyValueMap} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import styles from './button.styles';

@customElement('pref-button')
class Button extends LitElement {
  static styles = styles;

  @property({ reflect: true })
  ['aria-label']?: string;

  @property({ reflect: true })
  ['aria-pressed']?: 'true' | 'false';

  @property({ reflect: true })
  name?: string;

  @property({ reflect: true, type: Boolean })
  toggle?: boolean;

  @property({ reflect: true })
  type?: 'button' | 'reset' | 'submit' = 'button';

  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    changedProperties.forEach((old, name) => {
      if (name === 'toggle') {
        this.updateToggle();
      } 
    });

    super.update(changedProperties);
  }

  protected updateToggle(): void {
    if (this.toggle) {
      this['aria-pressed'] = 'false';
      this.setupEvents();
    } else {
      this.removeEvents();
    }
  }

  protected setupEvents(): void {
    this.addEventListener('mousedown', this.handlePressEvent);
    this.addEventListener('keydown', this.handlePressEvent);
    this.addEventListener('mouseup', this.handleDepressEvent);
    this.addEventListener('keyup', this.handleDepressEvent);
    this.addEventListener('onfocuschange', this.handleDepressEvent);
  }

  protected removeEvents(): void {
    this.removeEventListener('mousedown', this.handlePressEvent);
    this.removeEventListener('keydown', this.handlePressEvent);
    this.removeEventListener('mouseup', this.handleDepressEvent);
    this.removeEventListener('keyup', this.handleDepressEvent);
    this.removeEventListener('onfocuschange', this.handleDepressEvent);
  }

  protected handlePressEvent(): void {
    this['aria-pressed'] = 'true';
    console.log('PRESS EVENT');
  }

  protected handleDepressEvent(): void {
    this['aria-pressed'] = 'false';
    console.log('DEPRESS EVENT');
  }

  protected handleSlots(event: any): void {
    const childNodes = event?.target?.assignedNodes({ flatten: true });

    const allText = childNodes.map((node: Node) => {
      return node.textContent ? node.textContent : ''
    }).join('');

    if (allText !== this['aria-label']) {
      this['aria-label'] = allText;
    }
  }

  render() {
    return html`
      <button
        aria-label=${ifDefined(this['aria-label'])}
        aria-pressed=${ifDefined(this['aria-pressed'])}
        name=${ifDefined(this.name)}
        type=${ifDefined(this.type)}
        ?disabled=${this.disabled}
      >
        <slot @slotchange=${this.handleSlots}></slot>
      </button>
    `;
  }
}

export default Button;
