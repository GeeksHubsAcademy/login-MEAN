const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, 'mimamaMeMima');
        const user = await UserModel.findOne({
            _id: payload._id,
            tokens: token
        });
        if (!user) {
            return res.status(401).send({
                message: 'You are not authorized'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        res.status(401).send({
            message: 'You are not authorized',
            error
        })
    }
}
const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
       return res.status(403).send({
            message: 'You are not allowed to access this zone'
        })
    }
    next();
}
module.exports = {
    authentication,
    isAdmin
}