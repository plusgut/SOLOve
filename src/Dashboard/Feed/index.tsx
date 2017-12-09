import * as React from 'react';

import feed from '../../interfaces/feed';
import feedItem from '../../interfaces/feedItem';
import category from '../../interfaces/category';

type props = { 
  feed: feed;
};

type state = {};

const CATEGORY_WIDTH = 300;
const FEED_WIDTH = 200;
const FEED_HEIGHT = 150;
const DEFAULT_CATEGORY = 4;

export default class Feed extends React.Component<props, state> {
  render() {
    return <span className="feed">
      {this.props.feed.categories.filter((category: category, index: number) => index === DEFAULT_CATEGORY).map((category: category, index: number) =>
        <div key={index}>
          <img width={CATEGORY_WIDTH} src={category.image} />
          <div>{category.title} people: {category.feed.length + 10000}</div>
          <div style={{ overflow: 'hidden', height: FEED_HEIGHT, width: FEED_WIDTH * 5 }}>
            {category.feed.map((feed: feedItem) => 
              <img width={FEED_WIDTH} height={FEED_HEIGHT} key={feed.id} src={feed.image} className="feed-image"/>,
            )}
          </div>
        </div>,
      )}
    </span>;
  }
}
