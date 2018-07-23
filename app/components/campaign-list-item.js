import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames:['w-full my-8 py-8'],

  giftsToCampaign: computed('campaign.donations.@each', function() {
    console.log(this.get('campaign.donations.length'));
    return this.get('campaign.donations');
  }),

  campaignAmounts: computed('giftsToCampaign', function() {
    console.log( this.get('giftsToCampaign').mapBy('amount'));
    return this.get('giftsToCampaign').mapBy('amount');
  }),

  campaignTotal: computed.sum('campaignAmounts'),

  campaignGiftsFormatted: computed('giftsToCampaign', function(){
    return this.get('giftsToCampaign').map(gift => {
      let date = new Date(gift.get('timestamp'));
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getYear();
      let amount = gift.get('amount');
      return({day: day, month: month, amount: amount, year: year});
    })
  }),

});
