require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Basic route
app.get('/', (req, res) => {
  res.send('Social Media API running');
});

// API routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Socket.io setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
