const mongoose = require('mongoose');

const AudioRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isLive: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('AudioRoom', AudioRoomSchema);
