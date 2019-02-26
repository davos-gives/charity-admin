import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      name: '',
      description: '',
      goal: null,
      hasEndDate: null,
      goBackUrl: null,
      imageUrl: null,
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
  }
});
