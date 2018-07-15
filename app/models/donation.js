import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';

export default DS.Model.extend(LoadableModel, {
  amount: DS.attr(),
  frequency: DS.attr(),
  timestamp: DS.attr(),
  fname: DS.attr(),
  frequency: DS.attr(),
  donor: DS.belongsTo('donor'),
  owner: DS.attr(),
  campaignId: DS.attr(),
});
