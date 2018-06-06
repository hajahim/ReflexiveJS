const User = require( "../../model/User" );

class UserController {

  static index( request, response ) {
    const user = new User();
    const userList = user.selectAll();
    response.render('pages/index.pug', { userList : userList } );
  }

}

module.exports = UserController;