const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../../config/keys');

//Load Input validation
const validateRegisterInput = require('../middleware/validation/register');
const validateLoginInput = require('../middleware/validation/login');

// user registration
const user_register = (req, res) => {
  //validate user registration
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // searching user
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(404).json(errors);
    } else {
      // creating new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // bcrypting the plain user details
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(res.json({ success: true, msg: 'Registered Sucessfully' }))
            .catch(err => new Error('Error:', err));
        });
      });
    }
  });
};

// user login
const user_login = (req, res) => {
  //validate user login
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        // create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

//check current user
const user_current = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

//exporting all user module
module.exports = {
  user_register,
  user_login,
  user_current
};
