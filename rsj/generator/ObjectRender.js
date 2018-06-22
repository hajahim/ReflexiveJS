class ObjectRender {

  generateForm( formProperties ) {
    const hiddenFields = this.hiddenFields;
    let formResult = `<form action="${formProperties.formAction || ""}" method="${formProperties.formMethod}" class="m-form">`;
    const objectProperties = Object.keys( this );
    objectProperties.forEach( property => {
      const fieldName = property.split("").slice( 1, property.length ).join("");
      const isHiddenField = typeof( hiddenFields[ fieldName ] ) !== "undefined";
      const type = isHiddenField ? "hidden" : "text";
      formResult += `<fieldset class="m-form__field">
        <label class="m-form__label">${fieldName || ""} : </label>
        <input type="${type}" name="${fieldName || ""}" value="${this[property] || ""}" class="m-form__input" />
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