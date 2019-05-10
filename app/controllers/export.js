import Controller from "@ember/controller";
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';


export default Controller.extend({

  store: service('store'),

  queryParams: ['modelType', 'duration', 'campaign'],
  search: "",
  duration: "this month",
  filteredCampaign: "",

  exportTypeOptions: ["donors", "payments"],
  timeRangeOptions: ["today", "this week", "this month", "this year"],
  campaignOptions: computed('model', function() {
    return this.get('store').findAll('campaign');
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
    }
  }
});
