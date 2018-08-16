'use strict';

const orgUi = require('../orgui-js');

test('FieldGroup', () => {

  document.body.innerHTML = `
<div id="jsSample" class="ouiFieldGroup isRequired">
  <label class="ouiFieldGroup__label">Address</label>
  <input type="text" class="ouiFieldGroup__child ouiInputText" value="test">
</div>`;

  const $jsSample = document.getElementById('jsSample');
  const $child = $jsSample.getElementsByClassName(orgUi.components.FieldGroup.ELEMENT_CLASSES.CHILD)[0];
  const fg = orgUi.components.FieldGroup.from($jsSample);

  expect(fg.getValue()).toBe('test');

  expect(fg.getChild()).toBe($child);

  fg.setValue('new value');
  expect($child.value).toBe('new value');

  fg.setHazarding();
  expect($jsSample.classList).toContain(orgUi.Modifiers.HAZARDING);
  fg.setHazarding(false);
  expect($jsSample.classList).not.toContain(orgUi.Modifiers.HAZARDING);

  fg.setHazarding();
  $child.focus();
  expect($jsSample.classList).not.toContain(orgUi.Modifiers.HAZARDING);

  fg.show(false);
  expect($jsSample.style.display).toBe('none');
  fg.show();
  expect($jsSample.style.display).toBe('');
});
