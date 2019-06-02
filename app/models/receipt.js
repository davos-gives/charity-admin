import DS from 'ember-data';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';


export default DS.Model.extend(LoadableModel,{
  url: DS.attr(),
  fname: DS.attr(),
  lname: DS.attr(),
  insertedAt: DS.attr(),
  paymentAmount: DS.attr(),
  receiptNumber: DS.attr(),
  payment: DS.belongsTo("payment"),
});
