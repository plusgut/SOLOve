const http = require('http');
const data = require('./boot/data');

const PORT = 8000;
const START_VALUE = 1000000;

http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.end(JSON.stringify(data));
  } else if (request.method === 'POST') {
    console.log(data.categories[0]);

    var body = '';
    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
      const post = JSON.parse(body);
      data.categories[post.category].feed.unshift({
        image: post.image,
        id: data.categories[post.category].feed.length,
      });

      data.all = data.categories.reduce((previousValue, category) => previousValue + category.feed.length, START_VALUE);

      console.log(data.all);
    });

  }
}).listen(PORT);
