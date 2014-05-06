module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-blanket');
    grunt.loadNpmTasks('grunt-blanket-mocha');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                flatten: true,
                src: 'src/*',
                dest: 'dist/',
            },
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
        blanket_qunit: {
            all: {
                options: {
                    urls: [
                        'tests/index.html?coverage=true&gruntReport',
                        'tests/jquery2.html?coverage=true&gruntReport'
                    ],
                    threshold: 100
                }
            }
        },
        mocha: {
            all: {
                src: [
                    'tests/testrunner-jquery1.html',
                    'tests/testrunner-jquery2.html'
                ],
            },
            options: {
                run: true
            }
        },
        blanket: {
            options: {},
            your_target: {
                files: {
                    'src-cov/': ['src'],
                }
            }
        },
        blanket_mocha: {
            test: {
                src: [
                    'tests/testrunner-jquery1.html',
                    'tests/testrunner-jquery2.html'
                ],
                options: {
                    threshold: 100,
                    run: true
                }
            }
        }
    });

    grunt.registerTask('default', ['copy', 'uglify', 'mocha', 'blanket']);
    grunt.registerTask('build', ['copy', 'uglify']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('cover', ['blanket_mocha']);
};