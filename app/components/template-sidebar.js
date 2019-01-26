import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

import ChangesetHistory from 'ember-changeset-history';


export default Component.extend({
  isContent: true,
  template: '',

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
