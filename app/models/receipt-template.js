import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';


export default DS.Model.extend(LoadableModel,{
  logo: DS.attr(),
  header: DS.attr(),
  description: DS.attr(),
  signature: DS.attr(),
  font: DS.attr(),
  primaryColour: DS.attr(),
  secondaryColour: DS.attr(),
  tertiaryColour: DS.attr(),
  quaternaryColour: DS.attr(),
  quinaryColour: DS.attr(),
});
