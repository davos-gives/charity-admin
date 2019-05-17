import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({

  activeDonations: computed('model.ongoingDonations', function(){
    return this.get('model.ongoingDonations').filter(donation => donation.get('status') == "active")
  }),

  actions: {
    editOngoing(ongoing) {
      this.transitionToRoute('donors.show.edit-payment', ongoing)
    }
  }

})
