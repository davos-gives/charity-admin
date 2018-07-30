import Component from '@ember/component';
import { computed } from '@ember/object';
import { empty } from '@ember/object/computed';

export default Component.extend({
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept', 'Oct', 'Nov', 'Dec'],
  filter: 'Jul',
  filteredDonors: [],

  init() {
    this._super(...arguments);
    let donors = this.get('donors');
    this.set('filteredDonors', donors);
  },

  didReceiveAttrs() {
    console.log('received attrs');
  },

  filteredDonorsByMonth: computed('donors.@each.{totalDonationsByMonth,totalDonations}', 'filter', function() {
    let filter = this.get('filter');
    let donorAmounts = this.get('donors').map(donor => {
      let fname = donor.get('fname');
      let lname = donor.get('lname');
      let totalAmount = donor.get('totalDonations');
      let gift = donor.get('totalDonationsByMonth').filter(month => {
          return month.month === filter;
      })
      return({fname, lname, amount: gift[0].giftsAmount, totalAmount: totalAmount })
    })
    return donorAmounts
  }),

  donorsWithGiftsByMonth: computed('filteredDonorsByMonth', function() {
    let filteredDonors = this.get('filteredDonorsByMonth').filter(donor => {
      return donor.amount > 0;
    })
    return filteredDonors;
  }),

  isEmpty: computed('donorsWithGiftsByMonth', function() {
    let updates = this.get('donorsWithGiftsByMonth');
    if (updates.length === 0) {
      return true;
    }
  }),

  SortingDesc: Object.freeze(['amount:desc']),
  orderedDonorsWithGiftsByMonth: computed.sort('donorsWithGiftsByMonth', 'SortingDesc'),

  actions: {
    filterByMonth(month) {
      this.set('filter', month);
    }
  }
});
