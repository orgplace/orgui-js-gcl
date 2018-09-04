import { ComponentBuilder } from '../componentBuilder.js';
import Modifiers, { setFlag } from '../modifiers.js';

/** @template T */
class FieldGroup {
  /**
   * @param {Element} $block
   * @param {T} child
   */
  constructor($block, child, unhazardingOn) {
    /** @type {Element} */
    this.$block_ = $block;
    /** @type {T} */
    this.child_ = child;

    child.addEventListener(unhazardingOn, () => {
      this.setHazarding(false);
    });
  }

  show(flag = true) {
    this.$block_.style.display = flag ? '' : 'none';
  }

  /** @return {T} */
  getChild() {
    return this.child_;
  }

  /**
   * Shorthand for `getChild().value`.
   * It is often used when `T` is `HTMLInputElement`.
   *
   * @return {string}
   */
  getValue() {
    return this.child_.value;
  }

  /**
   * Shortcut for `getChild().value = s`.
   *
   * @param {string} s
   */
  setValue(s) {
    this.child_.value = s;
  }

  setHazarding(enable = true) {
    setFlag(this.$block_, Modifiers.HAZARDING, enable);
  }
}

/**
 * @enum {string}
 */
FieldGroup.ELEMENT_CLASSES = {
  LABEL: 'ouiFieldGroup__label',
  CHILD: 'ouiFieldGroup__child',
  HELP_TEXT: 'ouiFieldGroup__helpText',
};


/**
 * @class
 * @template T
 */
FieldGroup.Builder = class extends ComponentBuilder {
  /**
   * @param {Element} $block
   */
  constructor($block) {
    super($block);
    /** @type {function(Element): T} */
    this.decorator;
    /** @type {string} */
    this.unhazardingOn = 'focus';
  }

  withDecorator(decorator) {
    this.decorator = decorator;
    return this;
  }
  withUnhazardingOn(unhazardingOn) {
    this.unhazardingOn = unhazardingOn;
    return this;
  }

  /** @protected */
  findChild() {
    return this.getElementByClassName(FieldGroup.ELEMENT_CLASSES.CHILD);
  }
  /** @protected */
  decorateComponent() {
    const $child = this.findChild();
    return this.decorator ? this.decorator($child) : $child;
  }

  build() {
    return new FieldGroup(this.$block, this.decorateComponent(), this.unhazardingOn);
  }
};


/**
 * @template T
 * @param {Element} $block
 * @param {function(Element): T} [decorator]
 * @return {FieldGroup<T>}
 */
FieldGroup.from = function ($block, decorator) {
  return new FieldGroup.Builder($block)
    .withDecorator(decorator)
    .build();
};

export default FieldGroup;
