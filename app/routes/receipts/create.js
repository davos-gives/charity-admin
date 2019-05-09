import Route from '@ember/routing/route';

export default Route.extend({
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
