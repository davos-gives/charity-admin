import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,{
  model() {
    return {
      name: '',
      description: '',
      goal: null,
      hasEndDate: null,
      goBackUrl: null,
      imageUrl: null,
      logoUrl: null,
      font: null,
      size: null,
      endDate: null,
      endMonth: null,
      endYear: null,
      primaryColour: null,
      secondaryColour: null,
      tertiaryColour: null,
      quaternaryColour: null,
      quinaryColour: null,
      facebook_share: null,
      linkedin_share: null,
      twitter_share: null,
      email_share: null,
      template: 1,
    }
  },

});
