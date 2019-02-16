import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      name: '',
      description: '',
      goal: null,
      endDate: null,
      goBackUrl: null,
      imageUrl: null,
      font: null,
      size: null,
      primaryColour: null,
      secondaryColour: null,
      tertiaryColour: null,
      quaternaryColour: null,
      quinaryColour: null,
    }
  }
});
