import DS from 'ember-data';
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from '../config/environment';

import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  namespace: "api/admin",
  host: ENV.APP.host,

  urlForQueryRecord(query) {
      if (query.me) {
        delete query.me;

        return `${this._super(...arguments)}/me`;
      }
      return this._super(...arguments);
    }
});
