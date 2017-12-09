import feedItem from './feedItem';

export default interface feed {
  title: string;
  image: string;
  ad: string;
  feed: feedItem[];
}
