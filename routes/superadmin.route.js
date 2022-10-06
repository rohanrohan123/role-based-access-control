const User = require('../models/user.model');
const Form =require('../models/form.model')
const router = require('express').Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    // res.send(users);
    // console.log("userdata1",users)
    res.render('manage-users', { users });
  } catch (error) {
    next(error);
  }
});





router.get('/assignuser', async (req, res, next) => {
  try {
    const data = await User.find();

    var data_Client = data.filter(element => element.role === 'CLIENT')
    var data_Admin = data.filter(element => element.role === 'ADMIN')
   

    res.render('assignAdminToUser', { data_Client,data_Admin});

     console.log("data_filter231", data_Admin);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/superadmin/users');
      return;
    }
    const person = await User.findById(id);
    res.render('profile', { person });
  } catch (error) {
    next(error);
  }
});

router.post('/update-role', async (req, res, next) => {
  try {
    const { id, role } = req.body;

    console.log("hellorole",req.body)

    // Checking for id and roles in req.body
    if (!id || !role) {
      req.flash('error', 'Invalid request');
      return res.redirect('back');
    }

    // Check for valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      return res.redirect('back');
    }

    // Check for Valid role
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
      req.flash('error', 'Invalid role');
      return res.redirect('back');
    }

    // Admin cannot remove himself/herself as an admin
    if (req.user.id === id) {
      req.flash(
        'error',
        'Admins cannot remove themselves from Admin, ask another admin.'
      );
      return res.redirect('back');
    }

    // Finally update the user
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    req.flash('info', `updated role for ${user.email} to ${user.role}`);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});













router.post('/assign-user', async (req, res, next) => {
  try {
    const { id,adminemail} = req.body;
    console.log("body",req.body)
    // const dataadmin = await User.find();
    // const {adminemail}=dataadmin;
    // var data_AssignAdmin = dataadmin.filter(element => element.id === id)



    // console.log("hellorole",data_AssignAdmin)

    // Checking for id and roles in req.body
    // if (!id || !role) {
    //   req.flash('error', 'Invalid request');
    //   return res.redirect('back');
    // }

    // Check for valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      return res.redirect('back');
    }

    // Check for Valid role
    // const rolesArray = Object.values(roles);
    //  if (!rolesArray.includes(role)) {
    //   req.flash('error', 'Invalid role');
    //   return res.redirect('back');
    // }

    // Admin cannot remove himself/herself as an admin
    // if (req.user.id === id) {
    //   req.flash(
    //     'error',
    //     'Admins cannot remove themselves from Admin, ask another admin.'
    //   );
    //   return res.redirect('back');
    // }

    // Finally update the user
    if (adminemail=="Null"){
      req.flash('info', `Please Select Correct Option`);
    }else {
      const user = await User.findByIdAndUpdate(
        id,
        { adminemail },
        //  { new: true, runValidators: true }
      );
  
      req.flash('info', `updated user ${user.email} For Admin ${adminemail}`);
    }
   
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
