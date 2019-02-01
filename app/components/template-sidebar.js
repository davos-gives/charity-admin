import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

import ChangesetHistory from 'ember-changeset-history';

export default Component.extend({
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

  undoDisabled: computed.not('changeset.canUndo'),
  redoDisabled: computed.not('changeset.canRedo'),

  init() {
    this._super(...arguments);
    this.changeset = new ChangesetHistory(this.get('template'), () => true, {}, {maxHistoryLength: 0});
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
    }
  }
});
