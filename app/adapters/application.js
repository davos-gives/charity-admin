import DS from 'ember-data';
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default DS.JSONAPIAdapter.extend({
  session: service('session'),
  namespace: "api/admin",
  host: 'https://app.davos.gives',

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
