import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  classNames: ["w-420 h-full bg-white"],
  isFeatured: false,

  init() {
    this._super(...arguments);
    this.set('isFeatured', true);
  },

  desc: Object.freeze(['insertedAt:desc']),
  sortedComments: computed.sort('donor.comments', 'desc'),

  actions: {
    toggleSidebar() {
      this.set('isFeatured', !this.get('isFeatured'));
    },

    addTag() {
      this.addTag(this.get('newTag'));
      this.set("newTag", "");
    },

    addComment() {
      this.addComment(this.get('newComment'));
      this.set("newComment", "");
    },

    deleteTag(model) {
      this.deleteTag(model);
    }
  }
});
