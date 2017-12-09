import feed from '../interfaces/feed';

class Api {
  get(): Promise<feed> {
    return fetch('/api/', { method: 'GET' }).then((response: Response) => response.json());
  }
  
  post(category: number, image: string) {
    return fetch('/api/', { method: 'POST', body: JSON.stringify({
      category,
      image,
    })});
  }
}

export default new Api();
