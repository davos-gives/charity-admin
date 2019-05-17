import Route from '@ember/routing/route';

export default Route.extend({
    model: function(params) {
      return this.get('store').loadRecord('ongoing-donation', params.id, {
        include: 'donor'
      });
    }
});
