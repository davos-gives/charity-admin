import Controller from "@ember/controller";
import { computed } from '@ember/object';


export default Controller.extend({
  queryParams: ['search'],
  search: "",

  donorsIdDesc: Object.freeze(['id:desc']),
  donorsIdAsc: Object.freeze(['id:asc']),

  donorsByIdDesc: computed.sort('model', 'donorsIdDesc'),
  donorsByIdAsc: computed.sort('model', 'donorsIdAsc'),
});
