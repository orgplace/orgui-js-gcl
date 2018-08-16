// 'use strict';

const fs = require('fs');
const { Script } = require("vm");

const orgUi = (function(){
  const code = fs.readFileSync(`${process.env['TARGET_DIR']}/orgui-js.js`).toString();
  const orgUiScript = new Script(code);
  const ctx = {window: global};
  orgUiScript.runInNewContext(ctx);
  return ctx.window.orgUi;
})();

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
});
