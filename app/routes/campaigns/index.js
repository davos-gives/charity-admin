import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({

  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setTimeZone('America/Los_Angeles');
  },

  model() {
    return this.store.loadAll('campaign');
  },
});
