const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

/**
 *  Use to limit repeated requests to public APIs and/or endpoints such as password reset
 */
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute; Time frame for which requests are checked/remembered
  max: 5, // Limit each IP to 5 login requests per `window` per minute; The maximum number of connections to allow during the window before rate limiting the client
  message: {
    //The response body to send back when a client is rate limited
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  //Express request handler that sends back a response when a client is rate-limited
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginLimiter;
