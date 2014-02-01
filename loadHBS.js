/*
	READ THE README... IT'S WRITTEN FOR A REASON.  THANKS!!!
*/

(function ($) {
	$.fn.loadHBS = function(conf, callback) {
		if (typeof conf !== 'object') { throw 'Config must be an object'; }	// validate conf object
		if (!conf.template) { throw 'Template parameter required'; }
		if (!conf.data) { throw 'Data parameter required'; }

		var _this 	= $(this),
			_type 	= 'insert',
			_path 	= '',
			_ext 	= '.hbs';

		if (conf.path) { _path = conf.path; }							// set custom path
		if (conf.ext) { _ext = conf.ext; }			// set custom extension
		if (conf.type) { _type = conf.type }

		$.ajax({
			url: _path + conf.template + _ext,
			cache: false,
			success: function (data) {
				var _compile = Handlebars.compile(data),
					_template = _compile(conf.data);

				switch (_type) {
					case 'append':
						_this.append(_template);
						break;

					case 'prepend':
						_this.prepend(_template);
						break;

					default:
						_this.html(_template);
						break;
				}
			},
			complete: typeof callback === 'function' ? callback : false
		});

	};

})( jQuery );


