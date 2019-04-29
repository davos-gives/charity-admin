import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({

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
    }

  }
});
