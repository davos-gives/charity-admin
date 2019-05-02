import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { computed } from '@ember/object';

export default DS.Model.extend(LoadableModel,{
  url: DS.attr(),
  category: DS.attr(),
});
