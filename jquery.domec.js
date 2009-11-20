/**
 * jQuery DOMEC (DOM Elements Creator) 1.0.2
 * http://code.google.com/p/jquery-domec
 *
 * Copyright (c) 2008-2009 Lukasz Rajchel (lukasz@rajchel.pl | http://lukasz.rajchel.pl)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Documentation    :    http://code.google.com/p/jquery-domec/wiki/Documentation
 * Changelog        :    http://code.google.com/p/jquery-domec/wiki/Changelog
 */

/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, 
bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 50, indent: 4 */
/*global document, jQuery*/
/*members DOMEC, addAttributes, addChildren, append, attr, create, createElement, each, extend, 
isArray, length, text, toString*/
'use strict';
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
                addAttributes: function (elem, attr) {
                    if (typeof attr === 'object' && attr !== null && !$.isArray(attr)) {
                        $.each(attr, function (key, val) {
                            if (typeof val === 'string' || typeof val === 'number') {
                                elem.attr(key, val);
                            }
                        });
                    }
                },
                
                // add child elements
                addChildren: function (elem, children) {
                    if (children !== undefined && children !== null) {
                        if ($.isArray(children)) {
                            $.each(children, function () {
                                elem.append(this);
                            });
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