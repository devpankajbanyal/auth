//importing global modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//importing local modules
import connect from './database/connect.js';
import UserRoutes from './routes/Auth/auth.js';

// setting app instance
const app = express();

//bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setting cors
app.use(cors());

//configuring environment file
dotenv.config();

//connecting to the database
connect();

//setting routes
app.use('/api/user', UserRoutes);

//setting error middlewares
app.use((req, res, next) => {
	const error = new Error(`URL not found ${req.originalUrl}`);
	res.status(404);
	next(error);
});

//erorr habdler

app.use((err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	});
});

//listening on Port
app.listen(process.env.PORT, () => {
	console.log(`server listing in ${process.env.NODE_ENV} on localhost:${process.env.PORT}`);
});
