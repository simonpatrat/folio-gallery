var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');


// Bower jQuery copy
gulp.task('bower-import-jquery', function () {
    return gulp.src('./bower_components/jquery/dist/jquery.js')
        .pipe(gulp.dest('./public/plugins/jquery'));
    var path = require('path');
});

// Js minify
gulp.task('jsMinify', function (cb) {
    pump([
            gulp.src('./dev/js/*.js'),
            uglify(),
            gulp.dest('./public/js')
        ],
        cb
    );
});

// Less compile
gulp.task('less', function () {
    return gulp.src('./dev/styles/**/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./public/css'));
    var path = require('path');
});

// Images Copy and optimize
gulp.task('img', function () {
    return gulp.src('./dev/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
    var path = require('path');
});


// Html Copy
gulp.task('html', function () {
    return gulp.src('./dev/**/*.html')
        .pipe(gulp.dest('./public/'));
    var path = require('path');
});

// Default Task
gulp.task('default', ['less', 'bower-import-jquery', 'jsMinify', 'img', 'html'], function() {
    console.log('Starting Default task...');
});