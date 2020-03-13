/*
 * Primary file for the API
 *
 */

// Libraries
const http = require("http"); // hosting the server, currently locally http://localhost:3000; Wonder what this means when you put it on production.
const url = require("url"); // making an API

// The server should respond to all requests with a string, meaning whenever someone visits the website or makes and api call.
const server = http.createServer(function(req, res) {
  // Get the URL and parse it, meaning get the directory of the website after the domain. "Domain: https:www.dogsofthelaw.com" "Directory: /sheep-tag/"
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object, so what is the end of the directory "https:www.hitsujistories.com/sheep-tag?fizz=buzz"
  const queryStringObject = parsedUrl.query;

  // Get the HTTP Method: GET, POST, DELETE, PUT, HEAD, PATCH, OPTIONS
  const method = req.method.toLowerCase();

  // Get the headers as an object, adding keys and values to the request requires postman headers
  const headers = req.headers;

  // Send the response
  res.end("Hello World\n");

  // Log the request path
  console.log("request received with these headers", headers);
});

// Start the server, and have it listen on port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000.");
});
// EOF
