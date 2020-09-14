var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");

var User = require("../model/User");
var Role = require("../model/User_roles");

router.post("/register", function (req, res) {
  var username = req.body.name;
  var city = req.body.city;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

  var newUser = new User({
    username: username,
    city: city,
    email: email,
    password: password,
  });

  if (password === confirmPassword) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.json({ message: "Something went wrong!!", error: err });
      } else {
        // to check number of records in db
        User.count({}, function (err, count) {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          } else {
            if (count < 1) {
              newUser.password = hash;
              const role = new Role({ name: "admin" });
              newUser.role = role.name;
              // to save new user in collection
              newUser.save(function (err, savedUser) {
                if (err) {
                  return res
                    .status(500)
                    .json({ message: "Internal server error" });
                }
                return res.status(200).json({
                  message: "User has been registered succesfully",
                  user: { email: savedUser.email, role: savedUser.role },
                });
              });
            } else {
            //  to find if user with same name exist or not
              User.find({ username: username })
                .then((user) => {
                  if (user.length === 0) {
                    newUser.password = hash;
                    const role = new Role();
                    newUser.role = role.name;
                    newUser.save(function (err, savedUser) {
                      if (err) {
                        return res
                          .status(500)
                          .json({ message: "Internal server error" });
                      }
                      return res.status(200).json({
                        message: "User has been registered succesfully",
                        user: { email: savedUser.email, role: savedUser.role },
                      });
                    });
                  } else {
                    return res.json({ message: "User Already Exists" });
                  }
                })
                .catch((err) => {
                  return res.json({ error: err });
                });
            }
          }
        });
      }
    });
  } else {
    return res
      .status(400)
      .json({ message: "Bad Request !! Please check your input once" });
  }
});

module.exports = router;
