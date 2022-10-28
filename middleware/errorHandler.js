const { logEvents } = require("./logger");

/**
 * Uses the function logEvents and passes in the message to log and the file to log to.
 * Response with the status code, the error message and sets isError to true.
 *
 * Will overwrite the express error handling.
 */
const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  // will check if status code already set or else set 500(server error)
  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message, isError: true });
};

module.exports = errorHandler;
