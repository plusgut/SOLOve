// import feed from '../interfaces/feed';

class Api {
  get() {
    return fetch('/api/', { method: 'GET' }).then((response: Response) => {
      return response;
    });
  }
  
  post(category: number, image: string) {
    return fetch('/api/', { method: 'POST', body: JSON.stringify({
      category,
      image,
    })});
  }
}

export default new Api();
