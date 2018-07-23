import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['mt-8'],

  historySortingDesc: Object.freeze(['timestamp:desc']),
  history: computed.sort('histories', 'historySortingDesc'),
});
