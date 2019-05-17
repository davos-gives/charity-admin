import Route from '@ember/routing/route';
import RSVP from 'rsvp';


export default Route.extend({
  model: function() {
    return RSVP.hash({
      receipts: this.store.findAll('receipt'),
      receiptTemplate: this.store.find('receipt-template', 1),
    })
  },
});
