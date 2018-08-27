window['orgUi'] = window['orgUi'] || {};
const rootNS = window['orgUi'];

import Modifiers, { setFlag } from '../../lib/modifiers.js';
rootNS['Modifiers'] = {
  'HAZARDING': Modifiers.HAZARDING,
  'SELECTED': Modifiers.SELECTED,
};
rootNS['Modifiers']['setFlag'] = setFlag;

import EventComponent, { ComponentEvent } from '../../lib/eventComponent.js';

rootNS['EventComponent'] = EventComponent;
rootNS['EventComponent']['prototype']['addEventListener'] = EventComponent.prototype.addEventListener;
rootNS['EventComponent']['prototype']['removeEventListener'] = EventComponent.prototype.removeEventListener;

rootNS['ComponentEvent'] = ComponentEvent;
rootNS['ComponentEvent']['prototype']['preventDefault'] = ComponentEvent.prototype.preventDefault;

rootNS['components'] = rootNS['components'] || {};
const componentsNS = rootNS['components'];

import Assist from '../../lib/components/assist.js';
componentsNS['Assist'] = Assist;
componentsNS['Assist']['ELEMENT_CLASSES'] = {
  'TARGET': Assist.ELEMENT_CLASSES.TARGET,
  'SUGGEST': Assist.ELEMENT_CLASSES.SUGGEST,
  'SUGGEST_ITEMS': Assist.ELEMENT_CLASSES.SUGGEST_ITEMS,
};
componentsNS['Assist']['Builder'] = Assist.Builder;
componentsNS['Assist']['Builder']['prototype']['build'] = Assist.Builder.prototype.build;
componentsNS['Assist']['from'] = Assist.from;
componentsNS['Assist']['prototype']['appendSuggestItem'] = Assist.prototype.appendSuggestItem;
componentsNS['Assist']['prototype']['clearSuggest'] = Assist.prototype.clearSuggest;
componentsNS['Assist']['prototype']['getTarget'] = Assist.prototype.getTarget;
componentsNS['Assist']['prototype']['getSuggest'] = Assist.prototype.getSuggest;
componentsNS['Assist']['prototype']['getSuggestItems'] = Assist.prototype.getSuggestItems;

import FieldGroup from '../../lib/components/fieldGroup.js';
componentsNS['FieldGroup'] = FieldGroup;
componentsNS['FieldGroup']['prototype']['show'] = FieldGroup.prototype.show;
componentsNS['FieldGroup']['prototype']['getChild'] = FieldGroup.prototype.getChild;
componentsNS['FieldGroup']['prototype']['getValue'] = FieldGroup.prototype.getValue;
componentsNS['FieldGroup']['prototype']['setValue'] = FieldGroup.prototype.setValue;
componentsNS['FieldGroup']['prototype']['setHazarding'] = FieldGroup.prototype.setHazarding;
componentsNS['FieldGroup']['ELEMENT_CLASSES'] = {
  'LABEL': FieldGroup.ELEMENT_CLASSES.LABEL,
  'CHILD': FieldGroup.ELEMENT_CLASSES.CHILD,
  'HELP_TEXT': FieldGroup.ELEMENT_CLASSES.HELP_TEXT,
};
componentsNS['FieldGroup']['Builder'] = FieldGroup.Builder;
componentsNS['FieldGroup']['Builder']['prototype']['withDecorator'] = FieldGroup.Builder.prototype.withDecorator;
componentsNS['FieldGroup']['Builder']['prototype']['withUnhazardingOn'] = FieldGroup.Builder.prototype.withUnhazardingOn;
componentsNS['FieldGroup']['from'] = FieldGroup.from;

import Switch from '../../lib/components/switch.js';
componentsNS['Switch'] = Switch;
componentsNS['Switch']['ELEMENT_CLASSES'] = {
  'INPUT': Switch.ELEMENT_CLASSES.INPUT,
  'SLIDER': Switch.ELEMENT_CLASSES.SLIDER,
};
componentsNS['Switch']['Builder'] = Switch.Builder;
componentsNS['Switch']['Builder']['prototype']['build'] = Switch.Builder.prototype.build;
componentsNS['Switch']['from'] = Switch.from;
