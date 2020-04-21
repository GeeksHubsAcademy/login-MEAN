const UserModel = require('../models/User.js');
const UserController = {
    async signup(req, res) {
        try {
           const user = await UserModel.create(req.body);
           res.status(201).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'There was a problem trying to sign up'
            })
        }
    },
    login(req, res) {

    }
}

module.exports = UserController;