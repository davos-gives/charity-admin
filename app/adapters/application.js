import DS from 'ember-data';
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default DS.JSONAPIAdapter.extend({
  namespace: "api/admin",
  host: 'http://app.davos.gives',
})
