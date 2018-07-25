import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["flex-1 flex flex-wrap mb-3 text-grey-darker pl-8 bg-grey-lightest py-2"],

  fullName: computed('donor.fname', 'donor.lname', function(){
    let firstname = this.get("donor.fname");
    let lastname = this.get('donor.lname');
    return `${firstname}${lastname}`;
  })
});
