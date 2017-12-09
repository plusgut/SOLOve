import * as React from 'react';

import feed from '../../interfaces/feed';
import feedItem from '../../interfaces/feedItem';
import category from '../../interfaces/category';

type props = { 
  feed: feed;
};

type state = {};

const FEED_SIZE = 200;

export default class Feed extends React.Component<props, state> {
  render() {
    return <span>
      {this.props.feed.categories.map((category: category, index: number) =>
        <span key={index}>{category.title}
          {category.feed.map((feed: feedItem) => 
            <img width={FEED_SIZE} key={feed.id} src={feed.image} />,
          )}
        </span>,
      )}
    </span>;
  }
}
