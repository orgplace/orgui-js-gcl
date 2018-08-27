'use strict';

const orgUi = require('../orgui-js');

test('Assist (simplified)', () => {

  document.body.innerHTML = `<div id="jsSample" class="ouiAssist">
  <input class="ouiAssist__target ouiInputText" type="text" placeholder="Search...">
  <div class="ouiAssist__suggest" style="visibility: hidden"></div>
</div>`;

  const $jsSample = document.getElementById('jsSample');
  const $target = $jsSample.getElementsByClassName(orgUi.components.Assist.ELEMENT_CLASSES.TARGET)[0];
  const $suggest = $jsSample.getElementsByClassName(orgUi.components.Assist.ELEMENT_CLASSES.SUGGEST)[0];
  const a = orgUi.components.Assist.from($jsSample);

  expect(a.getTarget()).toBe($target);
  expect(a.getSuggest()).toBe($suggest);
  expect(a.getSuggestItems()).toBe($suggest);
});

test('Assist', () => {

  document.body.innerHTML = `<div id="jsSample" class="ouiAssist">
  <input class="ouiAssist__target ouiInputText" type="text" placeholder="Search...">
  <div class="ouiAssist__suggest" style="visibility: hidden">
    <div class="ouiAssist__suggestItems"></div>
  </div>
</div>`;

  const $jsSample = document.getElementById('jsSample');
  const $target = $jsSample.getElementsByClassName(orgUi.components.Assist.ELEMENT_CLASSES.TARGET)[0];
  const $suggest = $jsSample.getElementsByClassName(orgUi.components.Assist.ELEMENT_CLASSES.SUGGEST)[0];
  const $suggestItems = $jsSample.getElementsByClassName(orgUi.components.Assist.ELEMENT_CLASSES.SUGGEST_ITEMS)[0];
  const a = orgUi.components.Assist.from($jsSample);

  expect(a.getTarget()).toBe($target);
  expect(a.getSuggest()).toBe($suggest);
  expect(a.getSuggestItems()).toBe($suggestItems);

  // Focus in empty state

  $target.dispatchEvent(new window.FocusEvent('focus'));
  expect($suggest.style.visibility).toBe('hidden');

  // Add the first item

  const $newItem1 = document.createElement('div');
  $newItem1.classList.add('ouiAssistItem');
  $newItem1.textContent = 'Item 1';
  a.appendSuggestItem($newItem1);

  expect($suggest.style.visibility).toBe('visible');
  expect(a.getSuggestItems().lastChild).toBe($newItem1);

  // Add the 2nd item

  const $newItem2 = document.createElement('div');
  $newItem2.classList.add('ouiAssistItem');
  $newItem2.textContent = 'Item 2';
  a.appendSuggestItem($newItem2);

  expect($suggest.style.visibility).toBe('visible');
  expect(a.getSuggestItems().lastChild).toBe($newItem2);

  const items = [$newItem1, $newItem2];
  const selectedOnly = ($selected) => {
    for (let $item of items) {
      let expectation = expect($item.classList);
      if ($item !== $selected) { expectation = expectation.not; }
      expectation.toContain(orgUi.Modifiers.SELECTED);
    }
  };

  // Key operations

  $target.dispatchEvent(new window.KeyboardEvent('keyup', {key: 'ArrowDown'}));
  selectedOnly($newItem1);

  $target.dispatchEvent(new window.KeyboardEvent('keyup', {key: 'ArrowDown'}));
  selectedOnly($newItem2);

  $target.dispatchEvent(new window.KeyboardEvent('keyup', {key: 'ArrowDown'}));
  selectedOnly($newItem2);

  $target.dispatchEvent(new window.KeyboardEvent('keyup', {key: 'ArrowUp'}));
  selectedOnly($newItem1);

  $target.dispatchEvent(new window.KeyboardEvent('keyup', {key: 'ArrowUp'}));
  selectedOnly($newItem1);

  // Focus

  $target.dispatchEvent(new window.FocusEvent('blur'));
  expect($suggest.style.visibility).toBe('hidden');

  $target.dispatchEvent(new window.FocusEvent('focus'));
  expect($suggest.style.visibility).toBe('visible');

  const preventListener = (event) => {
    event.preventDefault();
  };

  $suggest.style.visibility = 'visible';
  a.addEventListener('blur', preventListener);
  $target.dispatchEvent(new window.FocusEvent('blur'));

  expect($suggest.style.visibility).toBe('visible');

  $suggest.style.visibility = 'hidden';
  a.addEventListener('focus', preventListener);
  $target.dispatchEvent(new window.FocusEvent('focus'));

  expect($suggest.style.visibility).toBe('hidden');

  // Clear

  a.clearSuggest();

  expect($suggest.style.visibility).toBe('hidden');
  expect(a.getSuggestItems().lastChild).toBe(null);
});
