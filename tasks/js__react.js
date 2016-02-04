module.exports = function (grunt) {
    grunt.config('react', {
        react: {
            files: [{
                expand: true,
                cwd: 'source/js/components/jsx',
                src: [ '**/*.jsx' ],
                dest: 'source/js/components/compiled',
                ext: '.js'
            }]
        }
    });
};
