import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';


export default DS.Model.extend(LoadableModel,{
  timestamp: DS.attr(),
  status: DS.attr(),
  amount: DS.attr(),
  frequency: DS.attr(),
  type: DS.attr(),
  donor: DS.belongsTo('donor'),
  beforeAmount: DS.attr(),
  afterAmount: DS.attr(),
  beforeFrequency: DS.attr(),
  afterFrequency: DS.attr(),
});
