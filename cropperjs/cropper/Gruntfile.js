/*
Grunt Config for compressing and concatenation of CSS and JS
*/


module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // configure the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //#############################
        // CSS
        //#############################


        cssmin: {
            options: {
                specialComments: 0
            },
            dist: {
                files: {
                    'css/app.min.css': ['css/**/*.css', '!app.min.css']
                }
            }
        },

        //#############################
        // Javacript
        //#############################

        uglify: {
            options: {
                mangle: {
                    reserved: ['cropper']
                }
            },
            dist: {
                files: {
                    'js/app.min.js': ['javascript/**/*.js']
                }
            }
        },

        //#############################
        // SASS
        //#############################

        sass: {
            options: {
                sourceMap: true
            },
            nestedCss: {
                options: {
                    outputStyle: 'expanded' // Type: String Default: nested Values: nested, expanded, compact, compressed
                }
                ,
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['**/*.scss'], // ['*.scss', '!app.scss']
                    dest: 'css/',
                    ext: '.css',
                    flatten: true
                }]
            },
            compressedCss: {
                options: {
                    outputStyle: 'compressed' // Type: String Default: nested Values: nested, expanded, compact, compressed
                }
                ,
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['**/*.scss'], // ['*.scss', '!app.scss']
                    dest: 'css/',
                    ext: '.css',
                    flatten: true
                }]
            }
        },

        //#############################
        // autoprefixer
        //#############################
        postcss: {
            options: {
                map: false,
                processors:
                    [
                        require('autoprefixer')
                    ]
            },
            addPrefixesDefault: {
                src: 'css/*.css'
            }
        },

        //#############################
        // Watch
        //#############################

        watch: {
            options: {
                livereload: false
            },
            scss: {
                options: {
                    dateFormat: function (time) {
                        grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                        grunt.log.writeln('Waiting for more changes...');
                    }
                },
                files: ['scss/**/*.scss'],
                tasks:
                    ['sass:nestedCss']
            }
        },

        clean: {
            css: ['css/*.*']
        },

        pkg: grunt.file.readJSON('package.json')

    });

    grunt.registerTask(
        'build',
        'Multiple complex commmands', ['clean', 'sass:compressedCss', 'postcss', 'cssmin', 'uglify']
    );

    grunt.registerTask(
        'compilescss',
        'Multiple complex commmands', ['clean', 'sass:nestedCss', 'postcss']
    );

    grunt.registerTask(
        'default',
        'Single command for compression', ['build']
    );

};
