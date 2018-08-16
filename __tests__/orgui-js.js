const fs = require('fs');
const { Script } = require('vm');

const code = fs.readFileSync(`${process.env['TARGET_DIR']}/orgui-js.js`).toString();
const orgUiScript = new Script(code);
const ctx = {window: global};
orgUiScript.runInNewContext(ctx);

module.exports = ctx.window.orgUi;
