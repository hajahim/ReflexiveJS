const UserController = require("./personne/PersonneController");

module.exports = function (app) {

  app.get( '/' , UserController.index );
  app.get( '/user/information/:id' , UserController.userInformation );
  app.get( '/user/create' , UserController.createUser );
  app.post( '/user/save' , UserController.saveAction );
  app.get( '/user/delete/:id' , UserController.deleteAction );
  app.post( '/user/update' , UserController.modifyAction );

};