export default class ComponentBuilder {
  creationCallback;
  setCreationCallback(creationCallback) {
    this.creationCallback = creationCallback;
    return this;
  }
  /**
   * Cria e Retorna elementos html
   * @return html(jsx)
   */
  buildElement(c, key, index) {
    if (!c) {
      c = {};
    }
    if (!c.props) {
      c.props = {};
    }
    c.props.key = `${key}-${c.type}_${index}`;
    switch (c.constructor.name) {
      case 'ReactElement':
        c.props.key = `${key}-children_${index}`;
        return this.creationCallback(c.component, c.props, this.buildSubElements(c.children, c.props.key));
      case 'SingleElement':
      case 'TreeElement':
        return this.creationCallback(c.type, c.props, this.buildSubElements(c.children, c.props.key));
      default:
        return null;
    }
  }
  /**
   * Retorna elementos html(jsx) a partir de uma lista de elementos
   * @return void
   */
  buildSubElements(children, key) {
    if (Array.isArray(children)) {
      var elements = [];
      // eslint-disable-next-line array-callback-return
      children.map((c, index) => {
        elements.push(this.buildElement(c, key, index));
      })
      return elements;
    } else {
      return children;
    }
  }
}