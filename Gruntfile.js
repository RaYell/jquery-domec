module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-qunit');
	
	grunt.initConfig({
  		qunit: {
    		all: ['tests/*.html']
  		}
	});
	
	grunt.registerTask('default', ['qunit']);
};