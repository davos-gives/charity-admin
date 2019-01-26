import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      name: '',
      description: '',
      goal: null,
      endDate: null,
      goBackUrl: null,
      font: null,
      size: null,
      colour: null
    }
  }
});
