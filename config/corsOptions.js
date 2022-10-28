const allowedOrigins = require("./allowedOrigins");

/**
 * Returns the cors options set up.
 * @return origin: being set up with the allowed origins array that contains that URLs that can access the API.
 * @return credentials: true --Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
 * @return optionsSuccesStatus: 200 --Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.
 */
const corsOptions = {
  // Configuring CORS w/ Dynamic Origin
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  optionsSuccessStatus: 200, // Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.
};

module.exports = corsOptions;
