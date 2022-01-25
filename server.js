import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

//db and authenticateUser
// MONGO_URI=mongodb+srv://jobify:jobify@jobify.eur9z.mongodb.net/Jobify?retryWrites=true&w=majority
import connectDB from './db/connect.js';

// routers
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRoutes);

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
