/**
 * @enum {string}
 */
const Modifiers = {
  HAZARDING: 'isHazarding',
};

/**
 * @param {Element} $block
 * @param {!string} modifier
 * @param {*} enable
 */
function setFlag($block, modifier, enable) {
  if (enable) {
    $block.classList.add(modifier);
  } else {
    $block.classList.remove(modifier);
  }
}

export default Modifiers;
export { setFlag };
