/* eslint-disable no-self-assign */

window['orgUi'] = window['orgUi'] || {};
const rootNS = window['orgUi'];

import Modifiers, { setFlag } from '../lib/modifiers.js';
rootNS['Modifiers'] = {
  'HAZARDING': Modifiers.HAZARDING,
  'SELECTED': Modifiers.SELECTED,
};
rootNS['Modifiers']['setFlag'] = setFlag;

import { EventComponent, ComponentEvent } from '../lib/eventComponent.js';

rootNS['EventComponent'] = EventComponent;
EventComponent['prototype']['addEventListener'] = EventComponent.prototype.addEventListener;
EventComponent['prototype']['removeEventListener'] = EventComponent.prototype.removeEventListener;

rootNS['ComponentEvent'] = ComponentEvent;
ComponentEvent['prototype']['preventDefault'] = ComponentEvent.prototype.preventDefault;

rootNS['components'] = rootNS['components'] || {};
const componentsNS = rootNS['components'];

import Assist from '../lib/components/assist.js';
componentsNS['Assist'] = Assist;
Assist['ELEMENT_CLASSES'] = {
  'TARGET': Assist.ELEMENT_CLASSES.TARGET,
  'SUGGEST': Assist.ELEMENT_CLASSES.SUGGEST,
  'SUGGEST_ITEMS': Assist.ELEMENT_CLASSES.SUGGEST_ITEMS,
};
Assist['Builder'] = Assist.Builder;
Assist['Builder']['prototype']['build'] = Assist.Builder.prototype.build;
Assist['from'] = Assist.from;
Assist['prototype']['appendSuggestItem'] = Assist.prototype.appendSuggestItem;
Assist['prototype']['clearSuggest'] = Assist.prototype.clearSuggest;
Assist['prototype']['getTarget'] = Assist.prototype.getTarget;
Assist['prototype']['getSuggest'] = Assist.prototype.getSuggest;
Assist['prototype']['getSuggestItems'] = Assist.prototype.getSuggestItems;

import FieldGroup from '../lib/components/fieldGroup.js';
componentsNS['FieldGroup'] = FieldGroup;
FieldGroup['prototype']['show'] = FieldGroup.prototype.show;
FieldGroup['prototype']['getChild'] = FieldGroup.prototype.getChild;
FieldGroup['prototype']['getValue'] = FieldGroup.prototype.getValue;
FieldGroup['prototype']['setValue'] = FieldGroup.prototype.setValue;
FieldGroup['prototype']['setHazarding'] = FieldGroup.prototype.setHazarding;
FieldGroup['ELEMENT_CLASSES'] = {
  'LABEL': FieldGroup.ELEMENT_CLASSES.LABEL,
  'CHILD': FieldGroup.ELEMENT_CLASSES.CHILD,
  'HELP_TEXT': FieldGroup.ELEMENT_CLASSES.HELP_TEXT,
};
FieldGroup['Builder'] = FieldGroup.Builder;
FieldGroup['Builder']['prototype']['withDecorator'] = FieldGroup.Builder.prototype.withDecorator;
FieldGroup['Builder']['prototype']['withUnhazardingOn'] = FieldGroup.Builder.prototype.withUnhazardingOn;
FieldGroup['from'] = FieldGroup.from;

import Switch from '../lib/components/switch.js';
componentsNS['Switch'] = Switch;
Switch['prototype']['isChecked'] = Switch.prototype.isChecked;
Switch['prototype']['setChecked'] = Switch.prototype.setChecked;
Switch['ELEMENT_CLASSES'] = {
  'INPUT': Switch.ELEMENT_CLASSES.INPUT,
  'SLIDER': Switch.ELEMENT_CLASSES.SLIDER,
};
Switch['Builder'] = Switch.Builder;
Switch['Builder']['prototype']['build'] = Switch.Builder.prototype.build;
Switch['from'] = Switch.from;
