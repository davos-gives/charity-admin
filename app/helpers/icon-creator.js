import { helper } from '@ember/component/helper';

export function iconCreator(params/*, hash*/) {

  let name = params.map((n)=>n[0])
  return name;
}

export default helper(iconCreator);
