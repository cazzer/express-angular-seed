/*
 Modules
 */
var gulp = require('gulp'),
	gulpIf = require('gulp-if'),
	jshint = require('gulp-jshint'),
	csslint = require('gulp-csslint'),
	minifyCss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	minifyHtml = require('gulp-minify-html'),
	watch = require('gulp-watch'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	eventStream = require('event-stream'),
	runSequence = require('run-sequence'),
	html2js = require('gulp-ng-html2js');

/*
 Helpful Variables
 */
var dev = 'client/development',
	prod = 'client/production',
	bower = 'bower_components',
	isProd = false;

/*
 Globs
 */
var htmlFiles = [
			dev + '/**/*.html',
			'!' + dev + '/**/*.tpl.html'
	],
	templateFiles = dev + '/**/*.tpl.html',
	sassFiles = dev + '/**/*.scss',
	jsFiles = [
			dev + '/**/*.module.js',
			dev + '/**/*.js'
	];

var vendorCss = [
			bower + '/bootstrap/dist/css/bootstrap.min.css',
			dev + '/vendor/**/*.css'
	],
	vendorJs = [
			bower + '/angular/angular.min.js',
			bower + '/ui-router/release/angular-ui-router.min.js',
			bower + '/angular-animate/angular-animate.min.js',
			bower + '/angular-bootstrap/ui-bootstrap-tpls.min.js',
			dev + '/vendor/**/*.js'
	],
	vendorFonts = [
			bower + '/bootstrap/dist/fonts/*'
	],
	vendorMaps = [
			bower + '/bootstrap/dist/css/bootstrap.css.map',
			bower + '/angular/angular.min.js.map',
			bower + '/angular-animate/angular-animate.min.js.map'
	];

/*
 Tasks
 */
gulp.task('default', ['watch']);

gulp.task('watch', ['dev'], function() {
	gulp.watch(sassFiles, ['sass']);
	gulp.watch(jsFiles, ['js']);
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(templateFiles, ['templates']);
});

gulp.task('dev', ['sass', 'js', 'html', 'vendor', 'templates']);

gulp.task('prod', function() {
	isProd = true;
	return runSequence(['dev']);
});

gulp.task('sass', function() {
	gulp.src(sassFiles)
		.pipe(sass())
		.pipe(csslint({
			'adjoining-classes': false
		}))
		.pipe(csslint.reporter())
		.pipe(concat("app.css"))
		.pipe(gulpIf(isProd, minifyCss()))
		.pipe(gulp.dest(prod));
});

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(concat('app.js'))
		.pipe(gulpIf(isProd, uglify()))
		.pipe(gulp.dest(prod));
});

gulp.task('html', function() {
	gulp.src(htmlFiles)
		.pipe(gulpIf(isProd, minifyHtml({
			empty: true,
			quote: true
		})))
		.pipe(gulp.dest(prod));
});

gulp.task('templates', function() {
	gulp.src(templateFiles)
		.pipe(minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(html2js({
			moduleName: "templates"
		}))
		.pipe(concat("templates.js"))
		.pipe(uglify())
		.pipe(gulp.dest(prod));
});

gulp.task('vendor', function() {
	eventStream.merge(
		gulp.src(vendorJs)
			.pipe(concat('vendor.js'))
			.pipe(gulp.dest(prod + '/vendor')),
		gulp.src(vendorCss)
			.pipe(concat('vendor.css'))
			.pipe(gulp.dest(prod + '/vendor')),
		gulp.src(vendorFonts)
			.pipe(gulp.dest(prod + '/fonts')),
		gulp.src(vendorMaps)
			.pipe(gulp.dest(prod + '/vendor'))
	);
});

gulp.task('clean', function() {
	gulp.src(prod, {read: false})
		.pipe(clean());
});