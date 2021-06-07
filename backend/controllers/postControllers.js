import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import AppError from '../utils/appError.js'

// @ DESC Create post
// @route POST api/v1/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
  const { title, message } = req.body
  const post = new Post({
    title,
    message,
    student: req.student._id,
  })
  const createdPost = await post.save()
  if (post) {
    res.status(201).json({
      message: 'success',
      data: {
        post,
      },
    })
  } else {
    res.status(500)
    throw new Error('there was an error while creating the post')
  }
})
// @ DESC Get all posts
// @route GET api/v1/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
  if (posts) {
    res.status(200).json({
      message: 'success',
      data: {
        posts,
      },
    })
  }
})

// @ DESC get post
// @route GET api/v1/post/:id
// @access Private
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    res.status(201).json({
      message: 'success',
      data: {
        post,
      },
    })
  } else {
    res.status(401)
    throw new Error('Post not found')
  }
})
// @ DESC Update post
// @route PUT api/v1/post/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    post.title = req.body.title || post.title
    post.message = req.body.message || post.message
    const updatedPost = await post.save()
    res.status(200).json({
      message: 'success',
      data: {
        updatedPost,
      },
    })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})
// @ DESC Delete post
// @route DELETE api/v1/post/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    await post.remove()
    res.json({ message: 'Post removed successfully' })
  } else {
    new AppError('Post not found', 404)
  }
})
export { createPost, getPosts, getPostById, updatePost, deletePost }
