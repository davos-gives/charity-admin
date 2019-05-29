import Component from '@ember/component';

export default Component.extend({
  classNames: ["w-420 h-full bg-white"],
  isFeatured: false,

  init() {
    this._super(...arguments);
    this.set('isFeatured', true);
  },

  actions: {
    toggleSidebar() {
      this.set('isFeatured', !this.get('isFeatured'));
    },

    addTag() {
      this.addTag(this.get('newTag'));
      this.set("newTag", "");
    },

    deleteTag(model) {
      this.deleteTag(model);
    }
  }
});
