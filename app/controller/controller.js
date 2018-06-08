const UserController = require("./user/UserController");

module.exports = function (app) {

  app.get( '/' , UserController.index );
  app.get( '/user/information/:id' , UserController.userInformation );
  app.get( '/user/create' , UserController.createUser );
  app.post( '/user/save' , UserController.saveAction );
  app.get( '/user/delete/:id' , UserController.deleteAction );

};