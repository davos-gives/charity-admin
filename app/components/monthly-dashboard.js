import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  classNames: ["w-1/2 ml-2"],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept', 'Oct', 'Nov', 'Dec'],
  filter: 'Jul',
  filteredGifts: [],


  init() {
    this._super(...arguments);
    let gifts = this.get('gifts');
    this.set('filteredGifts', gifts);
  },

  oneTimeGifts: computed('gifts.[]', 'filter', function(){
    let onetime = this.get('gifts').filter(donation => donation.get('frequency') === 'one-time')
    let yearMap = {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11};
    let filter = this.get('filter');
    let gifts = onetime.filter(donation => donation.get('timestamp') > new Date(2018, yearMap[filter], 1) && donation.get('timestamp') <= new Date(2018, yearMap[filter], 31));
    return gifts;
  }),

  recurringGifts: computed('gifts.[]', 'filter', function(){
    let recurring = this.get('gifts').filter(donation => donation.get('frequency') !== 'one-time')
    let yearMap = {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11};
    let filter = this.get('filter');
    let gifts = recurring.filter(donation => donation.get('timestamp') > new Date(2018, yearMap[filter], 1) && donation.get('timestamp') <= new Date(2018, yearMap[filter], 31));
    return gifts;
  }),

  oneTimeGiftsFormatted: computed('oneTimeGifts', function(){
    return this.get('oneTimeGifts').map(gift => {
      let date = new Date(gift.get('timestamp'));
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getYear();
      let amount = gift.get('amount');
      return({day: day, month: month, amount: amount, year: year});
    })
  }),

  recurringGiftsFormatted: computed('recurringGifts', function(){
    return this.get('recurringGifts').map(gift => {
      let date = new Date(gift.get('timestamp'));
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getYear();
      let amount = gift.get('amount');
      return({day: day, month: month, amount: amount, year: year});
    })
  }),

  oneTimeGiftAmounts: computed('oneTimeGifts', function() {
    return this.get('oneTimeGifts').mapBy('amount');
  }),

  oneTimeGiftsTotal: computed.sum('oneTimeGiftAmounts'),

  recurringGiftAmounts: computed('recurringGifts', function() {
    return this.get('recurringGifts').mapBy('amount');
  }),

  recurringGiftsTotal: computed.sum('recurringGiftAmounts'),

  donationAmounts: computed('gifts.[]', 'filter', function() {
    let gifts = this.get('gifts');
    let yearMap = {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11};
    let filter = this.get('filter');
    let filteredGifts = gifts.filter(donation => donation.get('timestamp') > new Date(2018, yearMap[filter], 1) && donation.get('timestamp') <= new Date(2018, yearMap[filter], 31));
    return filteredGifts.mapBy('amount');
  }),

  donationsTotal: computed.sum('donationAmounts'),

  actions: {
    filterByMonth(month) {
      this.set('filter', month);
    }
  }
});
