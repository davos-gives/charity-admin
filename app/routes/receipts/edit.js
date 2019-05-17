import Route from '@ember/routing/route';

export default Route.extend({
  model: function(params) {
    return this.get('store').loadRecord('receipt-template', params.receipt_template_id);
  }
});
