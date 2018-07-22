import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';


export default DS.Model.extend(LoadableModel,{
  timestamp: DS.attr(),
  status: DS.attr(),
  donor: DS.belongsTo('donor'),
});
