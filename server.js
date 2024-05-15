import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
dotenv.config();
connectDB();
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/post",postRoute);
app.get('/', (req, res) => {
    res.send('I am Backend from the ecommerce app');
  });
  
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});
