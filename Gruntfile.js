/*jslint indent: 4*/
/*global module*/
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        uglify: {
            options: {
                mangle: false,
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/jquery-domec.min.js': [
                        'src/jquery-domec.js'
                    ]
                }
            }
        },
        jshint: {
            all: [
                'src/*.js',
                'test/*.js',
                '*.js'
            ]
        },
        jscs: {
            src: [
                'src/*.js',
                'test/*.js',
                '*.js'
            ],
            options: {
                config: '.jscsrc'
            }
        },
        mocha: {
            all: {
                src: [
                    'test/*.html'
                ]
            },
            options: {
                run: true
            }
        },
        jsonlint: {
            sample: {
                src: [
                    'package.json',
                    'bower.json'
                ]
            }
        },
        blanket: {
            instrument: {
                options: {},
                files: {
                    'src-cov/': ['src/']
                }
            }
        },
        blanket_mocha: { // jshint ignore:line
            all: {
                src: [
                    'test/*.html'
                ],
                options: {
                    threshold: 100,
                    run: true
                }
            }
        },
        shell: {
            coveralls: {
                options: {
                    stderr: false
                },
                command: './node_modules/.bin/mocha --require blanket --reporter mocha-lcov-reporter | ' +
                    './node_modules/coveralls/bin/coveralls.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-blanket');
    grunt.loadNpmTasks('grunt-blanket-mocha');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('test', ['jshint', 'jscs', 'jsonlint', 'mocha']);
    grunt.registerTask('cover', ['blanket_mocha', 'shell:coveralls']);
    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('default', ['build', 'test', 'blanket_mocha']);
};
