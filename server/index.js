const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)

const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat';
const connectWithRetry = () => {
    mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
      });
  };
  connectWithRetry();


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


