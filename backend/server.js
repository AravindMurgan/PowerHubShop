import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectDb();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

console.log('test clg');
app.listen(port, () => { console.log(`Server is running on port ${port}`) });