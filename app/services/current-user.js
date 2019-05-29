import Service, {inject as service} from "@ember/service";

export default Service.extend({
  store: service('store'),
  session: service('session'),

  load() {
    return this.get('store').queryRecord('user', {me: true})
      .then((user) => {
        this.set('user', user);
      })
  }
})
