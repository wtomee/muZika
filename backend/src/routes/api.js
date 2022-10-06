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
  email: { type: String, index: true},
  favourites: { type: Array },
  playlists: { type: Array },
  own_songs: { type: Array },
})

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  songs: { type: Array }
})

const musicSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  category: { type: Array },
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
const Music = mongoose.model('Music', musicSchema)
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
  const { username, password, email } = req.body
  const user = await User.findOne({ username })
  if(user) {
    next('User exitsts')
  } else {
    const hashed = await bcrypt.hash(password, 10)
    const createdUser = await User.create({ username, password:hashed })

    res.json({id: createdUser.id})
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).select('+password')
  if(!user) {
    next('No such user')
  } else {
    const match = await bcrypt.compare(password, user.password)
    if(!match){
      next('Wrong password')
    } else {
      const token = await jwt.sign({ userId: user.id }, TOKEN_SECRET, {
        expiresIn: '1h'
  
      })
      res.json({ token })
    }
  }
})

router.get('/songs', authMw, async (req, res) =>{
  const music = await Music.find({ createdBy: req.user })
  res.json(music)
})

router.post('/songs', authMw, async (req, res) =>{
  const { artist, title } = req.body
  const created = await Music.create({ artist, title, createdBy: req.user})
  res.json(created)
})

router.get('/heartbeat', async (req, res) => {
  res.json({ connection: 'true' })
})

export default router
