import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('donors', function() {
    this.route('show', {path: '/:donor_id'}, function(){
      this.route('edit-payment', {path: '/edit-payment/:id'})
    });
  });
  this.route('campaigns', function() {
    this.route('create');
    this.route('edit', {path: '/:campaign_id/edit'});
  });
  this.route('receipts', function() {
    this.route('create');
    this.route('search');
    this.route('edit', {path: '/:receipt_template_id/edit'});

  });
  this.route('export');
  this.route('tags');
});

export default Router;
