import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model: function() {
    return RSVP.hash({
      payments: this.store.findAll('payment'),
      donors: this.store.findAll('donor', {
        include: 'payments'
      }),
      campaigns: this.store.findAll('campaign', {
        include: 'payments'
      })
    });
  }
});
