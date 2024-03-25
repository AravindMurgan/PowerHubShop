import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;

connectDb();


const app = express();
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

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use(notFound);
app.use(errorHandler);

console.log('test clg');
app.listen(port, () => { console.log(`Server is running on port ${port}`) });