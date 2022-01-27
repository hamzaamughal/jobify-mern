import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';

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

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobRoutes);

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
