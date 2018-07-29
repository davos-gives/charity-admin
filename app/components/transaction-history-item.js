import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  classNames:['contains'],

  focused: false,

  succeeded: computed.equal('status', 'success'),
  payment: computed.equal('type', 'payment'),
  update: computed.equal('status', 'update'),
  cancelled: computed.equal('status', 'cancellation'),
  recurring: computed.equal('type', 'recurring'),

  successfulPayment: computed.and('succeeded', 'payment'),
  registerRecurring: computed.and('succeeded', 'recurring'),
  cancelRecurring: computed.and('recurring', 'cancelled'),

  updateDecreaseAmountNotFrequency: computed.equal('status', "updateDecreaseAmountNotFrequency"),
  updateDecreaseAmountAndFrequency: computed.equal('status', "updateDecreaseAmountAndFrequency"),

  updateFrequency: computed.equal('status', "updatedFrequency"),

  updateIncreaseAmountNotFrequency: computed.equal('status', "updateIncreaseAmountNotFrequency"),
  updateIncreaseAmountAndFrequency: computed.equal('status', "updateIncreaseAmountAndFrequency"),

  donationAmount: computed('amountBefore', function() {
    let amountBefore = this.get('amountBefore');
    return AmountBefore;
  }),

  actions: {
    focusedIn() {
     this.set('focused', true);
    },

    focusedOut() {
     this.set('focused', false);
    }
  }
});
