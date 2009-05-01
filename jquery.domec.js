/**
 * jQuery DOMEC (DOM Elements Creator) 1.0.0RC
 * http://code.google.com/p/jquery-domec
 * http://plugins.jquery.com/project/DOMEC
 *
 * Copyright (c) 2008 Lukasz Rajchel (lukasz@rajchel.pl | http://lukasz.rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation	:	http://code.google.com/p/jquery-domec/wiki/Documentation
 * Changelog:		:	http://code.google.com/p/jquery-domec/wiki/Changelog
 */
 
 /*global document, jQuery*/
(function ($) {

 	// register jQuery extension
	$.extend({
		create: function (element, attributes, children, root) {

			if (typeof(root) === 'undefined') {
				root = document;
			}

			// define variables
			var key, i, elem;
			
			//create new element
			elem = $(root.createElement(element));

			// add passed attributes
			if (typeof(attributes) === 'object') {
				for (key in attributes) {
					if (typeof(attributes[key]) === 'string') {
						elem.attr(key, attributes[key]);
					}
				}
			}

			// add passed child elements
			if (children !== null) {
				if (typeof(children) === 'object') {
					for (i = 0; i < children.length; i += 1) {
						elem.append(children[i]);
					}
				} else if (typeof(children) !== 'undefined') {
					elem.text(children.toString());
				}
			}

			return elem;
		}
	});

})(jQuery);