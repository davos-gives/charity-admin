import Component from '@ember/component';

export default Component.extend({
  classNames:['contains'],

  focused: false,

  succeeded: Ember.computed.equal('status', 'success'),
  payment: Ember.computed.equal('type', 'payment'),
  successfulPayment: Ember.computed.and('succeeded', 'payment'),
  update: Ember.computed.equal('status', 'update'),
  cancelled: Ember.computed.equal('status', 'cancellation'),
  recurring: Ember.computed.equal('type', 'recurring'),
  registerRecurring: Ember.computed.and('succeeded', 'recurring'),
  updateRecurring: Ember.computed.and('recurring', 'update'),
  cancelRecurring: Ember.computed.and('recurring', 'cancelled'),

  actions: {
    focusedIn() {
     this.set('focused', true);
    },

    focusedOut() {
     this.set('focused', false);
    }
  }
});
