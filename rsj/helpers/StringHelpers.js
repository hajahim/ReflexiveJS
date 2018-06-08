class StringHelpers {

  static replacePlaceholder( string, arrayToReplace ) {
    if ( typeof string === "string" && ( arrayToReplace instanceof Array ) ) {
      return string.replace( /({\d})/g, function( i ) {
        return arrayToReplace[i.replace(/{/, '').replace(/}/, '')];
      });
    } else if ( typeof string === "string" && ( arrayToReplace instanceof Object ) ) {
      for ( let key in arrayToReplace ) {
        return string.replace( /({([^}]+)})/g, function( i ) {
          let key = i.replace( /{/, "" ).replace( /}/, "" );
          if ( !arrayToReplace[key] )
            return i;
          return arrayToReplace[key];
        });
      }
    } else {
      return false;
    }
  }

}

module.exports = StringHelpers;