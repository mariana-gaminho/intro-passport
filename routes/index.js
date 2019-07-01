const express = require('express');
const router  = express.Router();
//-------NEW-------//
const {ensureLoggedIn} = require('connect-ensure-login')
//-----------------//

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET private-page */
router.get('/private-page', ensureLoggedIn({
  redirectTo: '/auth/login'
}), (req, res) => {
  res.render('private', {user:req.user})
})

module.exports = router;
