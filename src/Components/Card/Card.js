import {
  TreeElement,
  ReactElement,
  ComponentWrapper
} from '../../Lib/ComponentWrapper';
import CardBack from './Fragments/CardBack';
import CardFront from './Fragments/CardFront';

export default class Card extends ComponentWrapper {
  getId() {
    return this.props.id;
  }
  state = {
    elements: new TreeElement('div', {
        className: 'col s12 m8 offset-m1 xl7'
      },
      [
        new TreeElement('div', {
          className: `row flip-container ${this.getId()}`
        }, [
          new TreeElement('div', {
            className: 'col s12 flipper'
          }, [
            new ReactElement(null, this.props, null).setComponent(CardFront),
            new ReactElement(null, this.props, null).setComponent(CardBack)
          ])
        ])
      ])
  };
}