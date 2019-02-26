import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  previewSize: "Desktop",

  previewMobile: computed('previewSize', function() {
    return this.get('previewSize') == "Mobile"
  }),

  sidebarVisible: true,

  templateUrl: computed('model.template', function() {
    let id = this.get('model.template');
    return `https://app.davos.gives/templates/${id}`;
  }),


  actions: {
   toggleSidebar() {
     this.toggleProperty('sidebarVisible');
   },

   updateTemplate(id) {
     this.set('model.template', id);
   },

   toggleMobile() {
     this.set('previewSize', "Mobile");
   },

   toggleDesktop() {
     this.set('previewSize', "Desktop");
   },

 }
});
