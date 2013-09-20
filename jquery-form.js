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
		var form = {};
		var elems = $("input:text, select, textarea, input:radio:checked, input:checkbox:checked", ctx);
		
		var firstElement = true;		
		elems.each(function(i, value) {
			var elem = $(this);
		
			var name = elem.attr("name");

			if(name) {
				var val = $(elem).val();
				
				if(val) {
					form[elem.attr("name")] = val;
				} else {
					return;
				}
			}
		});
		
		return form;

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
