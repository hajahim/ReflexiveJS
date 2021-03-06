const Travail = require( "../../model/Travail" );

class TravailController {

  static travailList( request, response ) {
    const travail = new Travail();
    const travailList = travail.find();
    travailList.then( function( list ) {
      response.render('pages/travail/travailList.pug', { travailList : list } );
    });
  }

  static travailInformation( request, response ) {
    const travailID = request.params.id;
    const currentTravail = {};
    const travail = new Travail( travailID );
    const travailToFind = travail.find();
    travailToFind.then( function( currentTravail ) {
      response.render('pages/travail/information.pug', { travail : currentTravail[0] } );
    });
  }

  static createTravail( request, response ) {
    const travail = new Travail();
    const travailForm = travail.generateForm( { formAction: "/travail/save", formMethod: "POST", formTextSubmit: "Sauvegarder" } );
    response.render('pages/travail/create.pug', { form: travailForm } );
  }

  //-- [POST] --/
  static saveAction( request, response ) {
    const travailLibelle = request.body.libelle;
    const travailDescription = request.body.description;
    let travail = new Travail( null, travailLibelle, travailDescription );
    travail = travail.save();
    travail.then( function( currentTravail ) {
      response.render('pages/travail/information.pug', { travail : currentTravail } );
    });
  }

}

module.exports = TravailController;