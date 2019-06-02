import Component from '@ember/component';

export default Component.extend({
  classNames: ["w-70 rounded-lg bg-grey-ongoing px-4 py-4 mx-4 my-4 inline-block group hover:bg-white hover:shadow-lg flex flex-wrap justify-between items-center"],

  actions: {
    editOngoing(gift) {
      this.editOngoing();
    }
  }
});
