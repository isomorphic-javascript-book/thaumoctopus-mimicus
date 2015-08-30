var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var sequence = require('run-sequence');
var source = require('vinyl-source-stream');

gulp.task('copy', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', function (callback) {
    sequence('compile', 'bundle', callback);
  });
  gulp.watch('src/**/*.html', ['copy']);
});

gulp.task('bundle', function () {
  var b = browserify({
    entries: 'dist/index.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('build/application.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('start', function () {
  nodemon({
    watch: 'dist',
    script: 'dist/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', function (callback) {
  sequence(['watch', 'copy', 'compile'], 'bundle', 'start', callback);
});