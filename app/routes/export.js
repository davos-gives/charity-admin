import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    modelType: {
      refreshModel: true
    },
    duration: {
      refreshModel: true
    },
    campaign: {
      refreshModel: true
    }

  },

  model({ modelType, duration, campaign }) {
    if(modelType == "payments") {

      if(campaign) {
        return this.store.query('payment', {
          filter: { range: duration, campaign: campaign }
        })
      } else {
        return this.store.query('payment', {
          filter: { range: duration }
        })
      }
    } else {
      if(campaign) {
        return this.store.query('donor', {
          filter: { range: duration, campaign: campaign }
        })
      } else {
        return this.store.query('donor', {
          filter: { range: duration }
        })
      }
    }
  }
});
