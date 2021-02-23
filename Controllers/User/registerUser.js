import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../Models/UserModel.js';

const registerUser = asyncHandler(async (req, res) => {
	const { email, username, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new Error('Please Provide valid Credientials');
	}

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new Error('User Already Exists');
	} else {
		const newUser = new User({
			username,
			email,
			password
		});

		const salt = await bcrypt.genSalt(10);

		const hash = await bcrypt.hash(password, salt);

		newUser.password = hash;

		const user = await newUser.save();

		const payload = {
			_id: user._id
		};

		const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' });

		return res.status(200).json({
			token,
			user
		});
	}
});

export default registerUser;
