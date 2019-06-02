import Component from '@ember/component';

export default Component.extend({

  paymentAmountOptions:  [1000, 2000, 3000],
  paymentFrequencyOptions: ["daily", "weekly", "biweekly", "monthly"],

  doubleConfirmCancel: false,

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      amount: this.get('donation.amount'),
      frequency: this.get('donation.frequency'),
      createdAt: this.get('donation.createdAt'),
      campaign: this.get('donation.campaign')
    })
  },

  actions: {
    updateProvince(province) {
      this.set('province', province);
    },

    onCancel(ev) {
      this.onCancel();
    },

    doubleConfirmCancel() {
      this.set('doubleConfirmCancel', true);
    },

    saveAddress() {

      this.onsubmit({
        amount: this.amount,
        frequency: this.frequency,
      })
    },

    undoCancellation() {
      this.set('doubleConfirmCancel', false);
    },

    deleteAddress() {
      this.deleteAddress();
    },

    createPayment(payment) {
      this.set('amount', payment*100);
      this.set('amountEdited', true);
    },

    updatePayment(payment) {
      this.set('amount', payment);
      this.set('amountEdited', true);
    },

    customSuggestion(term) {
    return `Change to ${term} dollars`;
  },

  }
});
