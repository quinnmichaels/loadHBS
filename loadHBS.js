/*
SUMMARY:
	loadJBS is a JavaScript library for loading handlebars templates in to a jQuery selector.

AUTHOR:
	Quinn Michaels

REQUIRES:
	-jQuery				//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
	-Handlebars			//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.js

CONSTANTS:

	_path		DEFAULT: ''		ROOT PATH TO HANDLEBARS TEMPLATES
	_extension	DEFAULT: .hbs	FILE EXTENSION OF YOUR HANDLEBARS TEMPLATES.

	***********************************************************************
	Constants can be set at time of loading or set in the conf object:
	***********************************************************************
	USAGE EXAMPLE:
		loadHBS._path = '/custom/path/';
		loadHBS._extension = '.handlebars';
		loadHBS.template({*conf object*})
	***********************************************************************

CONF OBJECT:

	type:		insert | append | prepend

	selector: 	SELECTOR OF OBJECT TO INSERT TEMPLATE INTO

	template: 	NAME OF TEMPLATE TO LOAD.  DO NOT INCLUDE THE EXTENSION.
				THIS METHOD CAN ALSO CALL SUB-DIRECTORIES IE: /views/main OR /views/detail.

	data:		JSON FORMATTED DATA BEING PASSED INTO THE TEMPLATE

	path:		*OPTIONAL		USED TO SET A CUSTOM PATH

	extension:	*OPTIONAL		USED TO SET A CUSTOM EXTENSION

	callback:	CALLBACK FUNCTION TO RUN ONCE THE TEMPLATE HAS LOADED.  THIS IS WHERE
				YOU INITIATE EVENT HANDLERS THAT MIGHT BE ASSOCIATED WITH A SPECIFIC TEMPLATE.

	***********************************************************************
	USAGE EXAMPLE
		loadHBS.template({
	     	selector: '%CSS SELECTOR%',
	     	template: '%TEMPLATE NAME%',
	     	data: {
			 	title: '%HANDLEBARS TITLE%',
			 	text: '%HANDLEBARS TEXT%'
	     	},
	     	type: 'insert|append|prepend',
	     	callback: function() {
		     	// template has loaded and you can inset your event handlers
	     	}
		});
	***********************************************************************
*/


var loadHBS = {
	_path: '',
	_extension: '.hbs',
	template: function(conf) {
		if (typeof conf !== 'object') throw 'Config must be an object';	// validate conf object
		if (conf.path) this._path = conf.path;							// set custom path
		if (conf.extension) this._extension = conf.extension;			// set custom extension


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
