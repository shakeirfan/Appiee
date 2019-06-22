var http = require('http');
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    console.log('Express server listening on port ' + port)
}).listen(port);
