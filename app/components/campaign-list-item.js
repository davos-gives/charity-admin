import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames:['w-full py-8'],

  init() {
    this._super(...arguments);
    let payments = this.get('campaign.payments');
  },

  giftsToCampaign: computed('campaign.payments.@each', function() {
    console.log("gifts", this.get('campaign.payments'));
    return this.get('campaign.payments');
  }),

  campaignAmounts: computed('giftsToCampaign', function() {
    return this.get('giftsToCampaign').mapBy('amount');

  }),

  campaignTotal: computed.sum('campaignAmounts'),

  campaignGiftsFormatted: computed('giftsToCampaign.@each', function(){
    return this.get('giftsToCampaign').map(gift => {
      let date = new Date(gift.get('createdAt'));
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getYear();
      let amount = gift.get('amount');
      return({day: day, month: month, amount: amount, year: year});
    })
  }),

});
