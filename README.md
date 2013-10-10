#jQuery-Form

##USAGE
  
###Load

    $(element).form().load(json);

Cleans the form of all values inserted
  
###Save

    $(element).form().save();

Returns a json of all input elements, with the following structure 

    {
        ...
        *name* : *value*
        ...
    }
    
The returned json can be used by the load function
  
###Clean

    $(element).form().clean();

Cleans the form of all values inserted
  
###Validate

    $(element).form().validate();

Validates the form based on a set of classes that can be applied to the input elements.
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

Returns false if the form doesn't match any of the specified requirements, otherwise it returns true.

It also applies a "form-error" class on the elements not matching the requirements.
