import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';


export default DS.Model.extend(LoadableModel,{
  createdAt: DS.attr(),
  status: DS.attr(),
  amount: DS.attr(),
  frequency: DS.attr(),
  historyType: DS.attr(),
  donor: DS.belongsTo('donor'),
  ongoingDonation: DS.belongsTo('ongoing-donation'),
  payment: DS.belongsTo('payment'),
  beforeAmount: DS.attr(),
  afterAmount: DS.attr(),
  beforeFrequency: DS.attr(),
  afterFrequency: DS.attr(),
});
