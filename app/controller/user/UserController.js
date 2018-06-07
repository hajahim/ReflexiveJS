const Personne = require( "../../model/Personne" );

class UserController {

  static index( request, response ) {
    const personne = new Personne();
    const userList = personne.selectAll();
    userList.then( function( list ) {
      console.warn( list );
    });
    response.render('pages/index.pug', { userList : userList } );
  }

}

module.exports = UserController;