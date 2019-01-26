import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  previewSize: "Desktop",

  previewMobile: computed('previewSize', function() {
    return this.get('previewSize') == "Mobile"
  }),

  sidebarVisible: true,

  actions: {
   toggleSidebar() {
     this.toggleProperty('sidebarVisible');
   },

   toggleMobile() {
     this.set('previewSize', "Mobile");
     console.log('toggling to mobile');
   },

   toggleDesktop() {
     this.set('previewSize', "Desktop");
     console.log('toggling to desktop?!');
   }
 }
});
