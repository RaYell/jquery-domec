module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-blanket-qunit');

    grunt.initConfig({
        qunit: {
            all: ['tests/*.html']
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
        }
    });

    grunt.registerTask('default', ['qunit', 'blanket_qunit']);
};