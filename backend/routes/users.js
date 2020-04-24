const router = require('express').Router();
const UserController = require('../controllers/UserController.js');
const { authentication,isAdmin } = require('../middleware/authentication.js')
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/info', authentication, UserController.getUserInfo);
router.get('/recover/:email', UserController.recover);
router.post('/reset', UserController.resetPassword);
router.put('/', authentication, UserController.update);
router.get('/logout', authentication, UserController.logout);
router.get('/', authentication, isAdmin, UserController.getAll);
router.delete('/:userId', authentication, isAdmin, UserController.delete);

module.exports = router;