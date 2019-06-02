import Route from '@ember/routing/route';
import RSVP from 'rsvp';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin,{
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
