const router = require('express').Router();



const User = require('../models/user.model');
const Form = require('../models/form.model');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');

// router.get('/form', async (req, res, next) => {

//   res.render('form');
// });

router.get(
  '/form',
  ensureLoggedIn({ redirectTo: '/' }),
  async (req, res, next) => {
    res.render('form');
  }
);

// router.post(
//   '/form',
//   ensureLoggedIn({ redirectTo: '/' }),
//    registerValidator,
//   async (req, res, next) => {
//     try {

//       const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//               errors.array().forEach((error) => {
//                 req.flash('error', error.msg);
//               });
//               res.render('form', {
//                 email: req.body.email,
//                 messages: req.flash(),
//               });
//               return;
//             }

//             const { email } = req.body;

//             const doesExist = await Form.findOne({ email });
//             if (doesExist) {
//               req.flash('warning', 'Username/email already exists');
//               res.redirect('/auth/register');
//               return;
//             }







//       const form = new Form(req.body);

//       await form.save();
//       req.flash(
//         'success',
//         `save form succesfully`
//       );
//          res.redirect('/auth/login');
//     } catch (error) {
//       next(error);
//     }



//   }
// );




router.post(
  '/form',
  ensureLoggedIn({ redirectTo: '/' }),
  // registerValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('form', {
          email: req.body.email,
          messages: req.flash(),
        });
        return;
      }

      const { email } = req.body;

      const doesExist = await Form.findOne({ email });
      if (doesExist) {
        req.flash('warning', 'Username/email already exists');
        res.redirect('/auth/register');
        return;
      }
      const form = new Form(req.body);

      await form.save();
      req.flash(
        'success',
        `${form.email} registered succesfully, you can now login`
      );
      res.redirect('/auth/login');
    } catch (error) {
      next(error);
    }
  }
);

router.get('/formtable', async (req, res, next) => {
  const { email } = req.user;

  try {
    const data = await Form.find();

    var data_filter = data.filter(element => element.email === email)

    res.render('formtable', { data_filter });
    console.log("data_filter23", data_filter);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }



});




module.exports = router;
