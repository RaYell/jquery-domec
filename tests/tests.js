/*global $,document,module,test,ok,same*/
/*members attr, children, contentDocument, create, get, id, insertAfter, length, name, one, ready, 
remove, tagName, text, two*/
$(document).ready(function () {
	// hack for html validator (ol cannot be empty)
	$('li').remove();
	
	var elem;
	
	test("Basic element creation", function () {
		elem = $.create('div');
		ok(elem.get(0).tagName === "DIV", "We expect DIV element to be created");
		elem = $.create(null);
		ok(elem === undefined, "We expect malformed element parameter to be ignored (null)");
		elem = $.create(undefined);
		ok(elem === undefined, "We expect malformed element parameter to be ignored (undefined)");
		elem = $.create({one: 'div'});
		ok(elem === undefined, "We expect malformed element parameter to be ignored (object)");
		elem = $.create(['div']);
		ok(elem === undefined, "We expect malformed element parameter to be ignored (array)");
		elem = $.create(10);
		ok(elem === undefined, "We expect malformed element parameter to be ignored (number)");
		elem = $.create(true);
		ok(elem === undefined, "We expect malformed element parameter to be ignored (boolean)");
	});
	
	test("Attributes", function () {
		elem = $.create('div', {id: 'myId'});
		ok(elem.attr('id') === "myId", "(Single attribute) We expect element's identifier of myId");
		elem = $.create('div', {id: 'myId', name: 'myName'});
		ok(elem.attr('id') === "myId", 
            "(Multiple attributes) We expect element's identifier of myId");
		ok(elem.attr('name') === "myName", 
            "(Multiple attributes) We expect element's name of myName");
		elem = $.create('div', null);
		ok(elem.attr('id') === "", "We expect null attributes parameter to be ignored");
		elem = $.create('div', ['id: myId']);
		ok(elem.attr('id') === "", 
            "We expect malformed attributes parameter to be ignored (array)");
		elem = $.create('div', 'id: myId');
		ok(elem.attr('id') === "", 
            "We expect malformed attributes parameter to be ignored (string)");
		elem = $.create('div', 10);
		ok(elem.attr('id') === "", 
            "We expect malformed attributes parameter to be ignored (number)");
		elem = $.create('div', true);
		ok(elem.attr('id') === "", 
            "We expect malformed attributes parameter to be ignored (boolean)");
	});
	
	test("Children", function () {
		elem = $.create('div', null, 'myText');
		ok(elem.text() === "myText", "We expect element's text to be set to myText");
		elem = $.create('div', null, $.create('p'));
		ok(elem.children().get(0).tagName === "P", 
            "(Single child) We expect element to have P child element");
		elem = $.create('div', null, [$.create('p')]);
		ok(elem.children().get(0).tagName === "P", 
            "(Single child - array parameter) We expect element to have P child element");
		elem = $.create('div', null, [$.create('p'), $.create('span')]);
		ok(elem.children('p').get(0).tagName === "P", 
            "(Multiple child) We expect element to have P child element");
		ok(elem.children('span').get(0).tagName === "SPAN", 
            "(Multiple child) We expect element to have SPAN child element");
		elem = $.create('div', null, null);
		ok(elem.children().length === 0, "We expect null children parameter to be ignored");
		elem = $.create('div', null, {one: $.create('p'), two: $.create('span')});
		ok(elem.children().length === 0, 
            "We expect malformed children parameter to be ignored (object)");
		elem = $.create('div', null, 1);
		ok(elem.children().length === 0, 
            "We expect malformed children parameter to be ignored (number)");
		elem = $.create('div', null, true);
		ok(elem.children().length === 0, 
            "We expect malformed children parameter to be ignored (boolean)");
	});
	
	test("Root element", function () {
		elem = $.create('div', null, null, null);
		ok(elem.get(0).tagName === "DIV", "We expect DIV element to be created (null root)");
		elem = $.create('div', null, null, undefined);
		ok(elem.get(0).tagName === "DIV", "We expect DIV element to be created (undefined root)");
		elem = $.create('div', null, null, 10);
		ok(elem === undefined, "We expect malformed root parameter to be ignored (number)");
		elem = $.create('div', null, null, "document");
		ok(elem === undefined, "We expect malformed root parameter to be ignored (string)");
		elem = $.create('div', null, null, true);
		ok(elem === undefined, "We expect malformed root parameter to be ignored (boolean)");
		elem = $.create('div', null, null, [1]);
		ok(elem === undefined, "We expect malformed root parameter to be ignored (array)");
		
		$.create('iframe', {id: 'myIframe'}).insertAfter('#main');
		elem = $.create('div', null, null, $('iframe').get(0).contentDocument);
		ok(elem.get(0).tagName === "DIV", "We expect DIV element to be created");
		$('iframe#myIframe').remove();
	});
});
