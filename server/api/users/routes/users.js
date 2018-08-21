const userRouter = require('express').Router();
const passport = require('passport');

//using user controller
const UserController = require('../controllers/users');

//@route POST api/users/register
//@desc Register user
//@access Public
userRouter.post('/register', UserController.user_register);

//@route POST api/users/login
//@desc Login user / Returning JWT Token
//@access Public
userRouter.post('/login', UserController.user_login);

//@route GET api/users/current
//@desc Return current user / required passport-jwt strategy to authenticate
//@access Private
userRouter.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	UserController.user_current
);

//exporting user router
module.exports = userRouter;
