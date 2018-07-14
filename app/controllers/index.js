import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({

  giftsToday: computed('model.[]', function() {
    let date = new Date();
    date.setHours(0,0,0,0);
    return this.get('model').filter(donation => donation.get('timestamp') > date)
  }),

  oneTimeGiftsToday: computed('giftsToday', function(){
    return this.get('giftsToday').filter(donation => donation.get('frequency') === 'one-time')
  }),

  recurringGiftsToday: computed('giftsToday', function(){
    return this.get('giftsToday').filter(donation => donation.get('frequency') !== 'one-time')
  }),

  NewDonorsToday: computed('giftsToday', function() {
    return this.get('giftsToday').filter(donation => donation.get('owner') === null)
  }),

  OneTimeGiftsTodayCount: computed.alias('oneTimeGiftsToday.length'),

  recurringGiftsTodayCount: computed.alias('recurringGiftsToday.length'),

  newDonorsTodayCount: computed.alias('NewDonorsToday.length'),

  dailyDonationAmounts: computed('giftsToday', function() {
    return this.get('giftsToday').mapBy('amount');
  }),

  dailyDonationTotal: computed.sum('dailyDonationAmounts'),

  donationAmounts: computed('model.[]', function() {
    return this.get('model').mapBy('amount');
  }),

  donationsTotal: computed.sum('donationAmounts'),

  donationsCount: computed.alias('donationAmounts.length'),

  averageDonation: computed('donationsCount', 'donationsTotal', function() {
    return (this.get('donationsTotal') / this.get('donationsCount'));
  }),

  giftsSortingDesc: Object.freeze(['timestamp:desc']),
  liveGifts: computed.sort('giftsToday', 'giftsSortingDesc'),
});
