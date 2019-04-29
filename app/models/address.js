import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { computed } from '@ember/object';

export default DS.Model.extend(LoadableModel,{
  name: DS.attr(),
  address_1: DS.attr(),
  address_2: DS.attr(),
  postal_code: DS.attr(),
  city: DS.attr(),
  province: DS.attr(),
  country: DS.attr()
});
