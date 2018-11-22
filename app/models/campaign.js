import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { computed } from '@ember/object';

export default DS.Model.extend(LoadableModel,{
  name: DS.attr(),
  payments: DS.hasMany('payments'),
  createdAt: DS.attr(),
  publishDate: DS.attr(),
  endDate: DS.attr(),
});
