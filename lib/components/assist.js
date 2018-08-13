import ComponentBuilder from '../componentBuilder.js';
import EventComponent, { ComponentEvent, delegateEvent } from '../eventComponent.js';
import Modifiers from '../modifiers.js';
import keyUtil from '../keyUtil.js';


const AssistItem = {
  ELEMENT_CLASS: 'ouiAssistItem',
};


class Assist extends EventComponent {
  /**
   * @param {Element} $block
   * @param {Element} $suggest
   */
  constructor($block, $target, $suggest) {
    super();

    /**
     * @type {Element}
     * @private
     */
    this.$block_ = $block;
    /**
     * @type {Element}
     * @private
     */
    this.$target_ = $target;
    /**
     * @type {Element}
     * @private
     */
    this.$suggest_ = $suggest;
    /**
     * @type {?Element}
     * @private
     */
    this.$lastSelectedSuggestItem_ = null;

    delegateEvent($target, this, ['input']);

    $target.addEventListener('keyup', (event) => {
      const key = event.key;
      const up = keyUtil.isUp(key);
      const down = keyUtil.isDown(key);
      if (down || up) {
        const items = $suggest.getElementsByClassName(AssistItem.ELEMENT_CLASS);
        const itemsLength = items.length;
        if (itemsLength) {
          if (this.$lastSelectedSuggestItem_) {
            const $next = Assist.findNextSuggestItem(this.$lastSelectedSuggestItem_, up);
            if ($next) {
              this.selectItem_($next);
            }
          } else {
            if (up) {
              this.selectItem_(items[itemsLength - 1]);
            } else {
              this.selectItem_(items[0]);
            }
          }
        }
      } else {
        this.unselect_();
      }

    });
    $target.addEventListener('focus', (/** @type{Event} **/ event) => {
      this.dispatchEvent(event);
      if (event.defaultPrevented) {
        return;
      }

      if (this.$suggest_.firstChild) {
        this.$suggest_.style.visibility = 'visible';
      }
    });
    $target.addEventListener('blur', (/** @type{Event} **/ event) => {
      this.dispatchEvent(event);
      if (event.defaultPrevented) {
        return;
      }

      this.$suggest_.style.visibility = 'hidden';
    });
  }

  static isSuggestItem($element) {
    return $element.classList.contains(AssistItem.ELEMENT_CLASS);
  }

  static findNextSuggestItem($element, backward) {
    do {
      $element = backward ? $element.previousElementSibling : $element.nextElementSibling;
    } while ($element !== null && !Assist.isSuggestItem($element));
    return $element;
  }

  appendSuggestItem($item) {
    this.$suggest_.appendChild($item);
    this.$suggest_.style.visibility = 'visible';
  }

  clearSuggest() {
    this.unselect_();
    this.$suggest_.style.visibility = 'hidden';
    while (this.$suggest_.firstChild) {
      this.$suggest_.removeChild(this.$suggest_.firstChild);
    }
  }

  selectItem_($item) {
    if (this.$lastSelectedSuggestItem_) {
      this.$lastSelectedSuggestItem_.classList.remove(Modifiers.SELECTED);
    }
    $item.classList.add(Modifiers.SELECTED);
    this.$lastSelectedSuggestItem_ = $item;

    this.dispatchEvent(new ComponentEvent('select', $item));
  }
  unselect_() {
    if (this.$lastSelectedSuggestItem_) {
      this.$lastSelectedSuggestItem_.classList.remove(Modifiers.SELECTED);
      this.$lastSelectedSuggestItem_ = null;
    }
  }
}

/**
 * @enum {string}
 */
Assist.ELEMENT_CLASSES = {
  TARGET: 'ouiAssist__target',
  SUGGEST: 'ouiAssist__suggest',
};

Assist.Builder = class extends ComponentBuilder {
  /**
   * @param {Element} $block
   */
  constructor($block) {
    super($block);
  }
  /** @protected */
  findTarget() {
    return this.getElementByClassName(Assist.ELEMENT_CLASSES.TARGET);
  }
  /** @protected */
  findSuggest() {
    return this.getElementByClassName(Assist.ELEMENT_CLASSES.SUGGEST);
  }
  build() {
    return new Assist(this.$block, this.findTarget(), this.findSuggest());
  }
};

/**
 * @param {Element} $block
 */
Assist.from = function ($block) {
  return new Assist.Builder($block).build();
};

export default Assist;
