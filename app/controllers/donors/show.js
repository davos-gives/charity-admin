import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({

  totalDonations: computed('model.payments.@each.amount', function() {
    return this.get('model.payments').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  yearlyDonations: computed('model.payments.@each.createdAt', function() {
    let date = new Date();
    date.setHours(0,0,0,0);
    date.setDate(1);
    date.setMonth(0);
    return this.get('model.payments').filter(donation => new Date(donation.get('createdAt')) > date);
  }),

  allDonations: computed('model.payments.@each.amount', function() {
    return this.get('model.payments');
  }),

  yearlyDonationAmount: computed('yearlyDonations', function() {
    return this.get('yearlyDonations').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  giftsSortingDesc: Object.freeze(['createdAt:desc']),
  giftsSortingAsc: Object.freeze(['createdAt:asc']),

  orderedGifts: computed.sort('allDonations', 'giftsSortingDesc'),

  orderedLastGifts: computed.sort('allDonations', 'giftsSortingAsc'),

  firstOrderedGift: computed('orderedGifts', function() {
    return this.get('orderedGifts')[0];
  }),

  lastOrderedGift: computed('model.payments.@each.createdAt', function() {
    return this.get('orderedLastGifts')[0];
  }),

  recurringGifts: computed('allDonations', function(){
    return this.get('allDonations').filter(donation => donation.get('frequency') !== 'one-time')
  }),

  activeDonations: computed('model.ongoingDonations', function(){
    return this.get('model.ongoingDonations').filter(donation => donation.get('status') == "active")
  }),

  actions: {
    editOngoing(ongoing) {
      console.log("edit me", ongoing)
    }
  }

});
