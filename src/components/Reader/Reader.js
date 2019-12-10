import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Controls from './Controls/Controls';
import Counter from './Counter/Counter';
import Publication from './Publication/Publication';

export default class Reader extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
      }),
    ).isRequired,
  };

  componentDidMount() {
    const { location, history, items } = this.props;
    const item = new URLSearchParams(location.search).get('item');

    if (!item || +item > items.length) {
      history.replace({
        pathname: '/',
        search: `item=1`,
      });
    }
  }

  onIncrement = () => {
    const { location, history } = this.props;
    const item = Number(new URLSearchParams(location.search).get('item'));
    history.replace({
      pathname: location.pathname,
      search: `item=${item + 1}`,
    });
  };

  onDecrement = () => {
    const { location, history } = this.props;
    const item = Number(new URLSearchParams(location.search).get('item'));
    history.replace({
      pathname: location.pathname,
      search: `item=${item - 1}`,
    });
  };

  render() {
    const { items, location } = this.props;
    const i = Number(new URLSearchParams(location.search).get('item'));
    const item = (i && i <= items.length) || 1;
    const count = item - 1;
    const max = items.length;
    const notActiveNext = count === items.length - 1;
    const notActivePrev = count === 0;

    return (
      <div className="s.reader">
        <Controls
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}
          notActiveNext={notActiveNext}
          notActivePrev={notActivePrev}
        />
        <Counter count={count + 1} max={max} />
        <Publication
          count={count + 1}
          title={items[count].title}
          text={items[count].text}
        />
      </div>
    );
  }
}
