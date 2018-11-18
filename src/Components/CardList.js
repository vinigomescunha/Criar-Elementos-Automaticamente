import {
  ReactElement,
  TreeElement,
  ComponentWrapper
} from '../Lib/ComponentWrapper';
import CustomCard from '../Domain/CustomCard';
import Card from './Card/Card';

export default class CardList extends ComponentWrapper {
  constructor() {
    super();
    this.createState();
  }
  createState() {
    this.state = {
      elements: new TreeElement('div', {
          className: 'container'
        },
        [
          new TreeElement('div', {
            className: 'row cardlist-relative'
          }, [
            new ReactElement(null, {
              id: 'first',
              key: '1st-card',
              "card-index": "card1",
              card: this.getInjector('card1') || new CustomCard(),
            }, []).setComponent(Card),
            new ReactElement(null, {
              id: 'second',
              key: '2st-card',
              "card-index": "card2",
              card: this.getInjector('card2') || new CustomCard(),
            }, []).setComponent(Card)
          ])
        ])
    }
  }
}