const express = require('express');
const cors = require('cors');
const connectTo = require('./db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/addreviews', require('./routes/addreviews'));
app.use('/api/books', require('./routes/books'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Connect to database
connectTo();
