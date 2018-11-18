import {
  SingleElement,
  TreeElement,
  ComponentWrapper
} from '../../../Lib/ComponentWrapper';

export default class CardFront extends ComponentWrapper {
  state = {
    elements: new TreeElement('div', {
        className: 'card medium front'
      },
      [
        new TreeElement('div', {
          className: 'card-image'
        }, [
          new SingleElement('img', {
            src: this.props.card.front.image
          }, null),
          new SingleElement('span', {
            className: 'card-title'
          }, this.props.card.front.title)
        ]),
        new TreeElement('div', {
          className: 'card-content'
        }, [
          new SingleElement('span', null, this.props.card.front.description)
        ]),
        new TreeElement('div', {
          className: 'card-action'
        }, [
          new SingleElement('span', null, this.props.card.front.bottomText),
        ])
      ]
    )
  }
}