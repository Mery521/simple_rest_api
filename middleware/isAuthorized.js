const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = (context) => {
    let token;
    if (context.req && context.req.headers.authorization) {
      token = context.req.headers.authorization.split("Bearer ")[1];
    }
    if (!token) throw new Error('User not authorized');
    jwt.verify(token, secret, (err, decodedToken) => {
        context.user = decodedToken;
    });
    return context;
};