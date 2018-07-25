import DS from 'ember-data';
import { computed } from '@ember/object';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';

export default DS.Model.extend(LoadableModel,{
  city: DS.attr(),
  country: DS.attr(),
  email: DS.attr(),
  fname: DS.attr(),
  lname: DS.attr(),
  postal: DS.attr(),
  donations: DS.hasMany('donation'),
  recurrings: DS.hasMany('recurring'),
  histories: DS.hasMany('history'),

  totalDonations: computed('donations.@each.amount', function() {
    return this.get('donations').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  totalDonationsByMonth: computed('donations.[]', function() {
    let monthMap = {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11};
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let giftsByMonth = [];
    let allGifts = this.get('donations');

    months.forEach(function(month){
      let gifts = allGifts.filter(donation => donation.get('timestamp') > new Date(2018, monthMap[month], 1) && donation.get('timestamp') <= new Date(2018, monthMap[month], 31));
      let giftsAmount= gifts.mapBy('amount').reduce((a, b) => a + b, 0)
      giftsByMonth.push({month, giftsAmount})
    })
    return giftsByMonth;
  })
});
