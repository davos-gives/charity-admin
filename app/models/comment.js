import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { computed } from '@ember/object';

export default DS.Model.extend(LoadableModel,{
  body: DS.attr(),
  donor: DS.belongsTo('donor'),
  user: DS.belongsTo('user'),
});
