//importing global modules
import express from 'express';
import asyncHandler from 'express-async-handler';
import { check } from 'express-validator';

// importing local modules
import auth from '../../Middlewares/auth.js';
import registerUser from '../../Controllers/User/registerUser.js';
import loginUser from '../../Controllers/User/loginUser.js';

//setting router instance

const router = express.Router();

// @ Desc register Route
// @ /api/user/register
// @ public route

router.post(
	'/register',
	[
		check('username', 'username is requires field').not().isEmpty(),
		check('email', 'please provide a valid email').isEmail(),
		check('password', 'password must be 6 characters long').isLength({
			min: 6
		})
	],
	registerUser
);

// @ Desc rlogin Route
// @ /api/user/login
// @ public route

router.post(
	'/login',
	[
		check('email', 'please provide a valid email').isEmail(),
		check('password', 'please provide password').not().isEmpty()
	],
	loginUser
);

// @ Desc logged user private Route
// @ /api/user/auth
// @ private route

router.get(
	'/auth',
	auth,
	asyncHandler((req, res) => {
		return res.status(200).json(req.user);
	})
);

export default router;
