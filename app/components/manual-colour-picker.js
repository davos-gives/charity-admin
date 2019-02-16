import Component from '@ember/component';

export default Component.extend({
  isOpen: true,

  init() {
    this._super(...arguments);

    this.components = {
      opacity: false,
      hue: true,

      interaction: {
        hex: false,
        rgba: false,
        hsva: false,
        input: true,
        clear: false,
      }
    };
  },

  actions: {
    toggleMenu() {
      this.set('isOpen', !this.get('isOpen'));
    },
    updateColour(colour, set) {
      this.onChange(colour, set);
    }
  }
});
