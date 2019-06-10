import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from "@ember/service";

export default Controller.extend({

  currentUser: service('current-user'),
  session: service('session'),

  giftsToday: computed('model.payments.[]', function() {
    let date = new Date();
    date.setHours(0,0,0,0);
    return this.get('model.payments').filter(payment => new Date(payment.get('createdAt')) > date)
  }),

  giftsToCampaign: computed('model.payments.[]', function() {
    return this.get('model.payments').filter(payment => payment.get('campaignId') === 1)
  }),

  campaignAmounts: computed('giftsToCampaign', function() {
    return this.get('giftsToCampaign').mapBy('amount');
  }),

  activeCampaigns: computed('model.campaigns', function() {
    return this.get('model.campaigns').filter(campaign => campaign.get('published') == true);
  }),

  activeCampaignCount: computed.alias('activeCampaigns.length'),

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

  donationAmounts: computed('model.payments.[]', function() {
    return this.get('model.payments').mapBy('amount');
  }),

  donationsTotal: computed.sum('donationAmounts'),

  donationsCount: computed.alias('donationAmounts.length'),

  averageDonation: computed('donationsCount', 'donationsTotal', function() {
    return (this.get('donationsTotal') / this.get('donationsCount'));
  }),

  giftsSortingDesc: Object.freeze(['createdAt:desc']),

  liveGifts: computed.sort('giftsToday', 'giftsSortingDesc'),

  donorSortingDesc: Object.freeze(['totalDonations:desc']),
  topDonors: computed.sort('model.donors', 'donorSortingDesc'),

  actions: {
    logout(ev) {
      console.log("clicking");
      ev.preventDefault();
      this.get('session').invalidate();
    }
  }
});
