const request = require('request');

const apiOptions = {
  server: 'https://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = process.env.API_SERVER || 'YOUR_RENDER_URL';
}

const showRegister = (req, res) => {
  res.render('register', { title: 'Register' });
};

const showLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

const doRegister = (req, res) => {
  const path = '/api/register';
  const postData = {
    fullName: req.body.fullName,
    tNumber: req.body.tNumber,
    email: req.body.email,
    password: req.body.password
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postData,
    rejectUnauthorized: false
  };
  request(requestOptions, (err, response, body) => {
    if (response && response.statusCode === 201) {
      return res.redirect('/login');
    }
    return res.render('register', {
      title: 'Register',
      error: body && body.message ? body.message : 'Registration failed'
    });
  });
};

const doLogin = (req, res) => {
  const path = '/api/login';
  const postData = {
    identifier: req.body.email,
    password: req.body.password
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postData,
    rejectUnauthorized: false
  };
  request(requestOptions, (err, response, body) => {
    if (response && response.statusCode === 200) {
      req.session.user = body.user;
      return res.redirect('/');
    }
    return res.render('login', {
      title: 'Login',
      error: body && body.message ? body.message : 'Login failed'
    });
  });
};

const doLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = {
  showRegister,
  showLogin,
  doRegister,
  doLogin,
  doLogout
};
