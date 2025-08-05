const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Controllers
const testJwtRouter = require('./controllers/test-jwt');
const authRouter = require('./controllers/auth');
const verifyToken = require('./middleware/verify-token');
const userRouter = require('./controllers/users')

// DB connection
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Public routes
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);


// Protected routes
app.use(verifyToken);
app.use('/users', userRouter);

// Server
app.listen(3000, () => {
  console.log('The express app is ready!');
});
