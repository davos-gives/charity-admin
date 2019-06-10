import DS from 'ember-data';
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  session: service('session'),
  namespace: "api/admin",
  host: ENV.APP.host,

  headers: computed(function() {
    let session = this.get('session');

    if (session.get('isAuthenticated')) {
      return {
        Authorization: `Bearer ${session.get('data.authenticated.token')}`
      };
    }

    return {};
  }),
});
