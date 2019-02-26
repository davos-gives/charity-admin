import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';


export default Component.extend({

  store: Ember.inject.service(),
  photos: '',

  page: 1,
  perPage: 6,

  init() {
    this._super(...arguments);
    this.set('photos', this.get('store').findAll('photo'));
  },

  sortedContent: Ember.computed('photos', function() {
    return this.get('photos');
  }),

  pagedContent: pagedArray('sortedContent', {perPage: 6}),

  page: Ember.computed.alias("pagedContent.page"),
  perPage: Ember.computed.alias("pagedContent.perPage"),
  totalPages: Ember.computed.oneWay("pagedContent.totalPages"),

  actions: {
    updateSelection(url) {
      this.onChange(url);
    },
  }

});
