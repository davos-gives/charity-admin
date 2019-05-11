import Component from '@ember/component';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import RSVP from 'rsvp';

export default Component.extend({

  store: Ember.inject.service(),

  actions: {

    uploadImage(file) {
      let logo = this.get('store').createRecord('logo', {});
      RSVP.cast(Ember.$.post('/api/public/upload-signature', {filename: `logos/${file.blob.name}`, mimetype: file.blob.type}))
        .then(function (response) {
          return file.upload(response.action, {
            data: response
          })
        .then(function (response) {
          logo.set('url', `https://davos-assets.sfo2.cdn.digitaloceanspaces.com/logos/${file.blob.name}`);
          logo.save();
        })
      })
    }
  }
});
