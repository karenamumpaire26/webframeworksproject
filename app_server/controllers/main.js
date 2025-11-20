const index = function(req, res){
  res.render('index', { 
    title: 'StudentInc',
    message: 'Welcome to StudentInc' 
  });
};

module.exports = {
  index
};
