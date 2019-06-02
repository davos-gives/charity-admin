import Controller from "@ember/controller";
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ['search'],
  search: "",
  currentUser: service('current-user'),
  session: service('session'),



  actions: {
    logout(ev) {
      ev.preventDefault();
      this.get('session').invalidate();
    }
  }

});
