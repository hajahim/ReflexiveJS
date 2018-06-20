class ObjectRender {

  generateForm( formProperties ) {
    let formResult = `<form action="${formProperties.formAction || ""}" method="${formProperties.formMethod}" class="m-form">`;
    const objectProperties = Object.keys( this );
    objectProperties.forEach( property => {
      const fieldName = property.split("").slice( 1, property.length ).join("");
      formResult += `<fieldset class="m-form__field">
        <label class="m-form__label">${fieldName || ""} : </label>
        <input type="text" name="${fieldName || ""}" value="${this[property] || ""}" class="m-form__input" />
      </fieldset>`;
    });
    formResult += `<p>
        <input type="submit" value="${formProperties.formTextSubmit || ""}" />
      </p>
    </form>`;
    return formResult;

  }

  generateList( currentObject ) {
    
  }

}

module.exports = ObjectRender;