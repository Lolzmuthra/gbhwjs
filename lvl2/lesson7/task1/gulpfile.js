const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const concat = require('gulp-concat');

gulp.task('scripts', function () {
    return gulp.src('./src/js/*.js')
        .pipe(webpackStream({
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['env']
                        }
                    }
                ]
            },
            externals: {
                jquery: 'jQuery'
            }
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/'))
});
