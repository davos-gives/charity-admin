import { helper } from '@ember/component/helper';

export function htmlSafeFont(params/*, hash*/) {
  return Ember.String.htmlSafe("font-family:" + params);
}

export default helper(htmlSafeFont);
