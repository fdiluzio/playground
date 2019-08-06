/*
Grunt Config for compressing and concatenation of CSS and JS
*/

module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // configure the tasks
  grunt.initConfig({

    //#############################
    // Javacript
    //#############################

    uglify: {

      app: {

        options: {
          mangle: false
        },

        files: [{
          'js/app.min.js': [
            'js_src/**/*.js'
          ]
        }]
      }

    },

    //#############################
    // SASS
    //#############################

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        options: { // Target options
          outputStyle: 'compressed' //Type: String Default: nested Values: nested, expanded, compact, compressed
        },
        files: [{
          src: ['scss/app.scss'],
          dest: 'css/app.css'
        }]
      },
      dev: {
        options: {
          outputStyle: 'nested' // Type: String Default: nested Values: nested, expanded, compact, compressed
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'], // ['*.scss', '!app.scss']
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    //#############################
    // autoprefixer
    //#############################
    postcss: {
      options: {
        processors: [
          require('autoprefixer')
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },

    //#############################
    // Watch
    //#############################

    watch: {
      options: {
        livereload: true
      },
      scss: {
        options: {
          dateFormat: function(time) {
            grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
            grunt.log.writeln('Waiting for more changes...');
          }
        },
        files: ['scss/**/*.scss'],
        tasks: ['sass:dev']
      },
      static: {
        files: ['**/*.html', '**/*.php', 'css/**/*', 'js/**/*']
      }
    }

  });



  // define the tasks
  grunt.registerTask(
    'scripts',
    'Uglifies each javascript and save the file to the require directory.', ['uglify:app']
  );

  grunt.registerTask(
    'compile',
    'Multiple complex commmands', ['sass:dev', 'postcss']
  );
  grunt.registerTask(
    'css',
    'Multiple complex commmands', ['sass:dist', 'postcss:dist']
  );

  grunt.registerTask(
    'default',
    'Single command for compression', ['css']
  );




};
