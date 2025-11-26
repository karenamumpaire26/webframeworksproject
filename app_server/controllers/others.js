const request = require('request');

const about = function (req, res) {
  res.render('generic-text', { 
    title: 'About StudentInc',
    content: `
      StudentInc helps MTU students explore campus buildings,
      find services, and navigate academic life.
    `
  });
};

const register = (req, res) => {
  if (req.method === "GET") {
    return res.render('register', { title: "Register" });
  }

  const path = '/api/register';
  const postData = {
    fullName: req.body.fullName,
    tNumber: req.body.tNumber,
    email: req.body.email,
    password: req.body.password
  };

  const requestOptions = {
    url: 'http://localhost:3000' + path,
    method: 'POST',
    json: postData
  };

  request(requestOptions, (err, response, body) => {
    if (response.statusCode === 201) {
      return res.render('register-success', {
        title: "Registration Complete",
        user: body.user
      });
    } else {
      return res.render('register', {
        title: "Register",
        error: body.message
      });
    }
  });
};
const login = function (req, res) {
  res.render('login', {
    title: 'Login'
  });
};


module.exports = { 
  about,
  register,login
};
