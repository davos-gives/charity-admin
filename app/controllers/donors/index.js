import Controller from "@ember/controller";
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

  currentUser: service('current-user'),
  session: service('session'),


  queryParams: ['search'],
  search: "",

  donorsIdDesc: Object.freeze(['id:desc']),
  donorsIdAsc: Object.freeze(['id:asc']),

  donorsByIdDesc: computed.sort('model', 'donorsIdDesc'),
  donorsByIdAsc: computed.sort('model', 'donorsIdAsc'),

  actions: {
    logout(ev) {
      ev.preventDefault();
      this.get('session').invalidate();
    }
  }
});
