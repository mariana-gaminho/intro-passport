const { Router } = require('express')
const router = Router()
const { getSignup, postSignup, getLogin, logout } = require('../controllers/authControllers')
//Vamos a usar a passport en el post --> necesitamos requerir a passport
const passport = require('../middlewares/passport')

router.get('/signup', getSignup)
router.post('/signup', postSignup)
router.get('/login', getLogin)
// El passport.authenticate recibe la estrategia que va a gestionar ese authenticate
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  passReqToCallback: true,
  failureFlash: true
})) 
router.get('/logout', logout)
router.get('/slack', passport.authenticate('slack'))
router.get('/slack/callback', passport.authenticate('slack', {
  successRedirect: '/private-page',
  failureRedirect: '/auth/login'
}))

module.exports = router

