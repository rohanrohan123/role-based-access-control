const router = require('express').Router();

router.get('/profile', async (req, res, next) => {

  const person = req.user;
  console.log("hellouser",person);
  res.render('profile', { person });
});



module.exports = router;
