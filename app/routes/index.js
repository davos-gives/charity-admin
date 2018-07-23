import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      donations: this.store.findAll('donation'),
      donors: this.store.findAll('donor', {
        include: 'donations'
      }),
      campaigns: this.store.findAll('campaign', {
        include: 'donations'
      })
    });
  }
});
