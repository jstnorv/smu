const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const AudioRoom = require('../models/AudioRoom');

// Example: Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Example: Get all posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find().populate('author').populate('comments.user');
  res.json(posts);
});

// Example: Get all audio rooms
router.get('/audio-rooms', async (req, res) => {
  const rooms = await AudioRoom.find().populate('host').populate('participants');
  res.json(rooms);
});

module.exports = router;
