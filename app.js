const http = require('http');

http.createServer(function (req, res) {
  res.write('Just random text');
  res.end();
}).listen(3000);

console.log("Server strated");
