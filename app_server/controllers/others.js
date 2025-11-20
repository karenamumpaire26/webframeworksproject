const about = function (req, res) {
  res.render('generic-text', { 
    title: 'About StudentInc',
    content: `
      StudentInc helps MTU students explore campus buildings,
      find services, and navigate academic life.
    `
  });
};
const register = function (req, res) {
  res.render('register', { 
    title: 'Create Account',
    formFields: ['Name', 'Email', 'Password']
  });
};

const login = function (req, res) {
  res.render('login', { 
    title: 'Login to StudentInc',
    formFields: ['Email', 'Password']
  });
};
module.exports = { 
  about,
  register,
  login
};
