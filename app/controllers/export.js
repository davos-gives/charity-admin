import Controller from "@ember/controller";
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import fetch from 'fetch';
import { getOwner } from "@ember/application";

export default Controller.extend(FileSaverMixin, {

  store: service('store'),
  currentUser: service('current-user'),

  queryParams: ['modelType', 'duration', 'campaign'],
  search: "",
  duration: "this month",
  filteredCampaign: "",

  exportTypeOptions: ["donors", "payments"],
  timeRangeOptions: ["today", "this week", "this month", "this year"],
  campaignOptions: computed('model', function() {
    return this.get('store').findAll('campaign');
  }),

  selectedModels: computed('model.@each.selected', function() {
    var model = this.get('model')
    return model.filterBy('selected', true)
  }),

  selectedIds: computed('selectedModels', function() {
    return this.get('selectedModels').mapBy('id').join();
  }),



  modelType: "donors",
  filteredCampaign: "",
  selectAll: false,

  donorsIdDesc: Object.freeze(['id:createdAt']),
  donorsIdAsc: Object.freeze(['id:createdAt']),

  donorsByIdDesc: computed.sort('model', 'donorsIdDesc'),
  donorsByIdAsc: computed.sort('model', 'donorsIdAsc'),

  paymentsByDesc: computed.sort('model', 'donorsIdDesc'),

  showPayments: computed('modelType', function() {
    return this.get('modelType') == 'payments';
  }),

  actions: {
    updateModelType(modelType) {
      this.send('deselectAll');
      this.set('selectAll', false);

      this.set('modelType', modelType);
    },

    updateDurationType(duration) {
      this.set('duration', duration);
    },

    updateCampaign(campaign) {
      this.set('campaign', campaign.id)
      this.set('filteredCampaign', campaign)
    },

    toggleSelect(model) {
      let newState = !model.get('selected')
      set(model, 'selected', newState);
    },

    toggleSelectAll() {
      var toggledState = !this.get('selectAll');

      this.set('selectAll', toggledState)
      this.model.setEach("selected", toggledState);
    },

    deselectAll() {
      this.model.setEach('selected', false)
    },

    requestExport() {
      this.requestReport()
        .then((content) => {
          this.saveFileAs(`${this.modelType}-${Date.now()}`, content._bodyBlob, "text/csv");
        })
    },

    logout(ev) {
      ev.preventDefault();
      this.get('session').invalidate();
    }
  },

  async requestReport() {
    const adapter = getOwner(this).lookup('adapter:application');

    if(this.selectedIds == "") {
      var request = `https://app.davos.gives/export?modelType=${this.modelType}`
    } else {
      var request = `https://app.davos.gives/export?modelType=${this.modelType}&id=${this.selectedIds}`
    }
    let headers = { 'content-type': 'application/vnd.api+json'};
    return await(await fetch(request, {method: "GET", headers}))

  }
});
