import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import RSVP from 'rsvp';

import ChangesetHistory from 'ember-changeset-history';

export default Component.extend({

  store: Ember.inject.service(),

  isContent: true,
  template: '',
  pellOptions: {actions: ['bold', 'italic', 'underline', 'paragraph']},
  showGoal: computed('changeset.hasGoal', function() {
    let goal = this.get('changeset.hasGoal');
    if (goal == true) {
      return true;
    }
  }),

  showDateFields: computed('changeset.hasEndDate', function() {
    let goal = this.get('changeset.hasEndDate');
    if (goal == true) {
      return true;
    }
  }),

  contentComplete: computed('changeset.name', 'changeset.description', function() {
    let name = this.get('changeset.name');
    let description = this.get('changeset.description');
    if ((name != "") && (description != "")) {
      return true
    }
  }),

  photosComplete: computed('changeset.imageurl', function() {
    let imageUrl = this.get('changeset.imageUrl');
    if (imageUrl != "") {
      return true
    }
  }),

  undoDisabled: computed.not('changeset.canUndo'),
  redoDisabled: computed.not('changeset.canRedo'),

  init() {
    this._super(...arguments);
    this.changeset = new ChangesetHistory(this.get('template'), () => true, {}, {maxHistoryLength: 0});

    // transfer to photo loading component
    // this.get('store').findAll('photo');
  },

  actions: {
    loadChanges() {
      setTimeout(() =>  {
        let changes = this.get('changeset.changes');
        var iframe = document.getElementById('my-iframe');
        iframe.contentWindow.postMessage(changes, '*');
      }, 200);
    },

    updateHasGoal() {
      this.set('changeset.hasGoal', !this.get('changeset.hasGoal'));
      this.set('changeset.showGoal', false);
      this.set('changeset.goalInDollars', '');
      this.send('loadChanges');
    },

    updateShowGoal() {
      this.set('changeset.showGoal', !this.get('changeset.showGoal'));
      this.send('loadChanges');
    },

    toggleSidebar() {
      this.set('isContent', !this.get('isContent'));
    },

    undo() {
      this.get('changeset').undo();
      this.send('loadChanges');
    },

    redo() {
      this.get('changeset').redo();
      this.send('loadChanges');
    },
  }
});
