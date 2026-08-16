import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import responseMiddleware from './middleware/response.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';
import notFoundMiddleware from './middleware/notFound.middleware.js';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Global Response Middleware
app.use(responseMiddleware);

// API Routes
app.use('/api/v1', routes);

// Handle 404
app.use(notFoundMiddleware);

// Global Error Handler
app.use(errorMiddleware);

export default app;
