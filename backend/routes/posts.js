const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// Create a post
router.post('/', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });
    const post = new Post({
      user: decoded.id,
      content,
      createdAt: new Date()
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
