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

const register = async (req, res) => {
  if (req.method === "GET") {
    return res.render('register', { title: "Register" });
  }

  const postData = {
    fullName: req.body.fullName,
    tNumber: req.body.tNumber,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const apiResponse = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });

    const body = await apiResponse.json();

  
    if (apiResponse.status === 201) {
      return res.redirect('/login');
    }

   
    return res.render('register', {
      title: "Register",
      error: body.message || "Registration failed"
    });

  } catch (err) {
    console.error(err);
    return res.render('register', {
      title: "Register",
      error: "A server error occurred."
    });
  }
};

const login = function (req, res) {
  res.render('login', { title: 'Login' });
};

const processLogin = async (req, res) => {
  const postData = {
    identifier: req.body.identifier,
    password: req.body.password
  };

  try {
    const apiResponse = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    });

    const body = await apiResponse.json();

    if (apiResponse.status === 200) {
      return res.redirect("/");
    }

    return res.render("login", {
      title: "Login",
      error: body.message || "Login failed"
    });

  } catch (err) {
    console.error("ERROR:", err);
    return res.render("login", {
      title: "Login",
      error: "Server error. Try again."
    });
  }
};

module.exports = { 
  about,
  register,
  login,
  processLogin
};
