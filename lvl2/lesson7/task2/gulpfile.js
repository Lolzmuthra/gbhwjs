const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');

gulp.task('sass-compile', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sass()) // используем gulp-sass
        .pipe(clean())
        .pipe(gulp.dest('public/css/'))
});
