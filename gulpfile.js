var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    typescript  = require('gulp-typescript'),
    tslint      = require('gulp-tslint')
    eslint      = require('gulp-eslint'),
    tsl         = require("tslint"),
    livereload  = require('gulp-livereload'),
    connect     = require('gulp-connect'),
    imagemin    = require('gulp-imagemin'),
    del         = require('del'),
    merge       = require('merge2'),
    path        = require('path');

var tsProject = typescript.createProject("./tsconfig.json");

gulp.task('ts', function() {
  var tsResult = gulp.src('src/**/*.ts')
                  .pipe( tsProject());    

  return merge([
      tsResult.dts.pipe(gulp.dest('dist/definitions/')),
      tsResult.js.pipe(gulp.dest('dist/'))
    ]);
});

gulp.task('tslint', function() {
  return gulp.src('src/**/*.ts')
    .pipe( tslint({
      formatter: 'stylish'
    }))
    .pipe( tslint.report({
      emitError: false
    }))
})

gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe( gulp.dest('dist/') );
});

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe( eslint())
    .pipe( gulp.dest('dist/'));
});

gulp.task('jade', function() {
return gulp.src(['src/**/*.jade', '!src/includes/**/*',])
    .pipe( jade({ pretty: true }))
    .pipe( gulp.dest('dist/'))
    .pipe( connect.reload() );
});

gulp.task('images', function() {
  return gulp.src(['src/**/*gif','src/**/*.jpg','src/**/*.png', 'src/**/*.ico'])
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function () {
	del(['dist/**/*', '!dist/', '!dist/bower_components', '!dist/bower_components/**/*'], {force: true}).then(paths => {
    if(paths.length != 0){
      gutil.log('Files and folders that were deleted:\n', gutil.colors.orange(paths.join('\n')));
    }
  });
});

gulp.task('watch', function () {
  
  gulp.watch('src/**/*.jade',['jade']);

  gulp.watch(['src/**/*gif','src/**/*.jpg','src/**/*.png','src/**/*.ico'],['images']);

  gulp.watch('src/**/*.scss',['sass']);

  gulp.watch('src/**/*.js',['js']);

  gulp.watch('src/**/*.ts',['ts', 'tslint']);

});

gulp.task('connect', ['watch'], function() {
	connect.server({
		root: "bin/",
    port: 4000,
		livereload: true
	});
});

gulp.task('default', ['jade','sass', 'tslint','ts', 'js','images','connect']);

gulp.task('build', ['jade','sass', 'tslint','ts', 'js','images']);