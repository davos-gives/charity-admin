import Component from '@ember/component';
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import RSVP from 'rsvp';

export default Component.extend({

  store: Ember.inject.service(),

  actions: {

    uploadImage(file) {
      let photo = this.get('store').createRecord('photo', {});
      RSVP.cast(Ember.$.post('https://app.davos.gives/api/public/upload-signature', {filename: `featured-images/${file.blob.name}`, mimetype: file.blob.type}))
        .then(function (response) {
          return file.upload(response.action, {
            data: response
          })
        .then(function (response) {
          photo.set('url', `https://davos-assets.sfo2.cdn.digitaloceanspaces.com/featured-images/${file.blob.name}`);
          photo.save();
        })
      })
    }
  }
});
