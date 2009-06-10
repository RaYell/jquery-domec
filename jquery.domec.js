/**
 * jQuery DOMEC (DOM Elements Creator) 1.1.0
 * http://code.google.com/p/jquery-domec
 * http://plugins.jquery.com/project/DOMEC
 *
 * Copyright (c) 2008-2009 Lukasz Rajchel (lukasz@rajchel.pl | http://lukasz.rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation	:	http://code.google.com/p/jquery-domec/wiki/Documentation
 * Changelog:		:	http://code.google.com/p/jquery-domec/wiki/Changelog
 */
 
/*global document, jQuery*/
(function ($) {

	// DOMEC Core class
	($.domecCore = function () {
		var typeOf, create;
		
		// returns type of value
		typeOf = function (value) {
			var type = typeof value;
			if (type === 'object') {
				if (value === null) {
					type = 'null';
				} else if (typeof value.length === 'number' && 
					typeof value.splice === 'function' &&
					!(value.propertyIsEnumerable('length'))) {
					type = 'array';
				}
				
			}
			return type;
		};
		
		// create new element
		create = function (element, attributes, children, root) {
			// define variables
			var key, i, elem;
			
			// set default root if undefined
			if (root === undefined || root === null) {
				root = document;
			}
			
			if (typeOf(root) !== 'object') {
				return undefined;
			}
			
			//create new element
			if (typeOf(element) === 'string') {
				elem = $(root.createElement(element));
				
				// add passed attributes
				if (typeOf(attributes) === 'object') {
					for (key in attributes) {
						if (typeOf(attributes[key]) === 'string') {
							elem.attr(key, attributes[key]);
						}
					}
				}
				
				// add passed child elements
				if (children !== undefined && children !== null) {
					if (typeOf(children) === 'array') {
						for (i = 0; i < children.length; i += 1) {
							elem.append(children[i]);
						}
					} else if (typeOf(children) === 'object') {
						elem.append(children);
					} else {
						elem.text(children.toString());
					}
				}
			}

			return elem;
		};
		
		// DOMEC public members
		return {
			create	: create
		};
	}());

 	// register jQuery extension
	$.extend({
		create: $.domecCore.create
	});

}(jQuery));