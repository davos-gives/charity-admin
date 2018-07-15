import DS from 'ember-data';
import { computed } from '@ember/object';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';

export default DS.Model.extend(LoadableModel,{
  city: DS.attr(),
  country: DS.attr(),
  email: DS.attr(),
  fname: DS.attr(),
  lname: DS.attr(),
  postal: DS.attr(),
  donations: DS.hasMany('donation'),

  totalDonations: computed('donations.@each.amount', function() {
    return this.get('donations').mapBy('amount').reduce((a,b) => a + b, 0)
  })
});
