export default class ComponentValidator {
  isEmpty(value) {
    return !value ? true : false;
  }
  errorEmpty(component) {
    console.error(`Without elements in ${component}!`);
    return ' ';
  }
}