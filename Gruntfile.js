/*jslint indent: 4, maxlen: 120 */
/*global module*/
module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-blanket');
    grunt.loadNpmTasks('grunt-blanket-mocha');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                flatten: true,
                src: 'src/*',
                dest: 'dist/'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/jquery-domec.min.js': ['dist/jquery-domec.js']
                }
            }
        },
        mocha: {
            all: {
                src: [
                    'test/testrunner-jquery1.html',
                    'test/testrunner-jquery2.html'
                ]
            },
            options: {
                run: true
            }
        },
        blanket: {
            options: {},
            my_target: {
                files: {
                    'src-cov/': ['src']
                }
            }
        },
        blanket_mocha: {
            test: {
                src: [
                    'test/testrunner-jquery1.html',
                    'test/testrunner-jquery2.html'
                ],
                options: {
                    threshold: 100,
                    run: true
                }
            }
        },
        jslint: {
            client: {
                src: [
                    'src/*.js',
                    'test/*.js',
                    'Gruntfile.js'
                ]
            }
        }
    });

    grunt.registerTask('build', ['copy', 'uglify']);
    grunt.registerTask('test', ['jslint', 'mocha']);
    grunt.registerTask('cover', ['blanket_mocha']);
    grunt.registerTask('default', ['build', 'test', 'cover']);
};