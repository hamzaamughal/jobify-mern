import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

//db and authenticateUser
// MONGO_URI=mongodb+srv://jobify:jobify@jobify.eur9z.mongodb.net/Jobify?retryWrites=true&w=majority
import connectDB from './db/connect.js';

// routers
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, './client/build')));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
