import {
  SingleElement,
  TreeElement,
  ComponentWrapper
} from '../../../Lib/ComponentWrapper';

export default class CardBack extends ComponentWrapper {
  state = {
    elements: new TreeElement('div', {
        className: 'card card-panel teal back'
      },
      [
        new TreeElement('div', {
          className: 'card-content'
        }, [
          new SingleElement('span', null, this.props.card.back.description)
        ]),
        new TreeElement('div', {
          className: 'card-action'
        }, [
          new SingleElement('a', {
            href: this.props.card.back.link
          }, this.props.card.back.link),
        ])
      ]
    )
  }
}