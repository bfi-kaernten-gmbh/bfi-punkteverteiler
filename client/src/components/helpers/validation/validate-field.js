import rules from './rules';
export const createRules = checkRules => {
  let validations = [];

  for (let ruleName in checkRules) {
    let ruleFunc = rules[ruleName];
    if(ruleFunc) {
      validations.push(ruleFunc(checkRules[ruleName]));
    }
  }
  return validations;
}
