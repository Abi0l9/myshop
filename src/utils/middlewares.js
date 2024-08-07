const jwt = require("jsonwebtoken");
const config = require("./config");

const errorHandler = (error, _request, response, next) => {
    if (error.message === "jwt must be provided") {
      return response
        .status(403)
        .json({ success: false, message: "jwt token missing or not provided" });
    } else if (error) {
      return response
        .status(403)
        .json({ success: false, message: error.message });
    }
  
    next();
  };

  const tokenExtractor = (request, _response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      request.token = authorization.substring(7);
    }
  
    next();
  };


  const userExtractor  = (request, _response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  request.user = decodedToken;

  next();
};
  
  module.exports = {errorHandler, tokenExtractor, userExtractor};