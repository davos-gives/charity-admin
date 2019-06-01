import Component from '@ember/component';

import { computed } from '@ember/object';

export default Component.extend({
  toggleButton: false,

  facebookLink: computed('campaign', function() {
    return `https://localhost:4000/campaigns/${this.get('campaign').id}?utm_source=facebook&utm_medium=social&utm_campaign=${this.get('campaign').name.dasherize()}`
  }),

  twitterLink: computed('campaign', function() {
    return `https://localhost:4000/campaigns/${this.get('campaign').id}?utm_source=twitter&utm_medium=social&utm_campaign=${this.get('campaign').name.dasherize()}`
  }),

  linkedinLink: computed('campaign', function() {
    return `https://localhost:4000/campaigns/${this.get('campaign').id}?utm_source=linkedin&utm_medium=social&utm_campaign=${this.get('campaign').name.dasherize()}`
  }),

  emailLink: computed('campaign', function() {
    return `https://localhost:4000/campaigns/${this.get('campaign').id}?utm_source=outboundEmail&utm_medium=email&utm_campaign=${this.get('campaign').name.dasherize()}`
  }),
});
