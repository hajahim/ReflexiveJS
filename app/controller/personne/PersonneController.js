const Personne = require( "../../model/Personne" );

class PersonneController {

  static userList( request, response ) {
    const personne = new Personne();
    const userList = personne.find();
    userList.then( function( list ) {
      response.render('pages/user/userList.pug', { userList : list } );
    });
  }

  static userInformation( request, response ) {
    const userID = request.params.id;
    const currentUser = {};
    const personne = new Personne( userID );
    const userToFind = personne.find();
    userToFind.then( function( currentUser ) {
      response.render('pages/user/information.pug', { user : currentUser[0] } );
    });
  }

  static createUser( request, response ) {
    const user = new Personne();
    const userForm = user.generateForm( { formAction: "/user/save", formMethod: "POST", formTextSubmit: "Sauvegarder" } );
    response.render('pages/user/create.pug', { form: userForm } );
  }
  
  //-- [POST] --/
  static saveAction( request, response ) {
    const userName = request.body.nom;
    const userPrenom = request.body.prenom;
    const userAge = request.body.age;
    let user = new Personne( null, userName, userPrenom, userAge );
    user = user.save();
    user.then( function( currentUser ) {
      response.render('pages/user/information.pug', { user : currentUser } );
    });
  }

  //-- [GET] --/
  static deleteAction( request, response ) {
    const userID = request.params.id;
    let user = new Personne( userID );
    user = user.delete();
    user.then( function() {
      const personne = new Personne();
      const userList = personne.findAll();
      userList.then( function( list ) {
        response.render('pages/index.pug', { userList : list } );
      });
    });
  }

  //-- [POST] --/
  static modifyAction( request, response ) {
    const userID = request.body.idUser;
    const userName = request.body.nom;
    const userPrenom = request.body.prenom;
    const userAge = request.body.age;
    let user = new Personne( userID, userName, userPrenom, userAge );
    user = user.update();
    user.then( function( userUpdated ) {
      const personne = new Personne();
      const userList = personne.findAll();
      userList.then( function( list ) {
        response.render('pages/index.pug', { userList : list } );
      });
    });
  }

}

module.exports = PersonneController;