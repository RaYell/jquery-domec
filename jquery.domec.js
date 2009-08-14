/**
 * jQuery DOMEC (DOM Elements Creator) 1.0.1
 * http://code.google.com/p/jquery-domec
 *
 * Copyright (c) 2008-2009 Lukasz Rajchel (lukasz@rajchel.pl | http://lukasz.rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation	:	http://code.google.com/p/jquery-domec/wiki/Documentation
 * Changelog		:	http://code.google.com/p/jquery-domec/wiki/Changelog
 */

/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, 
plusplus: true, regexp: true, undef: true, white: true, indent: 4 */
/*global document, jQuery*/
/*members DOMEC, addAttributes, addChildren, append, attr, create, createElement, extend, 
hasOwnProperty, indexOf, length, propertyIsEnumerable, prototype, registerIndexOf, splice, text, 
toString*/
(function ($) {

	$.DOMEC = (function () {
		var typeOf, Element, Hacks;

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
		
		Hacks = (function () {
			return {
				registerIndexOf: function () {
					if (Array.prototype.indexOf === undefined) {
						Array.prototype.indexOf = function (object) {
							for (var i = 0; i < this.length; i += 1) {
								if (this[i] === object) {
									return i;
								}
							}
							return -1;
						};
					}
				}
			};
		}());

		Element = (function () {
			return {
				create: function (name, root) {
					if (root === undefined || root === null) {
						root = document;
					}

					if (typeOf(root) === 'object' && typeOf(name) === 'string') {
						return $(root.createElement(name));
					}

					return undefined;
				},
				
				addAttributes: function (elem, attributes) {
					var key, item;
					if (typeOf(attributes) === 'object') {
						for (key in attributes) {
							if (attributes.hasOwnProperty(key)) {
								item = attributes[key];
								if (['string', 'number'].indexOf(typeOf(item)) !== -1) {
									elem.attr(key, item);
								}
							}
						}
					}
				},
				
				addChildren: function (elem, children) {
					if (children !== undefined && children !== null) {
						var type = typeOf(children), length, i;
						if (type === 'array') {
							length = children.length;
							for (i = 0; i < length; i += 1) {
								elem.append(children[i]);
							}
						} else if (type === 'object') {
							elem.append(children);
						} else {
							elem.text(children.toString());
						}
					}
				}
			};
		}());

		return {
			create: function (name, attributes, children, root) {
				Hacks.registerIndexOf();
				
				var elem = Element.create(name, root);

				if (elem !== undefined) {
					Element.addAttributes(elem, attributes);
					Element.addChildren(elem, children);
				}

				return elem;
			}
		};
	}());

 	$.extend({
		create: $.DOMEC.create
	});

}(jQuery));