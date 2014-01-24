/*
	READ THE README... IT'S WRITTEN FOR A REASON.  THANKS!!!
*/


var loadHBS = {
	_path: '',
	_extension: '.hbs',
	template: function(conf) {
		if (typeof conf !== 'object') { throw 'Config must be an object'; }	// validate conf object
		if (conf.path) { this._path = conf.path; }							// set custom path
		if (conf.extension) { this._extension = conf.extension; }			// set custom extension

		$.ajax({
			url: this._path + conf.template + this._extension,
			cache: false,
			success: function (data) {
				var _s = $(conf.selector),
					_compile = Handlebars.compile(data),
					_template = _compile(conf.data);

				switch (conf.type) {
					case 'append':
						_s.append(_template);
						break;

					case 'prepend':
						_s.prepend(_template);
						break;

					default:
						_s.html(_template);
						break;
				}
			},
			complete: typeof conf.callback === 'function' ? conf.callback : false
		});
	}
};
