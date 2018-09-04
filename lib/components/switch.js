import { ComponentBuilder } from '../componentBuilder.js';
import { EventComponent, delegateEvent } from '../eventComponent.js';


class Switch extends EventComponent {
  /**
   * @param {Element} $block
   * @param {HTMLInputElement} $input
   */
  constructor($block, $input) {
    super();

    /** @type {Element} */
    this.$block_ = $block;
    /** @type {HTMLInputElement} */
    this.$input_ = $input;

    delegateEvent($input, this, ['change']);
  }

  isChecked() {
    return this.$input_.checked;
  }
  /**
   * @param {boolean} flag
   */
  setChecked(flag) {
    this.$input_.checked = flag;
  }
}


/**
 * @enum {string}
 */
Switch.ELEMENT_CLASSES = {
  INPUT: 'ouiSwitch__input',
  SLIDER: 'ouiSwitch__slider',
};


/**
 * @class
 */
Switch.Builder = class extends ComponentBuilder {
  /**
   * @param {Element} $block
   */
  constructor($block) {
    super($block);
  }

  /** @protected */
  findInput() {
    return this.getElementByClassName(Switch.ELEMENT_CLASSES.INPUT);
  }

  build() {
    return new Switch(this.$block, this.findInput());
  }
};


/**
 * @param {Element} $block
 * @return {Switch<T>}
 */
Switch.from = function($block) {
  return new Switch.Builder($block).build();
};


export default Switch;
