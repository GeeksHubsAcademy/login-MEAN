const UserModel = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserController = {
    async signup(req, res) {
        try {
            const hash = await bcrypt.hash(req.body.password, 9); //generamos hash a partir de la contraseña
            req.body.password = hash; //sobreescribimos la propiedad password con el hash obtenido
            const user = await UserModel.create(req.body); //creamos el usuario a partir del email y el hash suministrados en mongoDB
            res.status(201).send(user);//enviamos la respuesta con el objeto user
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'There was a problem trying to sign up'
            })
        }
    },
    async login(req, res) {
        try {
            const user = await UserModel.findOne({ //buscamos el usuario por el email, ej: 'user@email.com'
                email: req.body.email
            });
            if(!user){
               return res.status(400).send({message:'Wrong credentials'});
            }
            const isMatch = await bcrypt.compare(req.body.password,user.password);
            if(!isMatch){
               return res.status(400).send({message:'Wrong credentials'});
            }
            const token = jwt.sign({_id:user._id}, 'mimamaMeMima' , {expiresIn:'2w'} );
            if(user.tokens.length>4) user.tokens.shift();//si ya hay 5 tokens eliminamos el más antiguo
            user.tokens.push(token);//añadimos el token al final del array
            await user.save();//guarda los cambios en mongoDB
            res.send({message:'Welcome Mr '+user.email,user,token});
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'There was a problem trying to log in'
            })
        }
    }
}

module.exports = UserController;