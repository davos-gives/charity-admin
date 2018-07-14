import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr(),
  frequency: DS.attr(),
  timestamp: DS.attr(),
  fname: DS.attr(),
  frequency: DS.attr(),
  owner: DS.attr(),
});
