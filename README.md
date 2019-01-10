# This project is no longer maintained!

[![Bower version](https://badge.fury.io/bo/jquery-domec.svg)](http://badge.fury.io/bo/jquery-domec)
[![Build Status](https://travis-ci.org/RaYell/jquery-domec.svg?branch=master)](https://travis-ci.org/RaYell/jquery-domec)
[![Coverage Status](https://coveralls.io/repos/RaYell/jquery-domec/badge.png?branch=master)](https://coveralls.io/r/RaYell/jquery-domec?branch=master)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Dependencies](https://david-dm.org/RaYell/jquery-domec.svg)](https://david-dm.org/RaYell/jquery-domec/)
[![Dev Dependencies](https://david-dm.org/RaYell/jquery-domec/dev-status.svg)](https://david-dm.org/RaYell/jquery-domec#info=devDependencies)

#### Requirements

jQuery library is required to use this extension. It can be downloaded from [jQuery Web Page](http://jquery.com).

#### Setup

Install the library using Bower

```
bower install jquery-domec --save
```

Import plugin file after importing the jQuery library.

```html
<script src="bower_components/jquery-domec/dist/jquery-domec.min.js"></script>
```


#### Syntax
```javascript
$.create(name[, options]);
```

##### Parameters
| **Type** | **Name** | **Description** | **Default value** |
| -------- | -------- | --------------- | ----------------- |
| ```string``` | ```name``` | name of the element to create | |
| ```object``` | ```options``` | element options | ```{}``` |

##### Options
| **Type** | **Name** | **Description** | **Default value** |
| -------- | -------- | --------------- | ----------------- |
| ```object``` | ```attributes``` | element properties to be set | ```{}``` |
| ```object``` | ```events```     | event handlers to be bind with created element, object keys should be strings matching event names and values should be valid event handlers (functions) | ```{}``` |
| ```string/array``` | ```children```   | child elements (could also contain text value), passed value will be cast to ```string``` type if it's not of ```object``` type | ```''``` |
| ```object``` | ```root``` | document root element on which new DOM elements should be created, i.e. when the site is using iFrames DOM elements must be created using iFrame's document object if they are to be used inside an iFrame | ```document``` |

#### Examples
##### #1 Basic example
```javascript
$.create('div', {attributes: {id: 'myId'}, children: 'myText'}).appendTo('#myElem');
```

Create new ```<div>``` element with ```myId``` id value and ```myText``` text and append it to ```#myElem``` element.

##### #2 iFrame example
```javascript
$.create('div', {attributes: {id: 'myId'}, children: 'myText', root: $('#myIFrame').get(0).contentDocument});
```
Create new ```<div>``` element with ```myId``` id value and ```myText``` text on a iFrame with ```myIFrame``` id.

##### #3 Event handler example
```javascript
function clickEventHandler() {
    alert('test');
}
$.create('div', {attributes: {id: 'myId'}, events: {click: clickEventHandler}});
```

Create new ```<div>``` element with ```myId``` id value and bind click event handler ```clickEventHandler``` to it.

#### Links
* [Incompatible Changes](https://github.com/RaYell/jquery-domec/wiki/Incompatible-Changes)
* [Changelog](https://github.com/RaYell/jquery-domec/wiki/Changelog)
