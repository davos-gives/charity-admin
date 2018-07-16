import { helper } from '@ember/component/helper';

export function convertFrequency(params/*, hash*/) {
  console.log(params)
  if(params[0] === 'recurring') {
    return 'monthly'
  } else {
    return params;
  }
}

export default helper(convertFrequency);
