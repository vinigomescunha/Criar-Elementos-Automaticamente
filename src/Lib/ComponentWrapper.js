import React from 'react';
import ComponentValidator from './ComponentValidator';
import ComponentBuilder from './ComponentBuilder';
import ComponentInjector from './ComponentInjector';

export class ComponentWrapper extends React.Component {

  state = Object.assign({}, this.state, {
    wrapperElements: null,
    elements: null
  });
  validator = new ComponentValidator();
  builder = new ComponentBuilder()
    .setCreationCallback((type, props, children) => {
      return React.createElement(type, props, children);
    });
  injector = new ComponentInjector();
  /**
   * Insere dados em um atributo comum a todos os componentes que herdam ComponentWrapper
   * @return void
   */
  setInjector(index, value) {
    this.injector.set(index, value);
  }
  /**
   * obtem dados em comum a todos os componentes que herdam ComponentWrapper
   * @return void
   */
  getInjector(index) {
    return this.injector.get(index);
  }
   /**
   * Atualiza os elementos a partir de uma lista de elementos
   * @return void
   */
  updateWrapperElements() {
    this.setState({
      elements: this.state.elements
    });
  }
  constructor(props) {
    super(props);
    console.info(`Loading: ${this.constructor.name}`);
  }
  componentDidMount() {
    if (this.validator.isEmpty(this.state.elements)) {
      this.validator.errorEmpty(this.constructor.name);
    }
  }

  render() {
    return (this.builder.buildElement(this.state.elements, 'root', 0));
  }
}

class Element {
  type = '';
  props = {};
  children;
  constructor(type, props, children) {
    this.type = type;
    this.props = props ? Object.assign({}, this.props, props) : {};
    this.children = children;
    this.validate();
  }
  validate() {}
}
export class ReactElement extends Element {
  // caso o ReactElement tenha 'children' e for componente @see createElement from React.Component
  component = null;
  setComponent(value) {
    this.component = value;
    return this;
  }
}
export class SingleElement extends Element {
  validate() {
    if (Array.isArray(this.children)) {
      throw new Error('Single Elements children is String, not array');
    }
  }
}
export class TreeElement extends Element {
  validate() {
    if (!Array.isArray(this.children)) {
      throw new Error('Tree Elements children is array of elements');
    }
  }
}