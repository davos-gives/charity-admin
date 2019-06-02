import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin,{
  model: function() {
    return RSVP.hash({
      receipts: this.store.findAll('receipt'),
      receiptTemplate: this.store.find('receipt-template', 1),
    })
  },
});
