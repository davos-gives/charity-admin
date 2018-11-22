import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';

export default DS.Model.extend(LoadableModel, {
  amount: DS.attr(),
  frequency: DS.attr(),
  createdAt: DS.attr(),
  fname: DS.attr(),
  lname: DS.attr(),
  donor: DS.belongsTo('donor'),
  campaign: DS.belongsTo('campaign'),
  owner: DS.attr(),
  campaignId: DS.attr(),
  histories: DS.hasMany('history'),
});
