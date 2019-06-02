import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,{
  model: function(params) {
    return this.get('store').loadRecord('campaign', params.campaign_id);
  }
});
