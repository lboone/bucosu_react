const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const { route } = require('./profile')


// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, [
  check('text','Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  
  try {
    const user = await User.findById(req.user.id).select('-password')
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }
    
    const post = new Post(newPost)
    await post.save();

    res.status(200).json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/',auth, async (req,res) => {
  try{
    const posts = await Post.find().sort({date: -1 })
    res.status(200).json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id',auth, async (req,res) => {
  try{
    const post = await Post.findById(req.params.id)
    if(!post){
      return res.status(404).json({ errors: [{msg: 'Post not found'}]})  
    }
    res.status(200).json(post)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Post not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id',auth, async (req,res) => {
  try{
    const post = await Post.findById(req.params.id)

    if(!post){
      return res.status(404).json({errors: [{msg: 'Post not found'}]})
    }
    // Make sure user deleting post is the owner of the post
    if (post.user.toString() !== req.user.id){
      return res.status(401).json({ errors: [{msg: 'User not authorized'}]})  
    }
    await post.remove()
    res.status(200).json({msg: 'Post removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Post not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    if(!post){
      return res.status(404).json({errors: [{msg: 'Post not found'}]})
    }
    // Check to see if post has already been liked by user
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      return res.status(400).json({errors: [{msg: 'Post already liked'}]})
    }

    post.likes.unshift({ user: req.user.id})
    await post.save()

    res.status(200).json(post.likes)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Post not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT api/posts/unlike/:id
// @desc    Un Like a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    if(!post){
      return res.status(404).json({errors: [{msg: 'Post not found'}]})
    }
    // Check to see if post has already been liked by user
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
      return res.status(400).json({errors: [{msg: 'Post has not yet been liked'}]})
    }

    // Get the remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

    post.likes.splice(removeIndex,1)
    await post.save()

    res.status(200).json(post.likes)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Post not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})


// @route   PUT api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.put('/comment/:id', [auth, [
  check('text','Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  try{
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)
    if(!post){
      return res.status(404).json({errors: [{msg: 'Post not found'}]})
    }

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }
    post.comments.unshift(newComment)
    await post.save()

    res.status(200).json(post.comments)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Post not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Un Like a post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id)
    if(!post){
      return res.status(404).json({errors: [{msg: 'Post not found'}]})
    }

    // Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id)

    // Make sure comment exists
    if(!comment){
      return res.status(404).json({errors: [{msg: 'Comment does not exist'}]})
    }

    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({errors: [{msg: 'User not authorized'}]})
    }
    
    // Get the remove index
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

    post.comments.splice(removeIndex,1)
    await post.save()

    res.status(200).json(post.comments)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Post not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})


module.exports = router