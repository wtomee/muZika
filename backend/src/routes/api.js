import { Router } from 'express'
import mongoose from 'mongoose'//use mongoose-type-email for email field
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

const { TOKEN_SECRET } = process.env

// DB SCHEMAS
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, index:true, required: true, trim: true },
  password: { type: String, select: false },
  registeredAt: { type: Date, default: Date.now, select: false },
  // email: { type: String, index: true},
  favourites: { type: Array },
  playlists: { type: Array },
  own_songs: { type: Array },
})

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  songs: { type: Array }
})

const songSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
})

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String }
})

// DB CLASSES
const User = mongoose.model('User', userSchema)
const Playlist = mongoose.model('Playlist', playlistSchema)
const Song = mongoose.model('Song', songSchema)
const Category = mongoose.model('Category', categorySchema)


// MIDDLEWARES

// auth MW
const authMw = async (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ', '')
  try {
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    console.log(userId)
    req.user = userId
    next()
  } catch (error) {
    next(error)
  }
}


// ROUTES

router.post('/register', async (req, res, next) => {
  const { username, password/*, email */ } = req.body
  const user = await User.findOne({ username })
  if(user) {
    res.json({ "error": "user exists"})
  } else {
    const hashed = await bcrypt.hash(password, 10)
    const createdUser = await User.create({ username, password:hashed })
    const token = await jwt.sign({ userId: createdUser.id}, TOKEN_SECRET, {
      expiresIn: '1h'
    })

    res.json({id: createdUser.id, name: createdUser.name, token})
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).select('+password')
  if(!user) {
    res.json({ "error": "no such user"})
  } else {
    const match = await bcrypt.compare(password, user.password)
    if(!match){
      res.json({ "passwordError":"wrong password" })
    } else {
      const token = await jwt.sign({ userId: user.id }, TOKEN_SECRET, {
        expiresIn: '1h'
  
      })
      res.json({ token })
    }
  }
})

// SONGS
router.get('/songs', authMw, async (req, res) =>{
  const songs = await Song.find(/* { createdBy: req.user } */)
  if (songs.length > 0) {
    res.json(songs)
  } else {
    res.send('No songs found')
  }
})

router.get('/search/:key', authMw, async (req, res) =>{
  const result = await Song.find({
    "$or": [
        {
          artist : { $regex: req.params.key },
          title : { $regex: req.params.key }
        }
    ]
  })
  res.send(result)
})

router.get('/search/:category/:key', authMw, async (req, res) =>{
  const result = await Song.find({
    "$or": [
        {
          artist : { $regex: req.params.key },
          title : { $regex: req.params.key },
          category : {$regex: req.params.category },
        }
    ]
  })
  res.send(result)
})

router.get('/songs/:id', authMw, async (req, res) =>{
  const song = await Song.findOne({ _id:req.params.id})
  if (song) {
    res.json(song)
  } else {
    res.send({"result": "No song found with ID"})
  }
})

router.get('/categories/:category/songs', authMw, async (req, res) =>{
  console.warn('category get',req.params.category)
  const foundCategory = await Category.findOne({ _id: req.params.category})
  console.warn('category found', foundCategory)
  const songs = await Song.find({ category: foundCategory._id })
  if (songs.length > 0) {
    res.json(songs)
  } else {
    res.send('No songs found for this category')
  }
})

router.put('/songs/:id', authMw, async (req, res) =>{
  const song = await Song.updateOne(
    { _id:req.params.id },
    { $set:req.body })
    res.json(song)
})

router.delete('/songs/:id', authMw, async (req, res) =>{
  const deleted = await Song.deleteOne({_id:req.params.id})
  res.json(deleted)
})

router.post('/songs', authMw, async (req, res) =>{
  const { artist, title, selectedCategory } = req.body
  const created = await Song.create({ artist, title, createdBy: req.user, category: selectedCategory})
  res.json(created)
})

router.get('/categories', authMw, async (req, res) =>{
  const categories = await Category.find()
  res.json(categories)
})

router.get('/categories/:id', authMw, async (req, res) =>{
  const category = await Category.findOne({_id:req.params.id})
  if (category) {
    res.json(category)
  } else {
    res.send({"result":"No category found"})
  }
})

router.post('/categories', authMw, async (req, res) =>{
  const { name, image } = req.body
  const category = await Category.findOne({ name })
  if(category) {
    res.json({ "error": "category exists"})
  } else {
    const created = await Category.create({ name, image })
    res.json(created)
  }
})

router.get('/heartbeat', async (req, res) => {
  res.json({ connection: 'true' })
})

export default router
