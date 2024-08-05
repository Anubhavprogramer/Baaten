const jwt = require('jsonwebtoken');

function isLoggedIn(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send('You must be logged in');
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
}

module.exports = isLoggedIn;
