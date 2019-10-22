var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');


gulp.task('compile', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', gulp.series('compile'));
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
          gulp.parallel('compile', 'watch'),
           'start')();
});