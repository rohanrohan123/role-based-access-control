const User = require('../models/user.model');
const router = require('express').Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const Form = require('../models/form.model')

router.get('/users-details', async (req, res, next) => {
  try {
    const users = await User.find();
    const person = req.user;

    if (person.role === 'ADMIN') {
      const person_email = person.email;
      var data_Client = users.filter(element => element.role === 'CLIENT')
      var data_Clent_data = data_Client.filter(element => element.adminemail === person_email)
      res.render('userDetailsForAdmin', { data_Clent_data });
      console.log("data_Clent_data", data_Clent_data)
    } else {
      console.log("FALSE")
    }

  } catch (error) {
    next(error);
  }
});


router.get('/form-details', async (req, res, next) => {

try {
  const users = await User.find();
  const person_email = req.user;
  const form_details = await Form.find();
  var data_Client = users.filter(element => element.role === 'CLIENT')
  var data_Clent_data_each_admin = data_Client.filter(element => element.adminemail === person_email.email)
// var formdetails_array=[];

// formdetails_array.push(form_details);
  var client_data_email = [];
  var i;
  for (i = 0; i < data_Clent_data_each_admin.length; i++) {
    client_data_email.push(data_Clent_data_each_admin[i].email);
  }




var result=[];


//   client_data_email.map((email)=>{
//     var result=form_details.filter(obj=> obj.email == email);
//     //  res.render('adminFormdetails', { result });
// // console.log("result",result);
// })

  // var data_form = formdetails_array.filter(element => element.email === client_data_email)
  // console.log("result_data",result)

  res.render('adminFormdetails', { client_data_email ,form_details,users});
  // console.log("formdetails_array", formdetails_array);
  console.log("form_details", form_details);
  console.log("form_clientdetails", client_data_email);
} catch (error) {
  next(error);
}




});








router.post('/update-status', async (req, res, next) => {
  try {
    const { id,status} = req.body;
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
    // if (adminemail=="Null"){
    //   req.flash('info', `Please Select Correct Option`);
    // }else {
      const user = await Form.findByIdAndUpdate(
        id,
        { status },
        //  { new: true, runValidators: true }
      );
  
      req.flash('info', `updated user For Admin ${status}`);
    // }
   
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});





// router.get('/user/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       req.flash('error', 'Invalid id');
//       res.redirect('/superadmin/users');
//       return;
//     }
//     const person = await User.findById(id);
//     res.render('profile', { person });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/update-role', async (req, res, next) => {
//   try {
//     const { id, role } = req.body;

//     // Checking for id and roles in req.body
//     if (!id || !role) {
//       req.flash('error', 'Invalid request');
//       return res.redirect('back');
//     }

//     // Check for valid mongoose objectID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       req.flash('error', 'Invalid id');
//       return res.redirect('back');
//     }

//     // Check for Valid role
//     const rolesArray = Object.values(roles);
//     if (!rolesArray.includes(role)) {
//       req.flash('error', 'Invalid role');
//       return res.redirect('back');
//     }

//     // Admin cannot remove himself/herself as an admin
//     if (req.user.id === id) {
//       req.flash(
//         'error',
//         'Admins cannot remove themselves from Admin, ask another admin.'
//       );
//       return res.redirect('back');
//     }

//     // Finally update the user
//     const user = await User.findByIdAndUpdate(
//       id,
//       { role },
//       { new: true, runValidators: true }
//     );

//     req.flash('info', `updated role for ${user.email} to ${user.role}`);
//     res.redirect('back');
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
