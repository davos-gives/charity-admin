import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    search: {
      refreshModel: true
    },
  },

  model({ search }) {
    if(search) {
      return this.store.query('receipt', {
        filter: { query: search }
      });
    }

    return this.store.findAll('receipt');
  }
});
