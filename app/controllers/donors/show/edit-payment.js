import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { set } from '@ember/object';



export default Controller.extend({

  approvedModification: false,

  actions: {
    toggleApproved() {
      let newState = !this.get('approvedModification')
      set(this, 'approvedModification', newState);
    },
  }
})
