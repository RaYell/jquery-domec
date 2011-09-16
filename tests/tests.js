/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, 
regexp: true, strict: true, newcap: true, immed: true, maxerr: 50, indent: 4, maxlen: 120*/
/*global $, document, equals, expect, ok, test*/
/*members attr, attributes, children, click, contentDocument, create, done, events, get, id, insertAfter, length, log, 
name, one, remove, root, tagName, testDone, trigger, text, two*/

$(function () {
	'use strict';
    var testVal, isEmptyOrUndefined;
    
    // hack for html validator (ol cannot be empty)
    $('li').remove();
    
    isEmptyOrUndefined = function (value) {
		return value === '' || value === undefined;
	};
    
    test('Basic element creation', function () {
        expect(8);
        
        var elem = $.create('div');
        
        equals(elem.get(0).tagName, 'DIV', 'Create element (string)');
        elem = $.create(null);
        equals(elem, undefined, 'Create element (null)');
        elem = $.create(undefined);
        equals(elem, undefined, 'Create element (undefined)');
        elem = $.create({one: 'div'});
        equals(elem, undefined, 'Create element (object)');
        elem = $.create(['div']);
        equals(elem, undefined, 'Create element (array)');
        elem = $.create(1);
        equals(elem, undefined, 'Create element (int)');
        elem = $.create(1.2);
        equals(elem, undefined, 'Create element (float)');
        elem = $.create($);
        equals(elem, undefined, 'Create element (boolean)');
    });
    
    test('Attributes', function () {
        expect(10);
        
        var elem = $.create('div', {attributes: {id: 'testId'}});
        
        equals(elem.attr('id'), 'testId', 'Set single attribute');
        elem = $.create('div', {attributes: {id: 'testId', name: 'testName'}});
        equals(elem.attr('id'), 'testId', 'Set multiple attributes. Check id');
        equals(elem.attr('name'), 'testName', 'Set multiple attributes. Check name');
        elem = $.create('div', {attributes: null});
        ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (null)');
        elem = $.create('div', {attributes: ['id: myId']});
        ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (array)');
        elem = $.create('div', {attributes: 'id: myId'});
        ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (string)');
        elem = $.create('div', {attributes: 1});
        ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (int)');
        elem = $.create('div', {attributes: 1.2});
        ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (float)');
        elem = $.create('div', {attributes: true});
        ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (boolean)');
        elem = $.create('div', {attributes: $});
        ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (function)');
    });
    
    test('Event handlers', function () {
        expect(1);
        
        var elem = $.create('div', {events: {
            click: function () {
                testVal = 123;
            }
        }});
        
        elem.trigger('click');
        
        equals(testVal, 123, 'Create element with click event handler');
    });
    
    test('Children', function () {
        expect(11);
        
        var elem = $.create('div', {children: 'testText'});
        
        equals(elem.text(), 'testText', 'Create text node');
        elem = $.create('div', {children: $.create('p')});
        equals(elem.children().get(0).tagName, 'P', 'Create tree with single child (object)');
        elem = $.create('div', {children: [$.create('p')]});
        equals(elem.children().get(0).tagName, 'P', 'Create tree with single child (array)');
        elem = $.create('div', {children: [$.create('p'), $.create('span')]});
        equals(elem.children().get(0).tagName, 'P', 'Create tree with several children. Get first child');
        equals(elem.children().get(1).tagName, 'SPAN', 'Create tree with several children. Get second child');
        elem = $.create('div', {children: null});
        equals(elem.children().length, 0, 'Create element with child nodes (null)');
        elem = $.create('div', {children: {one: $.create('p'), two: $.create('span')}});
        equals(elem.children().length, 0, 'Create element with child nodes (object)');
        elem = $.create('div', {children: 1});
        equals(elem.children().length, 0, 'Create element with child nodes (int)');
        elem = $.create('div', {children: 1.2});
        equals(elem.children().length, 0, 'Create element with child nodes (float)');
        elem = $.create('div', {children: true});
        equals(elem.children().length, 0, 'Create element with child nodes (boolean)');
        elem = $.create('div', {children: $});
        equals(elem.children().length, 0, 'Create element with child nodes (function)');
    });
    
    test('Root element', function () {
        expect(10);
        
        var elem = $.create('div', {root: null});
        
        equals(elem.get(0).tagName, 'DIV', 'Create element with given root (null)');
        elem = $.create('div', {root: undefined});
        equals(elem.get(0).tagName, 'DIV', 'Create element with given root (undefined)');
        elem = $.create('div', {root: document});
        equals(elem.get(0).tagName, 'DIV', 'Create element with given root (object)');
        elem = $.create('div', {root: 1});
        equals(elem, undefined, 'Create element with given root (int)');
        elem = $.create('div', {root: 1.2});
        equals(elem, undefined, 'Create element with given root (float)');
        elem = $.create('div', {root: 'document'});
        equals(elem, undefined, 'Create element with given root (string)');
        elem = $.create('div', {root: true});
        equals(elem, undefined, 'Create element with given root (boolean)');
        elem = $.create('div', {root: []});
        equals(elem, undefined, 'Create element with given root (array)');
        elem = $.create('div', {root: $});
        equals(elem, undefined, 'Create element with given root (function)');
        
        $.create('iframe', {attributes: {id: 'myIframe'}}).insertAfter('#qunit-fixture');
        elem = $.create('div', {root: $('iframe').get(0).contentDocument});
        equals(elem.get(0).tagName, 'DIV', 'Create element in iFrame');
        
        $('iframe#myIframe').remove();
    });
});
