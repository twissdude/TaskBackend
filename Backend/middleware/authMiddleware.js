const jwt = require('jsonwebtoken');
const user = require('../models/User');

exports.project = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('')[1];
        if (!token) {
            return res.status(401).json({error: 'Unauthorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid or expired token'});
    }
};