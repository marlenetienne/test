module.exports = function (grunt) {
    // tache doit avoir un nom ou un callback 
    // grunt.registerTask('test-grunt', () => {
    //     console.log('grunt ready')
    // })

    // grunt.registerTask('task2', () => {
    //     console.log('task 2')
    // })

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-json-minification');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-dom-munger2');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // configuration de la tâche pre-construite 
    grunt.initConfig({
        clean: {
            contents: ['dist/*'],
        },
        dom_munger: {
            your_target: {
              options: {
                remove: ['link'],
                append: [
                    {selector:'head',html:'<link rel="stylesheet" href="assets/css/styles.css">'}
                ]
              },
              src: 'src/index.html',
              dest: 'dist/index.html'
            },
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        uglify: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/scripts',
                    src: ['*.js'],
                    dest: 'dist/assets/scripts'
                }]
            }
        },
        cssmin: {
            build: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true
                },
                files: {
                    'dist/assets/css/styles.css': ['src/assets/css/*.css']
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/img',
                    src: ['*.jpeg'],
                    dest: 'dist/assets/img'
                }]
            }
        },
        json_minification: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/data',
                    src: ['*.json'],
                    dest: 'dist/data'
                }]
            }
        }
    })

    // tache default : tache effectuée par défaut (recherchée automatiquement par Grunt) 
    grunt.registerTask('default', ['clean', 'dom_munger', 'htmlmin', 'uglify', 'cssmin', 'json_minification', 'copy']);
};