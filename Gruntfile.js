module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-blanket');
    grunt.loadNpmTasks('grunt-blanket-mocha');

    grunt.initConfig({
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
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'jquery-domec.min.js': ['jquery-domec.js']
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
            files: {
                'src-cov/': ['/src'],
            },
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

    grunt.registerTask('default', ['uglify', 'mocha', 'blanket']);
    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('cover', ['blanket_mocha']);
};