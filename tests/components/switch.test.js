'use strict';

const orgUi = require('../orgui-js');

test('Switch', () => {

  document.body.innerHTML = `
<label id="jsSample" class="ouiSwitch">
  <input type="checkbox" class="ouiSwitch__input">
  <span class="ouiSwitch__slider"></span>
</label>`;

  const $jsSample = document.getElementById('jsSample');
  const $input = $jsSample.getElementsByClassName(orgUi.components.Switch.ELEMENT_CLASSES.INPUT)[0];
  const sw = orgUi.components.Switch.from($jsSample);

  expect(sw.isChecked()).toBe(false);
  expect($input.checked).toBe(false);

  sw.setChecked(true);
  expect(sw.isChecked()).toBe(true);
  expect($input.checked).toBe(true);

  sw.setChecked(false);
  expect(sw.isChecked()).toBe(false);
  expect($input.checked).toBe(false);

  let changed = false;
  sw.addEventListener('change', function() {
    changed = true;
  });
  $input.dispatchEvent(new Event('change'));

  expect(changed).toBe(true);
});
