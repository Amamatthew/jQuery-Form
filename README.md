#jQuery-Form

##USAGE
  
###Save

    $(element).form().save();

Returns a JSON of all input elements, with the following structure 

    {
        ...
        *name* : *value*
        ...
    }
    
For example:
Having the following form

    <form id="myCoolForm">
      <input name="coolTextInput" value="123"></input>
      <input name="anotherInput" value="omgthisiscool"></input>
    </form>
    
Would cause the following js call

    $("#myCoolForm").form().save();
    
To return the following JSON object

    {
        "coolTextInput" : "123",
        "anotherInput" : "omgthisiscool"
    }
    
The returned JSON can be used by the load function
  
###Load

    $(element).form().load(json);

Loads the json into the form. Sets any <INPUT> that has the same name attribute as any of the elements in the JSON object to the respective values.

For example:
Passing the following JSON object as a parameter

    {
      "age" : "17"
    }
    
Would cause the following element
    
    <INPUT name="age">
    
To have its value set to "17"
  
###Clean

    $(element).form().clean();

Cleans the form of all values inserted
  
###Validate

    $(element).form().validate();

Validates the form based on a set of classes that can be applied to the input elements.

Returns false if the form doesn't match any of the specified requirements, otherwise it returns true.

It also applies a "form-error" class on the elements not matching the requirements.

The classes that can be applied are the following:

####form-required   
The input value MUST be set or checked

####form-number
The input value MUST be a number.

####form-email
The input value MUST be an email

####form-same
The input values among elements with the same name MUST be the same

####form-minimum
The input value's length MUST be equal or more than the value in the data-form-minimum attribute
