import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({

  donationAmounts: computed('model.donations.@each', function() {
    return this.get('model.donations').mapBy('amount');
  }),

  donationsTotal: computed.sum('donationAmounts'),
});
