import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({


  IdDesc: Object.freeze(['id:desc']),
  IdAsc: Object.freeze(['id:asc']),

  receiptsDesc: computed.sort('model', 'IdDesc'),
  receiptsdAsc: computed.sort('model', 'IdAsc'),

});
