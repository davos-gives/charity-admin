import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  giftsToday: computed('model.donations.[]', function() {
    let date = new Date();
    date.setHours(0,0,0,0);
    return this.get('model.donations').filter(donation => donation.get('timestamp') > date)
  }),

  giftsToCampaign: computed('model.donations.[]', function() {
    return this.get('model.donations').filter(donation => donation.get('campaignId') === 1)
  }),

  campaignAmounts: computed('giftsToCampaign', function() {
    return this.get('giftsToCampaign').mapBy('amount');
  }),

  campaignTotal: computed.sum('campaignAmounts'),

  donorCount: computed.alias('model.donors.length'),

  oneTimeGiftsToday: computed('giftsToday', function(){
    return this.get('giftsToday').filter(donation => donation.get('frequency') === 'one-time')
  }),

  recurringGiftsToday: computed('giftsToday', function(){
    return this.get('giftsToday').filter(donation => donation.get('frequency') !== 'one-time')
  }),

  oneTimeGifts: computed('model.donations.[]', function(){
    return this.get('model.donations').filter(donation => donation.get('frequency') === 'one-time')
  }),

  recurringGifts: computed('model.donations.[]', function(){
    return this.get('model.donations').filter(donation => donation.get('frequency') !== 'one-time')
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

  donationAmounts: computed('model.donations.[]', function() {
    return this.get('model.donations').mapBy('amount');
  }),

  donationsTotal: computed.sum('donationAmounts'),

  donationsCount: computed.alias('donationAmounts.length'),

  averageDonation: computed('donationsCount', 'donationsTotal', function() {
    return (this.get('donationsTotal') / this.get('donationsCount'));
  }),

  giftsSortingDesc: Object.freeze(['timestamp:desc']),
  liveGifts: computed.sort('giftsToday', 'giftsSortingDesc'),

  donorSortingDesc: Object.freeze(['totalDonations:desc']),
  topDonors: computed.sort('model.donors', 'donorSortingDesc'),
});
