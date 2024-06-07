import path from 'path';
import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const port = process.env.PORT || 5000;
const app = express();

connectDb();


const corsOptions = {
  origin: 'https://power-hub-shop-39ez.vercel.app', // Replace with your frontend domain
  credentials: true, // Allow credentials (cookies) to be sent
};


app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

//Parse cookies 
app.use(cookieParser())

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);


app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => { console.log(`Server is running on port ${port}`) });