import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  init() {
    this._super(...arguments);
    let histories = this.get('histories')
    this.set('orderedHistories', histories);
  },

  didInsertElement() {
    this._super(...arguments);
    this.set('orderedHistories', this.get('historyDesc'));
  },

  classNames: ['mt-8 transaction-history pb-8 rounded-xl'],
  orderOptions: ['Asc', 'Desc'],
  filterOptions: ['All',' Payment', 'New Gift', 'Cancelled', 'Change'],

  order: 'Desc',
  filter: 'All',
  orderedHistories: [],

  isDescending: computed('order', function() {
    let gift = this.get('order');
    if(gift === 'Desc') {
      return true;
    } else {
      return false;
    }
  }),

  filteredHistories: computed('histories', 'filter', function() {
    let histories = this.get('histories');

    if(this.get('filter') === 'All') {
      return this.get('histories');
    }

    if(this.get('filter') === "New Gift") {
      let filteredHistories = histories.filter(history => {
        return history.get('type') === "recurring" && history.get('status') === "success"
      });
      return filteredHistories;
    }

    if(this.get('filter') === "Cancelled") {
      let filteredHistories = histories.filter(history => {
        return history.get('type') === "recurring" && history.get('status') === "cancellation"
      });
      return filteredHistories;
    }

    if(this.get('filter') === "Change") {
      let filteredHistories = histories.filter(history => {
        return history.get('type') === "recurring" && history.get('status') === "update"
      });
      return filteredHistories;
    }

    let filteredHistories = histories.filter(history => {
      return history.get('type') === "payment" && history.get('status') === "success"
    });
    return filteredHistories;
  }),


  historySortingDesc: Object.freeze(['timestamp:desc']),
  historySortingAsc: Object.freeze(['timestamp:asc']),
  historyAsc: computed.sort('filteredHistories', 'historySortingAsc'),
  historyDesc: computed.sort('filteredHistories', 'historySortingDesc'),


  actions: {
    orderBy(newOption) {
      this.set("order", newOption)
      if(newOption === 'Desc') {
        this.set('orderedHistories', this.get('historyDesc'))
        console.log("am i running?")
      } else {
        this.set('orderedHistories', this.get('historyAsc'))
        console.log("am i running now?!")
      }
    },

    filterBy(filter) {
      this.set('filter', filter);
    },

    filterByClick(filter) {
      if(filter === this.get('filter')) {
        this.set('filter', "All");
      } else {
        this.set('filter', filter);
      }
    }
  }
});
