/*******************************************************************************
DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	stylish = require('jshint-stylish'),
	imagemin = require('gulp-imagemin');




/*******************************************************************************
FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/

var target = {
    sass_src : './assets/sass/*.scss',                  // all sass files
    css_dest : './assets/css',                          // where to put minified css
    js_src : './assets/js/*.js',						// all js files
    js_dest : './assets/js/min',                        // where to put minified js
	img_src : './assets/images/*.{png,jpg,gif}',		// all img files
	img_dest : './assets/images/min'					// where to put minified img
};






/*******************************************************************************
SASS TASK
*******************************************************************************/

gulp.task('styles', function() {
	return gulp.src(target.sass_src)
		.pipe(sass({
			noCache: true,
			style: 'compressed'
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(target.css_dest))
        .pipe(notify('Styles task completed'));
});






/*******************************************************************************
JS TASK
*******************************************************************************/

gulp.task('scripts', function() {
	return gulp.src(target.js_src)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(target.js_dest))
		.pipe(notify('Scripts task completed'));
});





/*******************************************************************************
IMAGES TASK
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src(target.img_src)
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(notify('Images task completed'))
    .pipe(gulp.dest(target.img_dest));
});






/*******************************************************************************
DEFAULT TASK
*******************************************************************************/

gulp.task('default', ['styles','scripts','images'], function() {

});





/*******************************************************************************
WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {

	gulp.watch(target.sass_src, ['styles']);		// Watch .scss files
	gulp.watch(target.js_src, ['scripts']);			// Watch .js files

});