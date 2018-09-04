export class ComponentEvent {
  /**
   * @param {!string} type
   * @param {(EventTarget|EventComponent)} target
   */
  constructor(type, target) {
    /**
     * @public
     * @nocollapse
     * @type {(EventTarget|EventComponent)}
     */
    this.target = target;
    /**
     * @public
     * @nocollapse
     * @type {!string}
     */
    this.type = type;
    /**
     * @public
     * @nocollapse
     * @type {!boolean}
     */
    this.defaultPrevented = false;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }
}


export class EventComponent {
  constructor() {
    /**
     * @private
     * @type {!Map<string, Array<function((Event|ComponentEvent))>>}
     */
    this.listeners_ = new Map();
  }
  /**
   * @param {!string} type
   * @param {!function((Event|ComponentEvent))} listener
   */
  addEventListener(type, listener) {
    let stack = this.listeners_.get(type);
    if (!stack) {
      stack = [];
      this.listeners_.set(type, stack);
    }
    stack.push(listener);
  }

  /**
   * @param {!string} type
   * @param {!function((Event|ComponentEvent))} listener
   */
  removeEventListener(type, listener) {
    let stack = this.listeners_.get(type);
    if (!stack) { return; }
    const length = stack.length;
    for (let i = 0; i < length; ++i) {
      if (stack[i] === listener) {
        stack.splice(i, 1);
        return this.removeEventListener(type, listener);
      }
    }
  }

  /**
   * @param {!(Event|ComponentEvent)} event
   */
  dispatchEvent(event) {
    let type = event.type;
    let stack = this.listeners_.get(type);
    if (!stack) { return; }
    for (const handler of stack) {
      handler.call(this, event);
    }
  }
}

/**
 * @param {(EventTarget|EventComponent)} from
 * @param {(EventTarget|EventComponent)} to
 * @param {!Array<string>} delegatedTypes
 */
export function delegateEvent(from, to, delegatedTypes) {
  const delegateEvent = function(event) { to.dispatchEvent(event); };
  for (const type of delegatedTypes) {
    from.addEventListener(type, delegateEvent);
  }
}

