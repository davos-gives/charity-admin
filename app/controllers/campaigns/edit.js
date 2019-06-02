import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service('current-user'),
  session: service('session'),

  previewSize: "Desktop",
  saved: false,
  published: false,

  previewMobile: computed('previewSize', function() {
    return this.get('previewSize') == "Mobile"
  }),

  sidebarVisible: true,

  templateUrl: computed('model', 'model.templateId', function() {
    let templateId = this.get('model.templateId');
    // if (templateId) {
    //   return `http://localhost:4000/templates/${templateId}`;
    // }
    let id = this.get('model.id');
    if (id) {
      return `https://app.davos.gives/campaigns/${id}`;
    }
  }),

  templateId: computed('model.templateId', function() {
    let id = this.get('model.templateId');
    if (id) {
      return id;
    }
  }),


  actions: {
   toggleSidebar() {
     this.toggleProperty('sidebarVisible');
   },

   updateTemplate(id) {
     this.set('model.templateId', id);
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

   publishTrigger() {
     this.toggleProperty('published');
   },

   saveChanges(changes) {
     this.model.setProperties(changes);

    this.model.save()
      .then(() => {
        this.transitionToRoute('campaigns.edit', this.model.id)
      });
   },

   publish(changes) {
     this.model.setProperties(changes);
     this.model.set('published', true);
     this.model.save()
      .then(() => {
        this.set('published', false);
        this.transitionToRoute('campaigns.index');
      });
   },

   logout(ev) {
     ev.preventDefault();
     this.get('session').invalidate();
   }
 }
});
