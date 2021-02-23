import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

const connect = asyncHandler(async () => {
	await mongoose.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: true,
		useCreateIndex: true
	});

	console.log('successfully connected to the database');
});

export default connect;
