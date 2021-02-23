import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../Models/UserModel.js';

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new Error('Please Provide valid Credientials');
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('User do not exists');
	} else {
		const isMatched = await bcrypt.compare(password, user.password);

		if (!isMatched) {
			throw new Error('Password Do Not Match');
		}

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

export default loginUser;
