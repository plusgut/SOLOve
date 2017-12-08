import * as React from 'react';

type props = {};
type state = {
  stream?: string,
};

export default class Feed extends React.Component<props, state> {
  render() {
    return <span>Feed</span>;
  }
}
