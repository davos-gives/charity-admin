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
  spouse: DS.attr(),
  relative: DS.attr(),
  phone: DS.attr(),
  payments: DS.hasMany('payment'),
  ongoingDonations: DS.hasMany('ongoing-donations'),
  donorHistory: DS.hasMany('donorHistory'),
  addresses: DS.hasMany('addresses'),

  totalDonations: computed('payments.@each.amount', function() {
    return this.get('payments').mapBy('amount').reduce((a,b) => a + b, 0)
  }),

  totalDonationsByMonth: computed('payments.[]', function() {
    let monthMap = {Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11};
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let giftsByMonth = [];
    let allGifts = this.get('payments');

    months.forEach(function(month){
      let gifts = allGifts.filter(donation => new Date(donation.get('createdAt')) > new Date(2019, monthMap[month], 1) && new Date(donation.get('createdAt')) <= new Date(2019, monthMap[month], 31));
      let giftsAmount= gifts.mapBy('amount').reduce((a, b) => a + b, 0)
      giftsByMonth.push({month, giftsAmount})
    })
    return giftsByMonth;
  })
});
