import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';


export default DS.Model.extend(LoadableModel,{
  fname: DS.attr(),
  lname: DS.attr(),
  email: DS.attr(),
  password: DS.attr(),
  passwordConfirmation: DS.attr(),
  organization: DS.belongsTo('organization'),
});
