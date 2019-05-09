import { helper } from '@ember/component/helper';

export function iconCreator(params/*, hash*/) {
  if(params[0] !== null) {
    let name = params.map((n)=>n[0])
    return name;
  } else {
    return "";
  }


}

export default helper(iconCreator);
