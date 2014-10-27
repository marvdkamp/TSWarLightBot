module.exports = function (grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine_node: {
            projectRoot: '../',
            specFolders: ['specs'],


            coverage: {
                excludes: ['**/TSWarLightBotEmpty.specs/**'],
            },
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'Spec',
                captureExceptions: true,
                
                junitreport: {
                    report: false,
                    savePath : './build/reports/jasmine/',
                    useDotNotation: true,
                    consolidate: true
                }
            }
        //},
        //copy: {
        //    main: {
        //        files: [
        //            {
        //            expand: true,
        //            cwd: '../TSWarLightBot/',
        //            src: ['**/*.ts', '!**Scripts/**'],
        //            dest: 'coverage/_source'
        //        },{
        //            expand: true,
        //            cwd: 'specs/',
        //            src: ['**/*.ts'],
        //            dest: 'coverage/_specs'
        //        }],
        //        options: {
        //            process: function (content, srcpath) {
        //                var escapeRegExp = function(string) {
        //                    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        //                };

        //                var replaceAll = function (string, find, replace) {
        //                    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        //                };
                        
        //                var result = replaceAll(content, '../Scripts', '../../Scripts');
        //                return replaceAll(result, '../TSWarLightBot/', '_source/');
        //                //return content.replace('../TSWarLightBot/', '_source/');
        //            }
        //        }
        //    }
        }
    });
    
    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', 'jasmine_node');

};