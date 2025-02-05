const mongoose = require('mongoose');
const BlogPost = require('./schema');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// CREATE Operations
const createBlogPost = async (postData) => {
  try {
    const newPost = new BlogPost(postData);
    const savedPost = await newPost.save();
    console.log('Blog post created successfully:', savedPost);
    return savedPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

const addComment = async (postId, commentData) => {
  try {
    const post = await BlogPost.findById(postId);
    post.comments.push(commentData);
    const updatedPost = await post.save();
    console.log('Comment added successfully');
    return updatedPost;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// READ Operations
const getAllPosts = async () => {
  try {
    const posts = await BlogPost.find({});
    console.log('Retrieved all posts');
    return posts;
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

const getPostById = async (postId) => {
  try {
    const post = await BlogPost.findById(postId);
    if (!post) throw new Error('Post not found');
    return post;
  } catch (error) {
    console.error('Error getting post:', error);
    throw error;
  }
};

const getPostsByCategory = async (category) => {
  try {
    const posts = await BlogPost.find({ category });
    return posts;
  } catch (error) {
    console.error('Error getting posts by category:', error);
    throw error;
  }
};

// UPDATE Operations
const updatePost = async (postId, updateData) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedPost) throw new Error('Post not found');
    console.log('Post updated successfully');
    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

const addLike = async (postId, username) => {
  try {
    const post = await BlogPost.findById(postId);
    if (!post.likes.includes(username)) {
      post.likes.push(username);
      await post.save();
    }
    return post;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

// DELETE Operations
const deletePost = async (postId) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(postId);
    if (!deletedPost) throw new Error('Post not found');
    console.log('Post deleted successfully');
    return deletedPost;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const post = await BlogPost.findById(postId);
    post.comments.id(commentId).remove();
    await post.save();
    console.log('Comment deleted successfully');
    return post;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

module.exports = {
  createBlogPost,
  addComment,
  getAllPosts,
  getPostById,
  getPostsByCategory,
  updatePost,
  addLike,
  deletePost,
  deleteComment
};
