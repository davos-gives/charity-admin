import Component from '@ember/component';

export default Component.extend({

  isRecurring: false,

    willRender() {
    this._super(...arguments);
    const giftType = this.get('frequency');
    if (giftType !== 'one-time') {
      this.set('isRecurring', true);
    }
  }
});
