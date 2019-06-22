var userCtrl = {};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize= require('./authorize');
const User = require('../models/user'); //mongoDB user model which is not including
const Role = require('./role');
// add user Details

if(loginUser){

    
userCtrl.addDetails = function(req, res) {
User.post('/', function (req, res) {
        User.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            }, 
            function (err, user) {
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
                res.status(200).send(user);
            });
    });

//get all users
userCtrl.getAllUsersDetails=function(req,res){
    User.find({}, function (err, users) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(users);
        });
  

};
//update user
userCtrl.updateUser=function(req, res) {
    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
}
//find single user

userCtrl.getSingleUser=function(req, res) {
    const currentUser=req.user;
    if(currentUser.role!==Role.Admin){
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    
    });
}
    //Delete User
    userCtrl.deleteUser=function(req, res) {
        const currentUser=req.user;
       if(currentUser.role!==Role.Admin){
           if(autheorize){
        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem deleting the user.");
            res.status(200).send("User "+ user.name +" was deleted.");
        });
  
    }
   
   }
}
//userSignup code
userCtrl.UserSignup = (req, res, next) => {
 
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
    
//Userlogin code
userCtrl.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

}
 

module.exports = userCtrl;