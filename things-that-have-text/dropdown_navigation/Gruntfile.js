/*
Grunt Config for compressing and concatenation of CSS and JS
*/


module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // configure the tasks
    grunt.initConfig({

        //#############################
        // CSS
        //#############################

        cssmin: {
            allFiles: {
                files: {
                    'static/frontend/css/compress.css':
                        ['static/frontend/css/*.css', '!static/frontend/css/compress.css']
                }
            },
            projectFiles: {
                files: {
                    'static/frontend/css/compress.css': '<%= cssFiles %>'
                }
            }
        },

        //#############################
        // Javacript
        //#############################

        uglify: {

            allFiles: {

                options: {
                    mangle: false,
                    banner:
                    '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },

                files: [{
                    'static/frontend/js/compress.js':
                        ['static/frontend/js/base/**/*.js', 'static/frontend/js/*.js', '!static/frontend/js/compress.js']
                }]

            },

            projectFiles: {

                options: {
                    mangle: false,
                    banner:
                    '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },

                files: [{
                    'static/frontend/js/compress.js': '<%= jsFiles %>',
                }],
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
                    outputStyle: 'nested' // Type: String Default: nested Values: nested, expanded, compact, compressed
                }
                ,
                files: [{
                    expand: true,
                    cwd: 'static/frontend/scss/',
                    src: ['**/*.scss'], // ['*.scss', '!app.scss']
                    dest: 'static/frontend/css/',
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
                    cwd: 'static/frontend/scss/',
                    src: ['**/*.scss'], // ['*.scss', '!app.scss']
                    dest: 'static/frontend/css/',
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
                src: 'static/frontend/css/*.css'
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
                files: ['static/frontend/scss/**/*.scss'],
                tasks:
                    ['sass:nestedCss']
            }
        },

        clean: {
            css: ['static/frontend/css/*.*']
        },

        pkg: grunt.file.readJSON('package.json'),


        jsFiles:
            [
                //startJs
                ''
                //endJs
            ],


        cssFiles:
            [
                //startCss
                ''
                //endCss
            ]


    });

    grunt.registerTask(
        'build',
        'Multiple complex commmands', ['clean', 'sass:compressedCss', 'cssmin:projectFiles', 'uglify:projectFiles']
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
