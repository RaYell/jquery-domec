/**
 * jQuery DOMEC (DOM Elements Creator) 1.0.2
 * http://code.google.com/p/jquery-domec
 *
 * Copyright (c) 2008-2009 Lukasz Rajchel (lukasz@rajchel.pl | http://lukasz.rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation	:	http://code.google.com/p/jquery-domec/wiki/Documentation
 * Changelog		:	http://code.google.com/p/jquery-domec/wiki/Changelog
 */

/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, 
bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 50, indent: 4 */
/*global document, jQuery*/
/*members DOMEC, addAttributes, addChildren, append, attr, create, createElement , extend, isArray,
length, propertyIsEnumerable, splice, text, toString*/
"use strict";
(function ($) {

	// DOMEC Core class
	$.DOMEC = (function () {
		// variables declaration
		// DOM element
		var Element = (function () {
			return {
				// create element
				create: function (name, root) {
					// set default root if undefined
					if (root === undefined || root === null) {
						root = document;
					}

					if (typeof root === 'object' && !$.isArray(root) && 
						typeof name === 'string') {
						return $(root.createElement(name));
					}

					return undefined;
				},
				// add attributes
				addAttributes: function (elem, attributes) {
					if (typeof attributes === 'object' && !$.isArray(attributes)) {
						for (var key in attributes) {
							if (typeof attributes[key] === 'string' || 
								typeof attributes[key] === 'number') {
								elem.attr(key, attributes[key]);
							}
						}
					}
				},
				// add child elements
				addChildren: function (elem, children) {
					if (children !== undefined && children !== null) {
						if ($.isArray(children)) {
							for (var i = 0; i < children.length; i += 1) {
								elem.append(children[i]);
							}
						} else if (typeof children === 'object') {
							elem.append(children);
						} else {
							elem.text(children.toString());
						}
					}
				}
			};
		}());

		// DOMEC public members
		return {
			create: function (name, attributes, children, root) {
				var elem = Element.create(name, root);

				if (elem !== undefined) {
					Element.addAttributes(elem, attributes);
					Element.addChildren(elem, children);
				}

				return elem;
			}
		};
	}());

 	// register jQuery extension
	$.extend({
		create: $.DOMEC.create
	});

}(jQuery));