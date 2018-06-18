const UserController = require("./personne/PersonneController");
const TravailController = require("./travail/TravailController");

module.exports = function (app) {

  app.get( '/' , function( request, response ) {
    response.render('pages/index.pug');
  });

  /* USER CONTROLLER */
  app.get( '/user/list' , UserController.userList );
  app.get( '/user/information/:id' , UserController.userInformation );
  app.get( '/user/create' , UserController.createUser );
  app.post( '/user/save' , UserController.saveAction );
  app.get( '/user/delete/:id' , UserController.deleteAction );
  app.post( '/user/update' , UserController.modifyAction );

  /* TRAVAIL CONTROLLER */
  app.get( '/travail/list' , TravailController.travailList );
  app.get( '/travail/information/:id' , TravailController.travailInformation );
  app.get( '/travail/create' , TravailController.createTravail );
  app.post( '/travail/save' , TravailController.saveAction );

};