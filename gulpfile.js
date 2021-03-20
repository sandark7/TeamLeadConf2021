var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var config = {
    stylus: "./src/styles/*.styl",
    jade:'./src/*.jade',
    html: "./*.html",
    //video: "./*.mp4",
    dist: "./"
};

// gulp.task('video', function() {
//     return gulp.src(config.video)
//         .pipe(gulp.dest(config.dist))
//         .pipe(browserSync.stream());
// });

gulp.task('jade', function() {
  return gulp.src(config.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

gulp.task('stylus', function () {
  return gulp.src(config.stylus)
    .pipe(stylus())
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: config.dist
        }
    });
    gulp.watch(config.jade, gulp.series('jade'));
    gulp.watch(config.stylus, gulp.series('stylus'));
    gulp.watch(config.html).on('change', browserSync.reload);
    //gulp.watch(config.video, gulp.series('video'));
});