import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin,{
  model() {
    return {
      header: '',
      description: '',
      signatureFooter: null,
      signatureUrl: null,
      logoUrl: null,
      font: null,
      primaryColour: null,
      secondaryColour: null,
      tertiaryColour: null,
      quaternaryColour: null,
      quinaryColour: null,
      stackStartingNumber: null,
      craLink: '',
      dateFormat: '',
    }
  }
});
