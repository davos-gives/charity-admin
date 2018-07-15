import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({

  totalDonations: computed('model.donations.@each.amount', function() {
    return this.get('model.donations').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  yearlyDonations: computed('model.donations.@each.frequency', function() {
    let date = new Date();
    date.setHours(0,0,0,0);
    return this.get('model.donations').filter(donation => donation.get('timestamp') > date);
  }),

  yearlyDonationAmount: computed('yearlyDonations', function() {
    return this.get('yearlyDonations').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  giftsSortingDesc: Object.freeze(['timestamp:desc']),

  orderedGifts: computed.sort('yearlyDonations', 'giftsSortingDesc'),

  firstOrderedGift: computed('orderedGifts', function() {
    return this.get('orderedGifts')[0];
  }),

});
