import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from "@ember/service";


export default Route.extend(ApplicationRouteMixin, {
  session: service('session'),
  currentUser: service(),

  beforeModel() {
    this._super(...arguments);
    this.loadUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this.loadUser();
  },

  sessionInvalidated() {
    window.location.replace('/login');
  },

  loadUser() {
    if(this.get('session.isAuthenticated')) {
      return this.get('currentUser').load();
    }
  },


});
