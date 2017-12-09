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

const POLL_TIME = 1000;

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
      <div className="dashboard">
        {/* <div className="total">{this.state.data.all}</div> */}
        {this.state.meToo === false && this.state.feed === false &&
          <span>
            <div className="logo">
              <div>SO</div>
              <div style={{ marginTop: '-15px' }}>LO</div>
              <div style={{ marginTop: '-30px' }}>ve</div>
            </div>
            <div className="hash">#weactsolo</div>
            <button onClick={() => this.setState({ meToo: true })} >Oh, Me Too!</button>
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
