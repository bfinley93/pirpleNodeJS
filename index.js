// Libraries
const http = require('http'); // hosting the server, currently locally http://localhost:3000; Wonder what this means when you put it on production. 
const url  = require('url'); // making an API

// The server should respond to all requests with a string, meaning whenever someone visits the website or makes and api call.
const server = http.createServer(function(req, res){

    // Get the URL and parse it, meaning get the directory of the website after the domain. "Domain: https:www.hitsujistories.com" "Directory: /sheep-tag/"
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the HTTP Method: GET, POST, DELETE, PUT, HEAD, PATCH, OPTIONS
    const method = req.method.toLowerCase();

    // Send the response
    res.end('Hello World\n');

    // Log the request path
    console.log('Request received on path: '+trimmedPath+ ' with method: '+method);
});

// Start the server, and have it listen on port 3000
server.listen(3000, function(){
    console.log('The server is listening on port 3000.');
});
// EOF