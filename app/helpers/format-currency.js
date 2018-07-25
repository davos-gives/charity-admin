import { helper } from '@ember/component/helper';

export function formatCurrency([value, ...rest]) {
  let dollars = Math.floor(value / 100);
  let cents = Math.floor(value % 100);
  let sign = '$';
  let opening = '<span>';
  let closing = '</span>';


  if (cents.toString().length === 1) { cents = '0' + cents; }
  return Ember.String.htmlSafe(`${sign}${dollars}.<span class="text-sm">${cents}</span>`);
}

export default helper(formatCurrency);
