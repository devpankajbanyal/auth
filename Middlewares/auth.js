import User from '../Models/UserModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const auth = asyncHandler(async (req, res, next) => {
	console.log(req.headers);

	if (!req.headers.authorization) {
		throw new Error('Inavlid Credientials');
	} else {
		const token = req.headers.authorization.split(' ')[1];

		const decodedUser = jwt.verify(token, process.env.SECRET);

		const user = await User.findById(decodedUser._id);

		req.user = user;

		next();
	}
});

export default auth;
