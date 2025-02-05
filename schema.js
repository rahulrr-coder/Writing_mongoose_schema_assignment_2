const mongoose = require('mongoose');

// Comment Schema (Sub-document)
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  commentedAt: {
    type: Date,
    default: Date.now
  }
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Title must be at least 5 characters long']
  },
  content: {
    type: String,
    required: true,
    minlength: [50, 'Content must be at least 50 characters long']
  },
  author: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  category: {
    type: String,
    default: 'General'
  },
  likes: [{
    type: String  // storing usernames of users who liked
  }],
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field on save
blogPostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
