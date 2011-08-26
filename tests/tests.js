/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, 
regexp: true, strict: true, newcap: true, immed: true, maxerr: 50, indent: 4, maxlen: 120*/
/*global $, jqUnit, document*/
/*members attr, attributes, children, click, contentDocument, create, done, equals, events, expect, get, id, 
insertAfter, length, log, name, ok, one, remove, root, tagName, testDone, trigger, text, two*/
$(function () {
	'use strict';
    var testVal, isEmptyOrUndefined;
    
    // hack for html validator (ol cannot be empty)
    $('li').remove();
    
    isEmptyOrUndefined = function (value) {
		return value === '' || value === undefined;
	};
    
    jqUnit.test('Basic element creation', function () {
        jqUnit.expect(8);
        
        var elem = $.create('div');
        
        jqUnit.equals(elem.get(0).tagName, 'DIV', 'Create element (string)');
        elem = $.create(null);
        jqUnit.equals(elem, undefined, 'Create element (null)');
        elem = $.create(undefined);
        jqUnit.equals(elem, undefined, 'Create element (undefined)');
        elem = $.create({one: 'div'});
        jqUnit.equals(elem, undefined, 'Create element (object)');
        elem = $.create(['div']);
        jqUnit.equals(elem, undefined, 'Create element (array)');
        elem = $.create(1);
        jqUnit.equals(elem, undefined, 'Create element (int)');
        elem = $.create(1.2);
        jqUnit.equals(elem, undefined, 'Create element (float)');
        elem = $.create($);
        jqUnit.equals(elem, undefined, 'Create element (boolean)');
    });
    
    jqUnit.test('Attributes', function () {
        jqUnit.expect(10);
        
        var elem = $.create('div', {attributes: {id: 'testId'}});
        
        jqUnit.equals(elem.attr('id'), 'testId', 'Set single attribute');
        elem = $.create('div', {attributes: {id: 'testId', name: 'testName'}});
        jqUnit.equals(elem.attr('id'), 'testId', 'Set multiple attributes. Check id');
        jqUnit.equals(elem.attr('name'), 'testName', 'Set multiple attributes. Check name');
        elem = $.create('div', {attributes: null});
        jqUnit.ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (null)');
        elem = $.create('div', {attributes: ['id: myId']});
        jqUnit.ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (array)');
        elem = $.create('div', {attributes: 'id: myId'});
        jqUnit.ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (string)');
        elem = $.create('div', {attributes: 1});
        jqUnit.ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (int)');
        elem = $.create('div', {attributes: 1.2});
        jqUnit.ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (float)');
        elem = $.create('div', {attributes: true});
        jqUnit.ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (boolean)');
        elem = $.create('div', {attributes: $});
        jqUnit.ok(isEmptyOrUndefined(elem.attr('id')), 'Set attribute (function)');
    });
    
    jqUnit.test('Event handlers', function () {
        jqUnit.expect(1);
        
        var elem = $.create('div', {events: {
            click: function () {
                testVal = 123;
            }
        }});
        
        elem.trigger('click');
        
        jqUnit.equals(testVal, 123, 'Create element with click event handler');
    });
    
    jqUnit.test('Children', function () {
        jqUnit.expect(11);
        
        var elem = $.create('div', {children: 'testText'});
        
        jqUnit.equals(elem.text(), 'testText', 'Create text node');
        elem = $.create('div', {children: $.create('p')});
        jqUnit.equals(elem.children().get(0).tagName, 'P', 'Create tree with single child (object)');
        elem = $.create('div', {children: [$.create('p')]});
        jqUnit.equals(elem.children().get(0).tagName, 'P', 'Create tree with single child (array)');
        elem = $.create('div', {children: [$.create('p'), $.create('span')]});
        jqUnit.equals(elem.children().get(0).tagName, 'P', 'Create tree with several children. Get first child');
        jqUnit.equals(elem.children().get(1).tagName, 'SPAN', 'Create tree with several children. Get second child');
        elem = $.create('div', {children: null});
        jqUnit.equals(elem.children().length, 0, 'Create element with child nodes (null)');
        elem = $.create('div', {children: {one: $.create('p'), two: $.create('span')}});
        jqUnit.equals(elem.children().length, 0, 'Create element with child nodes (object)');
        elem = $.create('div', {children: 1});
        jqUnit.equals(elem.children().length, 0, 'Create element with child nodes (int)');
        elem = $.create('div', {children: 1.2});
        jqUnit.equals(elem.children().length, 0, 'Create element with child nodes (float)');
        elem = $.create('div', {children: true});
        jqUnit.equals(elem.children().length, 0, 'Create element with child nodes (boolean)');
        elem = $.create('div', {children: $});
        jqUnit.equals(elem.children().length, 0, 'Create element with child nodes (function)');
    });
    
    jqUnit.test('Root element', function () {
        jqUnit.expect(10);
        
        var elem = $.create('div', {root: null});
        
        jqUnit.equals(elem.get(0).tagName, 'DIV', 'Create element with given root (null)');
        elem = $.create('div', {root: undefined});
        jqUnit.equals(elem.get(0).tagName, 'DIV', 'Create element with given root (undefined)');
        elem = $.create('div', {root: document});
        jqUnit.equals(elem.get(0).tagName, 'DIV', 'Create element with given root (object)');
        elem = $.create('div', {root: 1});
        jqUnit.equals(elem, undefined, 'Create element with given root (int)');
        elem = $.create('div', {root: 1.2});
        jqUnit.equals(elem, undefined, 'Create element with given root (float)');
        elem = $.create('div', {root: 'document'});
        jqUnit.equals(elem, undefined, 'Create element with given root (string)');
        elem = $.create('div', {root: true});
        jqUnit.equals(elem, undefined, 'Create element with given root (boolean)');
        elem = $.create('div', {root: []});
        jqUnit.equals(elem, undefined, 'Create element with given root (array)');
        elem = $.create('div', {root: $});
        jqUnit.equals(elem, undefined, 'Create element with given root (function)');
        
        $.create('iframe', {attributes: {id: 'myIframe'}}).insertAfter('#main');
        elem = $.create('div', {root: $('iframe').get(0).contentDocument});
        jqUnit.equals(elem.get(0).tagName, 'DIV', 'Create element in iFrame');
        
        $('iframe#myIframe').remove();
    });
});
