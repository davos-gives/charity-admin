import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('donors', function() {
    this.route('show', {path: '/:donor_id'});
  });
  this.route('campaigns', function() {
    this.route('create');
  });
  this.route('receipts', function() {
    this.route('create');
  });
  this.route('export');
  this.route('tags');
});

export default Router;
