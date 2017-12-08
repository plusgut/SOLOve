import * as React from 'react';

import Camera from './Camera';
import Feed from './Feed';

type props = {};

type state = {
  meToo: boolean;
  feed: boolean;
};

export default class Dashboard extends React.Component<props, state> {
  constructor(props: props) {
    super(props);

    this.state = {
      meToo: false,
      feed: false,
    };
  }
  render() {
    return (
      <div className="Dashboard">
        {this.state.meToo === false && this.state.feed === false &&
          <span>
            <button onClick={() => this.setState({ meToo: true })} >Me Too!</button>
            <button onClick={() => this.setState({ feed: true })} >Tell me about it</button>
          </span>
        }

        {this.state.meToo &&
          <Camera />
        }

        {this.state.feed &&
          <Feed />
        }
      </div>
    );
  }
}
