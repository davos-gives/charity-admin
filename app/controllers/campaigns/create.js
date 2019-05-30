import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  previewSize: "Desktop",
  saved: false,
  currentUser: service('current-user'),


  previewMobile: computed('previewSize', function() {
    return this.get('previewSize') == "Mobile"
  }),

  sidebarVisible: true,

  templateUrl: computed('model.template', function() {
    let id = this.get('model.template');
    return `https://localhost:4000/templates/${id}`;
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

   saveDraft() {
     this.toggleProperty('saved');
   },

   saveChanges(changes) {
     const campaign = this.store.createRecord('campaign', changes);
     campaign.set('templateId', this.get('model.template'));
     campaign.set('published', true);

     campaign.save()
      .then(() => {
        this.transitionToRoute('index')
      });
   },

   logout(ev) {
     ev.preventDefault();
     this.get('session').invalidate();
   }
 }
});
