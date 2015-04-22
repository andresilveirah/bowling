module.exports = function(grunt) {
  grunt.config.init({
    connect:{
      server:{
        options:{
          protocol: 'http',
          hostname: '*',
          port: 8000,
          base: '.'
        }
      }
    },
    karma:{
      specs:{
        configFile: 'karma.config.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js'],
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.registerTask('dev', ['jshint', 'connect', 'watch']);
  grunt.registerTask('specs', ['karma']);

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
