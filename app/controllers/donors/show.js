import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({

  totalDonations: computed('model.donations.@each.amount', function() {
    return this.get('model.donations').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  yearlyDonations: computed('model.donations.@each.timestamp', function() {
    let date = new Date();
    date.setHours(0,0,0,0);
    date.setDate(1);
    date.setMonth(0);
    return this.get('model.donations').filter(donation => donation.get('timestamp') > date);
  }),

  allDonations: computed('model.donations.@each.amount', function() {
    return this.get('model.donations');
  }),

  yearlyDonationAmount: computed('yearlyDonations', function() {
    return this.get('yearlyDonations').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  giftsSortingDesc: Object.freeze(['timestamp:desc']),
  giftsSortingAsc: Object.freeze(['timestamp:asc']),

  orderedGifts: computed.sort('allDonations', 'giftsSortingDesc'),

  orderedLastGifts: computed.sort('allDonations', 'giftsSortingAsc'),


  firstOrderedGift: computed('orderedGifts', function() {
    return this.get('orderedGifts')[0];
  }),

  lastOrderedGift: computed('model.donations.@each.timestamp', function() {
    return this.get('orderedLastGifts')[0];
  }),

  recurringGifts: computed('allDonations', function(){
    return this.get('allDonations').filter(donation => donation.get('frequency') !== 'one-time')
  }),

});
