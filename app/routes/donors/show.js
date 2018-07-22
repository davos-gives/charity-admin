import Route from '@ember/routing/route';

export default Route.extend({
    model: function(params) {
      return this.get('store').loadRecord('donor', params.donor_id, {
        include: 'donations, recurrings, histories'
      });
    }
});
