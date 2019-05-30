import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default Controller.extend({
  currentUser: service('current-user'),


  IdDesc: Object.freeze(['id:desc']),
  IdAsc: Object.freeze(['id:asc']),

  receiptsDesc: computed.sort('model', 'IdDesc'),
  receiptsdAsc: computed.sort('model', 'IdAsc'),

  actions: {
    logout(ev) {
      ev.preventDefault();
      this.get('session').invalidate();
    }
  }

});
