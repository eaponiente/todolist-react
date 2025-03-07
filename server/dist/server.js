import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 5000;
// CORS configuration options
const corsOptions = {
    origin: 'https://localhost', // Specify the allowed origin
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
    credentials: true, // Allow credentials (cookies, authentication)
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-todo';
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
import todoRoutes from './src/routes/todo';
app.use('/api', todoRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
