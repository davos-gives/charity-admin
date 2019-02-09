import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import { exec, init } from 'pell'
import { task, timeout } from 'ember-concurrency';

import ChangesetHistory from 'ember-changeset-history';

export default Component.extend({
  isContent: false,
  template: '',
  fonts: ["Arvo", "Cardo", "Lato", "Lora", "Montserrat", "Oswald", "Open Sans", "PT Serif", "Raleway", "Roboto"],
  pellOptions: {
    actions: [
      {
        name: 'bold',
        icon: '<div class="bold"></div>',
        title: 'Bold',
        result: () => exec('bold')
      },
      {
        name: 'italic',
        icon: '<div class="italic"></div>',
        title: 'Italics',
        result: () => exec('italic')
      },
      {
        name: 'underline',
        icon: '<div class="underline"></div>',
        title: 'underline',
        result: () => exec('underline')
      },
      {
        name: 'justifyRight',
        icon: '<div class="justify-right"></div>',
        title: 'Justify Right',
        result: () => exec('justifyRight')
      },
      {
        name: 'justifyLeft',
        icon: '<div class="justify-left"></div>',
        title: 'Justify Left',
        result: () => exec('justifyLeft')
      },
      {
        name: 'justifyCenter',
        icon: '<div class="justify-center"></div>',
        title: 'Justify Center',
        result: () => exec('justifyCenter')
      },
      {
        name: 'justifyFull',
        icon: '<div class="justify-full"></div>',
        title: 'Justify Full',
        result: () => exec('justifyFull')
      },
      {
        name: 'Link',
        icon: '<div class="link"></div>',
        title: 'Link',
        result: () => exec('createLink')
      },
    ]
  },


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

  photosComplete: computed('changeset.imageUrl', function() {
    let imageUrl = this.get('changeset.imageUrl');
    if (imageUrl) {
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
    },

    updateText(newText) {
      this.set('changeset.font', newText);
      this.send('loadChanges');

    }
  }
});
