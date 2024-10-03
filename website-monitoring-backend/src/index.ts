import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import monitorRoutes from './routes/monitorRoutes'; // Import your routes
import './schedular';

// Other imports...

mongoose.set('strictQuery', true); // or false, depending on your preference

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
}));
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Register the monitor routes
app.use('/monitors', monitorRoutes); // This registers your /monitors route

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
