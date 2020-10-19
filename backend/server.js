import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// ENVIRONMENT CONFIG
dotenv.config();

// DB CONNECTION
connectDB();

// EXPRESS CONFIG
const app = express();
// allow us to use json in body
app.use(express.json())

// MOUNTING ROUTES
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
