/*global mocha, require, window*/
require.config({
    paths: {
        chai: '../node_modules/chai/chai',
        jquery: '../node_modules/jquery/dist/jquery.min',
        domec: '../src/jquery-domec'
    }
});

require(['chai'], function (chai) {
    window.assert = chai.assert;
    mocha.setup('bdd');

    require(['jquery'], function () {
        require(['domec'], function () {
            require(['tests.js'], function () {
                mocha.run();
            });
        });
    });
});