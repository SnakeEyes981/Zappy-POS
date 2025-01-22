const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; // Extract token from cookies
    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};


module.exports = authenticateToken;
