const jwt = require("jsonwebtoken");

const secret = "seeeccreeet";
const expiration = "2h";

module.exports = {
  //check if there is an existing token in request
  //if there is an existing token we will verify and decode the token
  authMiddleware: function ({ req }) {
    //Check for token in different places
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    // Remove "barear" from token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
        //retunr payload data and add to user
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },

  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

//QUESTION: TOEKN FOR STUDENT AND TUTOR OR ONLY ONE?
