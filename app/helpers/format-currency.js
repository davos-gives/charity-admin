import { helper } from '@ember/component/helper';

export function formatCurrency([value, ...rest]) {
  let dollars = Math.floor(value / 100);
  let cents = Math.floor(value % 100);
  let sign = '$';

  if (cents.toString().length === 1) { cents = '0' + cents; }
  return `${sign}${dollars}.${cents}`;
}

export default helper(formatCurrency);
