/*global $,document,module,test,ok,same*/
$(document).ready(function () {
	// hack for html validator (ol cannot be empty)
	$('li').remove();
	
	var elem;
	
	test("Basic element creation", function () {
		var elem = $.create('div');
		same(elem.get(0).tagName, "DIV", "We expect DIV element to be created");
	});
	
	test("Attributes", function () {
		elem = $.create('div', {id: 'myId'});
		same(elem.attr('id'), "myId", "(Single attribute) We expect element's identifier of myId");
		elem = $.create('div', {id: 'myId', name: 'myName'});
		same(elem.attr('id'), "myId", "(Multiple attributes) We expect element's identifier of myId");
		same(elem.attr('name'), "myName", "(Multiple attributes) We expect element's name of myName");
		elem = $.create('div', 'id: myId');
		ok(elem.attr('id') === "", "We expect malformed attributes parameter to be ignored");
	});
	
	test("Children", function () {
		elem = $.create('div', null, 'myText');
		same(elem.text(), "myText", "We expect element's text to be set to myText");
		elem = $.create('div', null, $.create('p'));
		same(elem.children().get(0).tagName, "P", "(Single child) We expect element to have P child element");
		elem = $.create('div', null, [$.create('p'), $.create('span')]);
		same(elem.children('p').get(0).tagName, "P", "(Multiple child) We expect element to have P child element");
		same(elem.children('span').get(0).tagName, "SPAN", "(Multiple child) We expect element to have SPAN child element");
		elem = $.create('div', null, {one: $.create('p'), two: $.create('span')});
		ok(elem.children().length === 0, "We expect malformed children parameter to be ignored (object)");
		elem = $.create('div', null, 1);
		ok(elem.children().length === 0, "We expect malformed children parameter to be ignored (int)");
	});
	
	test("Root element", function () {
		var iFrame = $.create('iframe', {id: 'myIframe'}).insertAfter('#main');
		elem = $.create('div', null, null, $('iframe').get(0).contentDocument);
		same(elem.get(0).tagName, "DIV", "We expect DIV element to be created");
		$('iframe#myIframe').remove();
	});
});