var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


gulp.task('copy', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function (cb) {
  gulp.watch('src/**/*.js', gulp.series('compile','bundle'));
  gulp.watch('src/**/*.html', gulp.series('copy'));
  cb();
});

gulp.task('bundle', function () {
  var b = browserify({
    entries: 'src/index.js',
    debug: true
  })
  .transform('babelify', { presets: ['es2015'] });

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

gulp.task('default', function (){ 
  return gulp.series( 
          gulp.parallel('compile', 'watch', 'copy','bundle'),
           'start')();
});  