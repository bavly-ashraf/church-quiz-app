const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
require('./database');

// Routes imports
const authRoute = require('./routes/authRoute');
//

// Global Middlewares
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
// 

// Routes
app.use('/auth', authRoute);
// 

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
      staus: statusCode,
      message: err.message || 'internal server error',
      errors: err.errors || []
  })
});
// 

// App Initialization
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
// 