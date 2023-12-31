const express = require('express');
const mongoose = require('mongoose');
const controllers = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB database');
});

app.use('/api/users', controllers.userController);
app.use('/api/thoughts', controllers.thoughtController);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});