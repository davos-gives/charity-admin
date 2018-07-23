import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  init() {
    this._super(...arguments);
    let histories = this.get('histories')
    this.set('orderedHistories', histories);
    this.set('filteredHistories', histories)
  },

  classNames: ['mt-8 transaction-history'],
  orderOptions: ['Asc', 'Desc'],
  filterOptions: ['All',' Payment', 'New Gift', 'Cancelled', 'Change'],

  order: 'Desc',
  filter: 'All',
  orderedHistories: [],
  filteredHistories: [],


  historySortingDesc: Object.freeze(['timestamp:desc']),
  historySortingAsc: Object.freeze(['timestamp:asc']),
  historyAsc: computed.sort('filteredHistories', 'historySortingAsc'),
  historyDesc: computed.sort('filteredHistories', 'historySortingDesc'),


  actions: {
    orderBy(newOption) {
      this.set("order", newOption)
      if(newOption == 'Desc') {
        this.set('orderedHistories', this.get('historyDesc'))
      } else {
        this.set('orderedHistories', this.get('historyAsc'))
      }
    },

    filterHistories(filter) {
      this.set('filter', filter);
      let histories = this.get('histories');

      if(this.get('filter') == "All") {
        this.set('filteredHistories', histories);
      } else {
        this.set('filteredHistories', histories);
      }
    }
  }
});
