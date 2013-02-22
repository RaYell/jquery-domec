/*jslint indent: 4, maxlen: 120 */
/*global $, document, equal, expect, ok, test*/
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
        equal(elem.get(0).tagName, 'DIV', 'Create element (string)');
        elem = $.create(null);
        equal(elem, undefined, 'Create element (null)');
        elem = $.create(undefined);
        equal(elem, undefined, 'Create element (undefined)');
        elem = $.create({one: 'div'});
        equal(elem, undefined, 'Create element (object)');
        elem = $.create(['div']);
        equal(elem, undefined, 'Create element (array)');
        elem = $.create(1);
        equal(elem, undefined, 'Create element (int)');
        elem = $.create(1.2);
        equal(elem, undefined, 'Create element (float)');
        elem = $.create($);
        equal(elem, undefined, 'Create element (boolean)');
    });

    test('Attributes', function () {
        expect(10);
        var elem = $.create('div', {attributes: {id: 'testId'}});
        equal(elem.attr('id'), 'testId', 'Set single attribute');
        elem = $.create('div', {attributes: {id: 'testId', name: 'testName'}});
        equal(elem.attr('id'), 'testId', 'Set multiple attributes. Check id');
        equal(elem.attr('name'), 'testName', 'Set multiple attributes. Check name');
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
        equal(testVal, 123, 'Create element with click event handler');
    });

    test('Children', function () {
        expect(11);
        var elem = $.create('div', {children: 'testText'});
        equal(elem.text(), 'testText', 'Create text node');
        elem = $.create('div', {children: $.create('p')});
        equal(elem.children().get(0).tagName, 'P', 'Create tree with single child (object)');
        elem = $.create('div', {children: [$.create('p')]});
        equal(elem.children().get(0).tagName, 'P', 'Create tree with single child (array)');
        elem = $.create('div', {children: [$.create('p'), $.create('span')]});
        equal(elem.children().get(0).tagName, 'P', 'Create tree with several children. Get first child');
        equal(elem.children().get(1).tagName, 'SPAN', 'Create tree with several children. Get second child');
        elem = $.create('div', {children: null});
        equal(elem.children().length, 0, 'Create element with child nodes (null)');
        elem = $.create('div', {children: {one: $.create('p'), two: $.create('span')}});
        equal(elem.children().length, 0, 'Create element with child nodes (object)');
        elem = $.create('div', {children: 1});
        equal(elem.children().length, 0, 'Create element with child nodes (int)');
        elem = $.create('div', {children: 1.2});
        equal(elem.children().length, 0, 'Create element with child nodes (float)');
        elem = $.create('div', {children: true});
        equal(elem.children().length, 0, 'Create element with child nodes (boolean)');
        elem = $.create('div', {children: $});
        equal(elem.children().length, 0, 'Create element with child nodes (function)');
    });
    test('Root element', function () {
        expect(10);
        var elem = $.create('div', {root: null});
        equal(elem.get(0).tagName, 'DIV', 'Create element with given root (null)');
        elem = $.create('div', {root: undefined});
        equal(elem.get(0).tagName, 'DIV', 'Create element with given root (undefined)');
        elem = $.create('div', {root: document});
        equal(elem.get(0).tagName, 'DIV', 'Create element with given root (object)');
        elem = $.create('div', {root: 1});
        equal(elem, undefined, 'Create element with given root (int)');
        elem = $.create('div', {root: 1.2});
        equal(elem, undefined, 'Create element with given root (float)');
        elem = $.create('div', {root: 'document'});
        equal(elem, undefined, 'Create element with given root (string)');
        elem = $.create('div', {root: true});
        equal(elem, undefined, 'Create element with given root (boolean)');
        elem = $.create('div', {root: []});
        equal(elem, undefined, 'Create element with given root (array)');
        elem = $.create('div', {root: $});
        equal(elem, undefined, 'Create element with given root (function)');
        elem = $.create('div', {root: $('iframe').get(0).contentDocument});
        equal(elem.get(0).tagName, 'DIV', 'Create element in iFrame');
    });
});
