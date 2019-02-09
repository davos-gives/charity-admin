import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      header: '',
      description: '',
      goal: null,
      logo: null,
      endDate: null,
      goBackUrl: null,
      font: null,
      size: null,
      colour: null
    }
  }
});
