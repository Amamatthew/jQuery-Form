(function($) {

	// Constructor
	$.fn.form = function() {
		this.load = load(this);
		this.save = save(this);
		this.clear = clear(this);
		this.validate = validate(this);

		return this;
	};

	/*
	 * 
	 * name: save
	 * 
	 * Converts any contained input, select and textarea elements into a json
	 * with the following format { ... [name] : [val] ... } with name being the
	 * input element's name attribute tag.
	 * 
	 * @return json The parsed form.
	 * 
	 */
	function save(ctx) {
		return function() {
			var elems = $("input, select, textarea", ctx);
			var result = "{";

			var firstElement = true;
			elems.each(function(i, value) {
				var elem = $(this);

				var name = elem.attr("name");

				if (name) {
					if (value == "") {
						return; // parseUndefined option?

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

	}

	/*
	 * 
	 * name: load
	 * 
	 * Restores a form to a state specified by a JSON object. Refer to the save
	 * function.
	 * 
	 * @param ctx The html element containing the form to convert.
	 * 
	 */
	function load(ctx) {
		return function(json) {
			$.each(json, function(key, value) {
				$('input[name="' + key + '"], select[name="' + key + '"], textarea[name="' + key + '"]', ctx).val(value);

			});

			return ctx;
		};
	}

	/*
	 * 
	 * name: clear
	 * 
	 * Resets all fields contained in the element to an empty state.
	 * 
	 * @param ctx The html element containing the form to clear
	 * 
	 */
	function clear(ctx) {
		return function() {
			$.each($("input", ctx), function(key, value) {
				$(this).val("");

			});

			return ctx;
		};
	}

	/*
	 * 
	 * name: validate
	 * 
	 * Resets all fields contained in the element to an empty state.
	 * 
	 * @param ctx The html element containing the form to clear
	 * 
	 */
	function validate(ctx) {
		return function(onError) {
			$(".form-error",ctx).removeClass("form-error");
			var isValid = true;

			function callError(elem, errorType) {
				isValid = false;
				$(elem).addClass("form-error");
				if (onError && typeof (onError) == "function") {
					onError(elem, errorType);
				}
			}

			$.each($("input.form-required", ctx), function() {
				if (($(this).attr("type") == "checkbox" && !$(this).is(":checked")) || !$(this).val()) {
					callError(this, "empty");
				}
			});
			$.each($("input.form-number", ctx), function() {
				if (!/^\d+$/.test($(this).val())) {
					callError(this, "number");
				}
			});
			$.each($("input.form-email", ctx), function() {
				if (!/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
						.test($(this).val())) {
					callError(this, "email");
				}
			});
			$.each($("input.form-same", ctx), function() {
				var currElem = this;
				$.each($("[name='" + $(this).attr("name") + "']", ctx), function() {
					if ($(this).val() != $(currElem).val()) {
						callError(currElem, "same");
					}
				});
			});
			$.each($("input.form-minimum", ctx), function() {
				if ($(this).val().length < $(this).data("form-minimum")) {
					callError(this, "minimum");
				}
			});

			return isValid;
		};
	}

}(jQuery));
