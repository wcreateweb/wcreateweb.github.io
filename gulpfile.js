require('es6-promise').polyfill();
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var plumber         = require('gulp-plumber');
var gutil           = require('gulp-util');
var imagemin        = require('gulp-imagemin');
var cleanCSS        = require('gulp-clean-css');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var sourcemaps      = require('gulp-sourcemaps');


var onError = function (err) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
};

gulp.task('sass', function() {
    return gulp.src('./css/style.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'));
});

gulp.task('images', function() {
    return gulp.src('./img/*')
        .pipe(plumber({errorHandler: onError}))
        .pipe(imagemin({optimizationLevel: 7, progressive: true}))
        .pipe(gulp.dest('./img/'));
});

gulp.task('compress', function (cb) {
    return gulp.src('./js/plugin.js')
        .pipe(plumber({errorHandler: onError}))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./js'));
});


gulp.task('watch', function() {
    gulp.watch('./css/**/*.scss', ['sass']);
    gulp.watch('./js/*', ['compress']);
});

gulp.task('default', ['sass', 'images', 'compress', 'watch']);