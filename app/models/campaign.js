import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { computed } from '@ember/object';

export default DS.Model.extend(LoadableModel,{
  name: DS.attr(),
  description: DS.attr(),
  goal: DS.attr(),
  hasGoal: DS.attr(),
  showGoal: DS.attr(),
  hasEndDate: DS.attr(),
  goBackUrl: DS.attr(),
  imageUrl: DS.attr(),
  logoUrl: DS.attr(),
  font: DS.attr(),
  endDate: DS.attr(),
  endMonth: DS.attr(),
  endYear: DS.attr(),
  primaryColour: DS.attr(),
  secondaryColour: DS.attr(),
  tertiaryColour: DS.attr(),
  quaternaryColour: DS.attr(),
  quinaryColour: DS.attr(),
  facebook_share: DS.attr(),
  linkedin_share: DS.attr(),
  twitter_share: DS.attr(),
  email_share: DS.attr(),
  payments: DS.hasMany('payments'),
  createdAt: DS.attr(),
  updatedAt: DS.attr(),
  publishDate: DS.attr(),
  templateId: DS.attr(),
  published: DS.attr('boolean', {defaultValue: false}),
});
