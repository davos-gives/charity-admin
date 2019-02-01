import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  hasGoal: DS.attr(),
  showGoal: DS.attr(),
  goal: DS.attr(),
  goalInDollars: DS.attr(),
  hasEndDate: DS.attr(),
  endDate: DS.attr(),
  goBackUrl: DS.attr(),
  font: DS.attr(),
  size: DS.attr(),
  colour: DS.attr(),
  updatedAt: DS.attr(),
  createdAt: DS.attr(),
})
