import Component from '@ember/component';

export default Component.extend({

  didUpdateAttrs() {
    this._super(...arguments);
    let gifts = this.get('status');
  },
});
