import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  previewSize: "Desktop",
  saved: false,

  previewMobile: computed('previewSize', function() {
    return this.get('previewSize') == "Mobile"
  }),

  sidebarVisible: true,

  templateUrl: computed('model.template', function() {
    return `http://localhost:4000/receipt_templates/1`;
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
     console.log('toggling to mobile');
   },

   toggleDesktop() {
     this.set('previewSize', "Desktop");
     console.log('toggling to desktop?!');
   },

   saveDraft() {
     this.toggleProperty('saved');
   },

   saveChanges(changes) {
     this.model.setProperties(changes);

    this.model.save()
      .then(() => {
        this.toggleProperty('saved');
        this.transitionToRoute('receipts')
      });
   },
 }
});
