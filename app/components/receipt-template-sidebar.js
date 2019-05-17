import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import Ember from 'ember';
import { exec, init } from 'pell'
import { task, timeout } from 'ember-concurrency';

import ChangesetHistory from 'ember-changeset-history';

export default Component.extend({
  isContent: true,
  template: '',
  colourSet: "golden",
  lightMode: false,
  fonts: ["Arvo", "Cardo", "Lato", "Lora", "Montserrat", "Oswald", "Open Sans", "PT Serif", "Raleway", "Roboto"],
  dateFormats: ["MM / DD / YY", "MM - DD - YY", "DD / MM / YY", "DD - MM - YY"],

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
    ]
  },

  didInsertElement() {
    this._super(...arguments);
  },

  didReceiveAttrs() {
   this._super(...arguments);
   let saved = this.get('saved');
   if (saved == true) {
     this.changeset.save();
     this.sendAction('saveChanges', this.changeset.get('data'));
   }
 },


  showGoal: computed('changeset.hasGoal', function() {
    let goal = this.get('changeset.hasGoal');
    if (goal == true) {
      return true;
    }
  }),

  hidden: computed('visible', function() {
    let state = this.get('visible');
    if (state == false) {
      return "hidden";
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

  fontsColoursComplete: computed('changeset.font', 'changeset.primaryColour', 'changeset.secondaryColour','changeset.tertiaryColour', 'changeset.quaternaryColour', 'quinaryColour', function() {
    let font = this.get('changeset.font');
    let primary = this.get('changeset.primaryColour');
    let secondary = this.get('changeset.secondaryColour');
    let tertiary = this.get('changeset.tertiaryColour');
    let quaternary = this.get('quaternaryColour');
    let quinary = this.get('quinaryColour');
    if ((font != null) && (primary != "") && (secondary != "") && (tertiary != "") && (quaternary != "") && (quinary != "")) {
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
    this.send('loadChanges');
  },

  actions: {
    loadChanges() {
      setTimeout(() =>  {
        let changes = this.get('changeset.changes');
        console.log(changes)
        var iframe = document.getElementById('my-iframe');
        iframe.contentWindow.postMessage({source: "receipt", changes}, '*');
      }, 200);
    },

    renderFirstTemplate() {
      this.sendAction('updateTemplate', 1);
      this.set('changeset.template', 1);
      this.send('loadChanges');
    },

    renderSecondTemplate() {
      this.sendAction('updateTemplate', 2);
      this.set('changeset.template', 2);
      this.send('loadChanges');

    },

    renderThirdTemplate() {
      this.sendAction('updateTemplate', 3);
      this.set('changeset.template', 3);
      this.send('loadChanges');

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

    toggleFacebookShare() {
      let now = this.get('changeset.facebook_share');
      if (now == "true") {
        this.set('changeset.facebook_share', "false");
      } else {
        this.set('changeset.facebook_share', "true");
      }
      this.send('loadChanges');
    },

    toggleLinkedinShare() {
      let now = this.get('changeset.linkedin_share');
      if (now == "true") {
        this.set('changeset.linkedin_share', "false");
      } else {
        this.set('changeset.linkedin_share', "true");
      }
      this.send('loadChanges');
    },

    toggleTwitterShare() {
      let now = this.get('changeset.twitter_share');
      if (now == "true") {
        this.set('changeset.twitter_share', "false");
      } else {
        this.set('changeset.twitter_share', "true");
      }
      this.send('loadChanges');
    },

    toggleEmailShare() {
      let now = this.get('changeset.email_share');
      if (now == "true") {
        this.set('changeset.email_share', "false");
      } else {
        this.set('changeset.email_share', "true");
      }
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
    },

    updateDateFormat(newFormat) {
      this.set('changeset.dateFormat', newFormat);
      this.send('loadChanges');
    },

    updateManualColour(colour, field) {
      this.send('loadChanges');
    },

    toggleLightMode() {
      this.set('lightMode', !this.get('lightMode'));
      this.send("loadColourSet", this.get('colourSet'));
    },

    loadColourSet(colour) {
      this.set('colourSet', colour);
      let mode = this.get('lightMode');
      if (mode == true) {
          switch(colour) {
            case "golden":
              this.set('changeset.primaryColour', "#E5AD23");
              this.set('changeset.secondaryColour', "#411E82");
              this.set('changeset.tertiaryColour', "#f6f4f1");
              this.set('changeset.quaternaryColour', "#666271");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "ultra violet":
              this.set('changeset.primaryColour', "#502BA3");
              this.set('changeset.secondaryColour', "#3BB7B3");
              this.set('changeset.tertiaryColour', "#F6F6F6");
              this.set('changeset.quaternaryColour', "#666271");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "red":
              this.set('changeset.primaryColour', "#BE1E2D");
              this.set('changeset.secondaryColour', "#B2A37E");
              this.set('changeset.tertiaryColour', "#F6F6F6");
              this.set('changeset.quaternaryColour', "#666271");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "forest":
              this.set('changeset.primaryColour', "#7F682E");
              this.set('changeset.secondaryColour', "#509C1F");
              this.set('changeset.tertiaryColour', "#F2F4F0");
              this.set('changeset.quaternaryColour', "#666271");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "tangerine":
              this.set('changeset.primaryColour', "#E9995A");
              this.set('changeset.secondaryColour', "#411E82");
              this.set('changeset.tertiaryColour', "#F6F4F1");
              this.set('changeset.quaternaryColour', "#666271");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "navy blue":
              this.set('changeset.primaryColour', "#004A80");
              this.set('changeset.secondaryColour', "#DFA004");
              this.set('changeset.tertiaryColour', "#EFF4F6");
              this.set('changeset.quaternaryColour', "#666271");
              this.set('changeset.quinaryColour', "#666271");
              break;
          }
        } else {
          switch(colour) {
            case "golden":
              this.set('changeset.primaryColour', "#E5AD23");
              this.set('changeset.secondaryColour', "#411E82");
              this.set('changeset.tertiaryColour', "#BB8B0E");
              this.set('changeset.quaternaryColour', "#FFFFFF");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "ultra violet":
              this.set('changeset.primaryColour', "#502BA3");
              this.set('changeset.secondaryColour', "#3BB7B3");
              this.set('changeset.tertiaryColour', "#411E82");
              this.set('changeset.quaternaryColour', "#FFFFFF");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "red":
              this.set('changeset.primaryColour', "#BE1E2D");
              this.set('changeset.secondaryColour', "#B2A37E");
              this.set('changeset.tertiaryColour', "#93111E");
              this.set('changeset.quaternaryColour', "#FFFFFF");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "forest":
              this.set('changeset.primaryColour', "#7F682E");
              this.set('changeset.secondaryColour', "#509C1F");
              this.set('changeset.tertiaryColour', "#455C36");
              this.set('changeset.quaternaryColour', "#FFFFFF");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "tangerine":
              this.set('changeset.primaryColour', "#E9995A");
              this.set('changeset.secondaryColour', "#411E82");
              this.set('changeset.tertiaryColour', "#DD8A36");
              this.set('changeset.quaternaryColour', "#FFFFFF");
              this.set('changeset.quinaryColour', "#666271");
              break;
            case "navy blue":
              this.set('changeset.primaryColour', "#004A80");
              this.set('changeset.secondaryColour', "#DFA004");
              this.set('changeset.tertiaryColour', "#056DA5");
              this.set('changeset.quaternaryColour', "#FFFFFF");
              this.set('changeset.quinaryColour', "#666271");
              break;
          }
        }

      this.send('loadChanges');
    }
  }
});
