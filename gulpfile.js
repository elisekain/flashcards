var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('useref', function() {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        serveStatic: ['./public'],
        server: {
            baseDir: '.'
        }
    })
});

gulp.task('watch', ['browserSync', 'useref', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['useref', browserSync.reload]);
});