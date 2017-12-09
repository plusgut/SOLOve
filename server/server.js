const http = require('http');
const data = require('./boot/data');

const PORT = 8000;

http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.write(JSON.stringify(data));
  } else if (request.method === 'POST') {
    console.log(request.data);
    const categoryIndex = 0; // @TODO check where in the data it is
    data.categories[categoryIndex].unshift({
      image,
      id: data.categories[categoryIndex].length,
    });
  }
}).listen(PORT);
