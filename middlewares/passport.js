const passport = require('passport')
const User = require('../models/User')
const { compareSync } = require('bcrypt')
const localStrategy = require('passport-local').Strategy
const slackStrategy = require('passport-slack').Strategy

passport.serializeUser((user, cb) => {
  //recibe el usuario que se loggeó y se apoya del id para manejar la sesión
  //y envía el id al método deserializeUser
  cb(null, user._id)
})

passport.deserializeUser(async (id, cb) => {
  //recibe el id y verifica el usuario contra la DB
  // una vew que recibe el usuario, lo guarda en la propiedad user del request
  try{
    const user = await User.findById(id)
    cb(null, user)
  }catch(err){
    cb(err)
  }
})

passport.use(new localStrategy(async (username, password, next) => {
  try{
    const user = await User.findOne({username})
    if(!user){
      return next(null, false, { message: "Username doesn't exist"})
    }
    if(!compareSync(password, user.password)){
      return next(null, false, { message: 'Incorrect password'})
    }
    next(null, user) //El usuario se envía a serializeUser
  } catch(error){
    next(error)
  }
}))

passport.use( new slackStrategy({
  clientID: process.env.SLACK_ID,
  clientSecret: process.env.SLACK_SECRET
}, async (accessToken, refreshToken, profile, done)=>{
  try{
    console.log(profile)
    const user = await User.findOne({slackID: profile.id})
    if(user){
      return done(null, user)
    }
    const newUser = await User.create({
      username: profile.displayName,
      slackID: profile.id
    })
    done(null, newUser)
  }catch(err) {
    return done(err)
  }
}))


module.exports = passport