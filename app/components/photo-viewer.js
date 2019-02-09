import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';

export default Component.extend({

  store: Ember.inject.service(),
  photos: '',

  init() {
    this._super(...arguments);
    this.set('photos', this.get('store').findAll('photo'));
  },

  actions: {
    updateSelection(url) {
      this.onChange(url);
    },
  }

});
