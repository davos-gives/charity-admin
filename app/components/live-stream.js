import Component from '@ember/component';
import { computed } from '@ember/object';
import { empty } from '@ember/object/computed';


export default Component.extend({

  isEmpty: computed('updates', function() {
    let updates = this.get('updates');
    if (updates.length === 0) {
      return true;
    }
  }),
});
