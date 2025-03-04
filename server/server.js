const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-todo';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const todoRoutes = require('./routes/todo');

app.use('/api', todoRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});