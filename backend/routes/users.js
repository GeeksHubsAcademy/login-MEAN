const router = require('express').Router();
const UserController = require('../controllers/UserController.js');
const { authentication,isAdmin } = require('../middleware/authentication.js')
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/info', authentication, UserController.getUserInfo);
router.get('/', authentication, isAdmin, UserController.getAll);

module.exports = router;