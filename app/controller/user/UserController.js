const Personne = require( "../../model/Personne" );

class UserController {

  static index( request, response ) {
    const personne = new Personne();
    const userList = personne.findAll();
    userList.then( function( list ) {
      response.render('pages/index.pug', { userList : list.recordset } );
    });
  }

  static userInformation( request, response ) {
    const userID = request.params.id;
    const currentUser = {};
    const personne = new Personne( userID );
    const userToFind = personne.find();
    userToFind.then( function( currentUser ) {
      response.render('pages/user/information.pug', { user : currentUser.recordset[0] } );
    });
  }

}

module.exports = UserController;