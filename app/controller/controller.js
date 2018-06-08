const UserController = require("./user/UserController");

module.exports = function (app) {

  app.get( '/' , UserController.index );
  app.get( '/user/:id' , UserController.userInformation );

};