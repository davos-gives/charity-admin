import Route from '@ember/routing/route';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {

  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setTimeZone('America/Los_Angeles');
  },

  model() {
    return this.store.loadAll('campaign');
  },
});
