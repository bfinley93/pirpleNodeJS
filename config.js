/*
 * Create and export configuration variables
 * How to run in Windows CMD:
 * set NODE_ENV=production
 * node index.js
 */

// Container for all the environments
const environments = {};

// Staging (default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging"
};

// Production environment
environments.production = {
  httpPort: 3002,
  httpsPort: 3003,
  envName: "production"
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check that the current environment is one of the environments above, if not, default to staging
const environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

// Export the module
module.exports = environmentToExport;
