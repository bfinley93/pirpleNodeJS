/*
 * Primary file for the API
 *
 */

// Libraries
const http = require("http"); // hosting the server, currently locally http://localhost:3000; Wonder what this means when you put it on production.
const url = require("url"); // making an API
const StringDecoder = require("string_decoder").StringDecoder; // allows payloads to be read through a stream bit by bit

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

  /* Overview of the decoder and buffer:
   * Created a decoder that we are using later on, the buffer is a place holder for a string, as the request comes in the buffer streams
   * in data and adds it to the buffer, the request object is going to emit a data event that we are binding on, so the req.on data then
   * we use the decoder utf-8 to turn it into a string. Then we end the decoder, send the response, and log out the payload.
   */
  // Get the payload, if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();

    // Send the response
    res.end("Hello World\n");

    // Log the request path
    console.log("Request received with this payload: ", buffer);
  });
});

// Start the server, and have it listen on port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000.");
});
// EOF
