var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
//var minifycss = require('gulp-minify-css')
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');

var env = process.env.NODE_ENV || 'development';
var config = require('./config.json');

gulp.task('sass', function() {
  gulp.src(config.sass)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    //.pipe(sourcemaps.write())
    .pipe(sass({errLogToConsole: true}))
    //.pipe(minifycss()))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./public/css'))
    .pipe(notify('✓ Successfully compiled SASS'));
});

gulp.task("js", function() {
  gulp.src("src/app.js")
  .pipe(sourcemaps.init())
  //.pipe(uglify())
  //.pipe(concat('script.js'))
  //.pipe(sourcemaps.write())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest("./public/js/"))
  .pipe(notify('✓ Successfully compiled JS'));
});

// BrowserSync
gulp.task('browser-sync', function() {
    //browserSync(config.options);
    browserSync({
      server: "./public/"
    });
});

gulp.task('templates', function() {
  gulp.src('./public/**/*.html')
    //.pipe(gulp.dest('./Build'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('./sass/**/*.scss', ['sass']);
  // Watch .js files
  gulp.watch('./src/**/*.js', ['js', browserSync.reload]);
  // Watch 
  gulp.watch('./public/**/*.html', ['templates']);
});

gulp.task('default', ['sass', 'js', 'watch', 'browser-sync']);