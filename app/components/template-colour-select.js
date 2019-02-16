import Component from '@ember/component';

export default Component.extend({

  actions: {
    loadColourSet(colour) {
      this.onChange(colour);
    },
  }

});
