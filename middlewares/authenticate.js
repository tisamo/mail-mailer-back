

const jwtUtils = require('../helpers/jwtUtils');

function authenticate(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
}

module.exports = authenticate;
