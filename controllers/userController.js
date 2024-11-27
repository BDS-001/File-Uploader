const bcrypt = require('bcryptjs');
const passport = require('../config/passport')
const userQueries = require('../prisma/userQueries')

async function getUserContent(req, res) {
    res.render("index")
}

function getLoginPage(req, res) {
  res.render("login")
}

function getUserSignUp(req, res) {
    res.render('signup')
}

async function postUserSignUp(req, res, next) {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) return next(err)
    try {
      const user = {
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,

      }
      await userQueries.addUser(user)
      res.redirect("/login");
    } catch(err) {
      return next(err);
    }
  });
};

const postLogIn = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
});

function getLogOut(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
};

module.exports = {
    getUserContent,
    getLogOut,
    getUserSignUp,
    postLogIn,
    postUserSignUp,
    getLoginPage,
}