class ComponentBuilder {
  /**
   * @param {Element} $block
   */
  constructor($block) {
    /**
     * @protected
     * @type {Element}
     */
    this.$block = $block;
  }

  /**
   * @protected
   * @param {string} className
   * @return {?Element}
   */
  getElementByClassName(className) {
    const elements = this.$block.getElementsByClassName(className);
    return elements.length ? elements[0] : null;
  }
}

// Class expression as default export is not recognised as a type
// https://github.com/google/closure-compiler/issues/1825
export default ComponentBuilder;
