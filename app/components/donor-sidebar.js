import Component from '@ember/component';

export default Component.extend({
  classNames: ["w-1/4 h-full bg-white"],
  isFeatured: false,

  init() {
    this._super(...arguments);
    this.set('isFeatured', true);
  },

  actions: {
    toggleSidebar() {
      this.set('isFeatured', !this.get('isFeatured'));
    }
  }
});
