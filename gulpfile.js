'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var gp = require('gulp-load-plugins')();
var del = require('del');

gulp.task('clean', function(cb) {
    return del('./build', cb);
});

gulp.task('js:gulp', function() {
    return gulp.src('./source/js/**/*.js')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.uglify()).on('error', gp.notify.onError({ title: 'Style' }))
        .pipe(gp.concat('script.js'))
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('js:webpack', function() {
    return gulp.src('./source/js/**/*.js')
        .pipe(gp.webpack({
            entry: {
              test: './source/js/test.js',
              test2: './source/js/test2.js'
            },
            output: {
                filename: '[name].js'
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                }),
                new webpack.ProvidePlugin({
                    $: "jquery",
                    jQuery: "jquery",
                    "window.jQuery": "jquery"
                })
            ],
            devtool: 'eval'
        }, webpack))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('default', gulp.series('clean', 'js:gulp'));
