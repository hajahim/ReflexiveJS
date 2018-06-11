const express = require('express')
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const path = require('path');
const http = require('http');
const sassMiddleware = require('node-sass-middleware');

const app = express()

app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'app/views' ) );
app.set( 'view engine', 'pug' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( cookie() );

app.use(
  sassMiddleware({
      src: path.join( __dirname, 'app/views/styles/scss' ),
      dest: path.join( __dirname, 'app/views/styles/css' ),
      outputStyle: 'compressed'
  })
);

app.use( express.static( path.join( __dirname, 'app/views/styles/css' ) ) );

app.use( express.static( path.join( __dirname, 'app/views/images' ) ) );

require( './app/controller/controller' )( app );

http.createServer( app ).listen( app.get( 'port' ), function( ) {
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});

module.exports = app;