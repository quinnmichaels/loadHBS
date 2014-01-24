/*
		CONF OBJECT

			type:		append | prepend | insert/default

			selector: 	SELECTOR OF OBJECT TO INSERT TEMPLATE INTO

			template: 	NAME OF TEMPLATE TO LOAD.  DO NOT INCLUDE THE EXTENSION.
						THIS METHOD CAN ALSO CALL SUB-DIRECTORIES IE: /views/main OR /views/detail.

			data:		JSON FORMATTED DATA BEING PASSED INTO THE TEMPLATE


			callback:	CALLBACK FUNCTION TO RUN ONCE THE TEMPLATE HAS LOADED.  THIS IS WHERE
						YOU INITIATE EVENT HANDLERS THAT MIGHT BE ASSOCIATED WITH A SPECIFIC TEMPLATE.

*/


var loadHBS = {
	_path: '',
	_extension: '.hbs',
	template: function(conf) {
		// VALIDATES THE CONF PARAMATER IS AN OBJECT
		if (typeof conf !== 'object') throw 'Config must be an object';

		$.ajax({
			url: this._path + conf.template + this._extension,
			cache: false,
			success: function (data) {
				var _s = $(conf.selector),
					_compile = Handlebars.compile(data),
					_template = _compile(conf.data);


				console.log(_template);
				switch (conf.type) {
					case 'append':
						_s.append(_template);
						break;

					case 'prepend':
						_s.prepend(_template);
						break;

					case 'insert':
					default:
						_s.html(_template);
						break;
				}
			},
			complete: typeof conf.callback === 'function' ? conf.callback : false
		});
	}
}
