( function( $ ) {
	
	//Constructor	
	$.fn.form = function(json) {
		if(json) {
			return load(this, json);

		} else {
			return save(this);

		}

	};
	
	/*
	* 
	* name: save
	* 
	* Converts any contained input, select and textarea elements into a json with the following format
	{
		...
		[name] : [val]
		...
	}
	* with name being the input element's name attribute tag.
	* 
	* @return json The parsed form.
	* 
	*/
	function save(ctx) {
		var elems = $("input, select, textarea", ctx);
		var result = "{";
		
		var firstElement = true;		
		elems.each(function(i, value) {
			var elem = $(this);
		
			var name = elem.attr("name");
	

			if(name) {
				if (value == "") {
					return; //parseUndefined option?

				}
			
				if (firstElement) {
					firstElement = false;

				} else {
					result += ",";

				}

				var str = '"' + elem.attr("name") + '" : "' + $(value).val() + '"';
				result += str;

			}

		});
		
		result += "}";
		return $.parseJSON(result);

	};
	
	/*
	* 
	* name: load
	* 
	* Restores a form to a state specified by a JSON object.
	* Refer to the save function.
	* 
	* @param selector The html element containing the form to convert.
	* 
	*/
	function load(ctx, json) {
		$.each(json, function(key, value) {
			$('input[name="' + key + '"], select[name="' + key + '"], textarea[name="' + key + '"]', ctx).val(value);

		});

	}
} (jQuery) );
