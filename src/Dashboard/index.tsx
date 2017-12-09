import * as React from 'react';

import Camera from './Camera';
import Feed from './Feed';
import feed from '../interfaces/feed';
import api from '../api';

type props = {};

type state = {
  meToo: boolean;
  feed: boolean;
  data: feed;
};

const POLL_TIME = 400;

export default class Dashboard extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      meToo: false,
      feed: false,
      data: {
        all: 0,
        categories: [],
      },
    };

    this.getFeed();
  }

  getFeed() {
    api.get().then((data: feed) => {
      this.setState({ data });
    });

    setTimeout(this.getFeed.bind(this), POLL_TIME);
  }

  render() {
    return (
      <div className="Dashboard">
        {this.state.data.all}
        {this.state.meToo === false && this.state.feed === false &&
          <span>
            <button onClick={() => this.setState({ meToo: true })} >Me Too!</button>
            <button onClick={() => this.setState({ feed: true })} >Tell me about it</button>
          </span>
        }

        {this.state.meToo &&
          <Camera feed={this.state.data} />
        }

        {this.state.feed &&
          <Feed feed={this.state.data} />
        }
      </div>
    );
  }
}
