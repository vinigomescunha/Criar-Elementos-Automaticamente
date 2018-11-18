import {
  ComponentWrapper,
  SingleElement,
  TreeElement
} from '../Lib/ComponentWrapper';
import CustomCard from '../Domain/CustomCard';
export default class Home extends ComponentWrapper {
  setInjectorInfo(event) {
    // podia ter usado underscore, lodash ...
    var appendObjectValue = (index, object, value) => {
      var indexAsArray = index.split('.');
      var currentDepth = object;
      for (var i = 0; i <= indexAsArray.length; i++) {
        if (i === (indexAsArray.length - 1)) {
          currentDepth[indexAsArray[i]] = value
        } else {
          currentDepth = currentDepth[indexAsArray[i]]
        }
      }
      return object;
    }
    try {
      var indexCardIjector = event.target.getAttribute('card-index');
      var card = this.getInjector(indexCardIjector) ? this.getInjector(indexCardIjector) : new CustomCard();
      this.setInjector(indexCardIjector, appendObjectValue(event.target.getAttribute('card-object'), card, event.target.value));
    } catch (e) {
      console.error('Ocurred and error!', e);
    }
  }
  notSubmit(event) {
    event.preventDefault();
  }
  getCard(index) {
    return this.getInjector(index) || new CustomCard();
  }
  getCardElementFront(index) {
    return new TreeElement('div', {
        className: 'accordion-item'
      },
      [new SingleElement('input', {
          type: 'radio',
          defaultChecked: true,
          name: `accordion-radio${index}`,
          id: `accordion-radio-card${index}-1`,
          className: 'accordion-radio',
        }, null),
        new SingleElement('label', {
          type: 'radio',
          htmlFor: `accordion-radio-card${index}-1`
        }, `CLICK HERE TO OPEN CARD ${index} <FRONT>`),
        new TreeElement('div', {
            className: 'accordion-content'
          },
          [
            new SingleElement('div', null, 'Edit first card....'),
            new SingleElement('span', null, 'Title: '),
            new SingleElement('textarea', {
                "card-index": "card1",
                "card-object": "front.title",
                defaultValue: this.getCard(`card${index}`).front.title,
                onChange: this.setInjectorInfo.bind(this)
              },
              null),
            new SingleElement('span', null, 'Description: '),
            new SingleElement('textarea', {
                cols: 30,
                rows: 5,
                style: {
                  height: 'auto'
                },
                "card-index": `card${index}`,
                "card-object": "front.description",
                defaultValue: this.getCard(`card${index}`).front.description,
                onChange: this.setInjectorInfo.bind(this)
              },
              null),
            new SingleElement('span', null, 'Bottom Txt: '),
            new SingleElement('textarea', {
                "card-index": `card${index}`,
                "card-object": "front.bottomText",
                defaultValue: this.getCard(`card${index}`).front.bottomText,
                onChange: this.setInjectorInfo.bind(this)
              },
              null)
          ])
      ])
  }
  getCardElementBack(index) {
    return new TreeElement('div', {
        className: 'accordion-item'
      },
      [
        new SingleElement('input', {
          type: 'radio',
          id: `accordion-radio-card${index}-2`,
          name: `accordion-radio${index}`,
          className: 'accordion-radio',
        }, null),
        new SingleElement('label', {
          type: 'radio',
          htmlFor: `accordion-radio-card${index}-2`
        }, `CLICK HERE TO OPEN CARD ${index} <BACK>`),
        new TreeElement('div', {
          className: 'accordion-content'
        }, [
          new SingleElement('div', null, 'Back Description: '),
          new SingleElement('textarea', {
              "card-index": `card${index}`,
              "card-object": "back.description",
              defaultValue: this.getCard(`card${index}`).back.description,
              onChange: this.setInjectorInfo.bind(this)
            },
            null),
          new SingleElement('span', null, 'Back Link: '),
          new SingleElement('textarea', {
              "card-index": `card${index}`,
              "card-object": "back.link",
              defaultValue: this.getCard(`card${index}`).back.link,
              onChange: this.setInjectorInfo.bind(this)
            },
            null)
        ])
      ])
  }
  getCardElement(index) {
    return new TreeElement('div', {
      className: 'card-edit'
    }, [
      this.getCardElementFront(index),
      this.getCardElementBack(index)
    ]);
  }

  state = {
    elements: new TreeElement(
      'div', {
        className: 'container'
      }, [
        new TreeElement('div', null, [
          new TreeElement('form', {
            onSubmit: this.notSubmit.bind(this)
          }, [
            this.getCardElement(1),
            this.getCardElement(2)
          ]) 
        ])
      ]
    )
  };
}