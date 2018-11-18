export default class ComponentInjector {
  static injector = {};
  set(index, value){
    ComponentInjector.injector[index] = value;
  }
  get(index) {
    return ComponentInjector.injector[index];
  }
}