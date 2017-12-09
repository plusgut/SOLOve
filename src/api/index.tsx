import feed from '../interfaces/feed';
import feedItem from '../interfaces/feedItem';

class Api {
  get(): Promise<feed> {
    return fetch('/api/', { method: 'GET' }).then((response: Response) => response.json());
  }
  
  post(category: number, feedItem: feedItem) {
    return fetch('/api/', { method: 'POST', body: JSON.stringify({
      category,
      feedItem,
    })});
  }
}

export default new Api();
