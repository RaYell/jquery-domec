/*jslint indent: 4, maxlen: 120 */
/*global describe, it, document, require, chai, global, $*/
describe('DOMEC', function () {
    'use strict';
    var assert, jsdom, jquery, wind;
    if (typeof require === 'function') {
        assert = require('chai').assert;
        jsdom = require('jsdom');
        jquery = require('jquery');
        wind = jsdom.jsdom("<html><body></body></html>").createWindow();

        global.jQuery = jquery(wind);
        global.document = wind.document;
        global.$ = global.jQuery;
        require('../src/jquery-domec');
    } else {
        assert = chai.assert;
    }

    describe('Element creation', function () {
        it('should create a new div', function () {
            var elem = $.create('div');
            assert.equal(elem.get(0).tagName, 'DIV');
        });
        it('should fail to create element with name as undefined', function () {
            var elem = $.create();
            assert.equal(elem, undefined);
        });
        it('should fail to create element with name as null', function () {
            var elem = $.create(null);
            assert.equal(elem, undefined);
        });
        it('should fail to create element with name as object', function () {
            var elem = $.create({
                one: 'div'
            });
            assert.equal(elem, undefined);
        });
        it('should fail to create element with name as array', function () {
            var elem = $.create(['div']);
            assert.equal(elem, undefined);
        });
        it('should fail to create element with name as int', function () {
            var elem = $.create(1);
            assert.equal(elem, undefined);
        });
        it('should fail to create element with name as number', function () {
            var elem = $.create(1.2);
            assert.equal(elem, undefined);
        });
        it('should fail to create element with name as boolean', function () {
            var elem = $.create(true);
            assert.equal(elem, undefined);
        });
        it('should fail to create element with name as function', function () {
            var elem = $.create(function () {
                return true;
            });
            assert.equal(elem, undefined);
        });
    });
    describe('Attributes', function () {
        it('should create a new div with proper id', function () {
            var elem = $.create('div', {
                attributes: {
                    id: 'testId'
                }
            });
            assert.lengthOf(elem.get(0).attributes, 1);
            assert.equal(elem.attr('id'), 'testId');
        });
        it('should create a new div with several attributes', function () {
            var elem = $.create('div', {
                attributes: {
                    class: 'testClass',
                    name: 'testName'
                }
            });
            assert.lengthOf(elem.get(0).attributes, 2);
            assert.equal(elem.attr('class'), 'testClass', 'Set multiple attributes. Check id');
            assert.equal(elem.attr('name'), 'testName', 'Set multiple attributes. name as Check');
        });
        it('should fail to set attributes given as undefined', function () {
            var elem = $.create('div', {
                attributes: undefined
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
        it('should fail to set attributes given as null', function () {
            var elem = $.create('div', {
                attributes: null
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
        it('should fail to set attributes given as array', function () {
            var elem = $.create('div', {
                attributes: ['myId']
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
        it('should fail to set attributes given as string', function () {
            var elem = $.create('div', {
                attributes: 'myId'
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
        it('should fail to set attributes given as int', function () {
            var elem = $.create('div', {
                attributes: 1
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
        it('should fail to set attributes given as float', function () {
            var elem = $.create('div', {
                attributes: 1.2
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
        it('should fail to set attributes given as boolean', function () {
            var elem = $.create('div', {
                attributes: true
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
        it('should fail to set attributes given as function', function () {
            var elem = $.create('div', {
                attributes: function () {
                    return true;
                }
            });
            assert.lengthOf(elem.get(0).attributes, 0);
        });
    });
    describe('Event handlers', function () {
        it('should create a new div with click event handler', function () {
            var testVal = 0,
                elem = $.create('div', {
                    events: {
                        click: function () {
                            testVal = 123;
                        }
                    }
                });
            elem.trigger('click');
            assert.equal(testVal, 123);
        });
    });
    describe('Nested elements', function () {
        it('should create a new div with text', function () {
            var elem = $.create('div', {
                children: 'testText'
            });
            assert.equal(elem.text(), 'testText');
        });
        it('should create a new div with nested elements', function () {
            var elem = $.create('div', {
                children: $.create('p')
            });
            assert.lengthOf(elem.children(), 1);
            assert.equal(elem.children().get(0).tagName, 'P');

            elem = $.create('div', {
                children: [$.create('p')]
            });
            assert.lengthOf(elem.children(), 1);
            assert.equal(elem.children().get(0).tagName, 'P');

            elem = $.create('div', {
                children: [$.create('p'), $.create('span')]
            });
            assert.lengthOf(elem.children(), 2);
            assert.equal(elem.children().get(0).tagName, 'P');
            assert.equal(elem.children().get(1).tagName, 'SPAN');
        });
        it('should fail to create nested elements given as undefined', function () {
            var elem = $.create('div', {
                children: undefined
            });
            assert.lengthOf(elem.children(), 0);
        });
        it('should fail to create nested elements given as null', function () {
            var elem = $.create('div', {
                children: null
            });
            assert.lengthOf(elem.children(), 0);
        });
        it('should fail to create nested elements given as object', function () {
            var elem = $.create('div', {
                children: {
                    one: $.create('p'),
                    two: $.create('span')
                }
            });
            assert.lengthOf(elem.children(), 0);
        });
        it('should fail to create nested elements given as int', function () {
            var elem = $.create('div', {
                children: 1
            });
            assert.lengthOf(elem.children(), 0);
        });
        it('should fail to create nested elements given as float', function () {
            var elem = $.create('div', {
                children: 1.2
            });
            assert.lengthOf(elem.children(), 0);
        });
        it('should fail to create nested elements given as boolean', function () {
            var elem = $.create('div', {
                children: true
            });
            assert.lengthOf(elem.children(), 0);
        });
        it('should fail to create nested elements given as function', function () {
            var elem = $.create('div', {
                children: function () {
                    return true;
                }
            });
            assert.lengthOf(elem.children(), 0);
        });
    });
    describe('Root element', function () {
        it('should create a new div undefined root', function () {
            var elem = $.create('div', {
                root: undefined
            });
            assert.equal(elem.get(0).tagName, 'DIV');
        });
        it('should create a new div null root', function () {
            var elem = $.create('div', {
                root: null
            });
            assert.equal(elem.get(0).tagName, 'DIV');
        });
        it('should create a new div defined root', function () {
            var elem = $.create('div', {
                root: document
            });
            assert.equal(elem.get(0).tagName, 'DIV');
        });
        it('should fail to create element with root given as int', function () {
            var elem = $.create('div', {
                root: 1
            });
            assert.equal(elem, undefined);
        });
        it('should fail to create element with root given as float', function () {
            var elem = $.create('div', {
                root: 1.2
            });
            assert.equal(elem, undefined);
        });
        it('should fail to create element with root given as string', function () {
            var elem = $.create('div', {
                root: 'document'
            });
            assert.equal(elem, undefined);
        });
        it('should fail to create element with root given as boolean', function () {
            var elem = $.create('div', {
                root: true
            });
            assert.equal(elem, undefined);
        });
        it('should fail to create element with root given as array', function () {
            var elem = $.create('div', {
                root: [document]
            });
            assert.equal(elem, undefined);
        });
        it('should fail to create element with root given as function', function () {
            var elem = $.create('div', {
                root: function () {
                    return true;
                }
            });
            assert.equal(elem, undefined);
        });
    });
});