import {
  ComponentWrapper,
  ReactElement,
  SingleElement,
  TreeElement
} from '../Lib/ComponentWrapper';
import ComponentRoutes from '../Lib/ComponentRoutes';
import '../styles/vendor/materialize.css';
import '../styles/cards.css';

export default class Main extends ComponentWrapper {
  constructor() {
    super();
    this.createState();
  }
  getLinks() {
    var links = [];
    var routes = ComponentRoutes.getAllUrls();
    for (var i in routes) {
      links.push(
        new TreeElement('li', {}, [
          new SingleElement('a', {
            href: `/#${i}`
          }, i.toUpperCase())
        ])
      );
    }
    return links;
  }
  createState() {
    this.state = {
      elements: new TreeElement('div', null, [
        new SingleElement('h3', { className: 'custom-header-title'}, 'Cards!!!'),
        new TreeElement('ul', {
          className: 'menu'
        }, this.getLinks()),
        new ReactElement(null, null, null).setComponent(ComponentRoutes.getRouteComponent())
      ])
    };
  }
  componentDidMount() {
    ComponentRoutes.registerHashState(() => {
      this.createState();
      this.updateWrapperElements();
    });
  }
}
