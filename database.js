const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING).then(result => console.log('Database connected successfully!!')).catch(err => console.log(err));