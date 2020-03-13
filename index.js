/*
 * Primary file for the API
 *
 */

// Libraries
const http = require("http"); // hosting the server, currently locally http://localhost:3000; Wonder what this means when you put it on production.
const https = require("https");
const url = require("url"); // making an API
const StringDecoder = require("string_decoder").StringDecoder; // allows payloads to be read through a stream bit by bit
const config = require("./config"); // production or staging environments based on NODE_ENV command line argument
const fs = require("fs"); // used to read the cert and key values for the https server

// Instantiate the HTTP server
const httpServer = http.createServer(function(req, res) {
  unifiedServer(req, res);
});

// Start the server
httpServer.listen(config.httpPort, function() {
  console.log("The server is listening on port " + config.httpPort);
});

// Instantiate the HTTPS server
const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem")
};
const httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  unifiedServer(req, res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function() {
  console.log("The server is listening on port " + config.httpsPort);
});

// All the server logic for both the https and http servers
const unifiedServer = function(req, res) {
  // Get the URL and parse it, meaning get the directory of the website after the domain. "Domain: https:www.hitsujistories.com" "Directory: /sheep-tag/"
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, ""); // Regex for getting rid of extra characters in the directory of URL

  // Get the query string as an object, so what is the end of the directory "https:www.hitsujistories.com/sheep-tag?fizz=buzz"
  const queryStringObject = parsedUrl.query;

  // Get the HTTP Method: GET, POST, DELETE, PUT, HEAD, PATCH, OPTIONS
  const method = req.method.toLowerCase();

  // Get the headers as an object, adding keys and values to the request requires postman headers
  const headers = req.headers;

  /* Overview of the decoder and buffer:
   * The buffer is a place holder for a string, as the request comes in the buffer streams
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

    // Choose the handler this request should go to. If one is not found, use the notFound handler.
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };

    // Route the request to the handler specified in the router.
    chosenHandler(data, function(statusCode, payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof payload == "object" ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
};

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
  // Callback an http status code, and a payload object
  callback(406, { name: "sample handler" });
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

// Define a request router
const router = {
  sample: handlers.sample
};
