import DS from 'ember-data';

export default DS.Model.extend({
  city: DS.attr(),
  country: DS.attr(),
  email: DS.attr(),
  fname: DS.attr(),
  lname: DS.attr(),
  postal: DS.attr(),
  donation: DS.belongsTo('donation'),
});
