import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

//App Config

const app = express();
const PORT = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//Middleware

app.use(express.json());
app.use(cors());

//API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)  


app.get('/', (req, res) => {
  res.send('api is running');
});


app.listen(PORT, () => console.log("Server is running on port :" + PORT));
