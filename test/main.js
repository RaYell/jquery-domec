/*global mocha, require, window*/
require.config({
    paths: {
        chai: '../node_modules/chai/chai',
        jquery: '../node_modules/jquery/dist/jquery.min',
        domec: '../src/jquery-domec'
    },
    shim: {
        domec: [
            'jquery'
        ],
        tests: [
            'domec'
        ]
    }
});

require(['chai'], function (chai) {
    'use strict';
    window.assert = chai.assert;
    mocha.setup('bdd');

    require(['tests'], function () {
        mocha.run();
    });
});