import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service('current-user'),
  session: service('session'),

  showActiveCampaigns: true,

  activeCampaigns: computed('model', function(){
    return this.get('model').filter(campaign => campaign.get('published') == true)
  }),

  unpublishedCampaigns: computed('model', function(){
    return this.get('model').filter(campaign => campaign.get('published') != true)
  }),

  actions: {
    toggleCampaignView() {
      this.set('showActiveCampaigns', !this.get('showActiveCampaigns'));
    },

    logout(ev) {
      ev.preventDefault();
      this.get('session').invalidate();
    }

  }
});
