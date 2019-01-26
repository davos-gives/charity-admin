import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({

  DesktopSize: computed('previewSize', function() {
    return this.get('previewSize') == "Desktop"
  }),

  actions: {
    toggleMobile() {
      this.toggleMobile();
    },

    toggleDesktop() {
      this.toggleDesktop();
    }
  },
});
