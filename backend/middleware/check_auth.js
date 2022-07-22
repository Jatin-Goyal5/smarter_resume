const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)

    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (err) {
    res.status(401).json({
      status: {
        message: 'auth failed',
        code: 401,
      }
    })

  }


}