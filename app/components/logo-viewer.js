import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';


export default Component.extend({

  store: Ember.inject.service(),
  logos: '',

  page: 1,
  perPage: 3,

  init() {
    this._super(...arguments);
    this.set('logos', this.get('store').findAll('logo'));
  },

  sortedContent: Ember.computed('logos', function() {
    return this.get('logos');
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
