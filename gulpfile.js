'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const paths = {
  html: 'src/*.html',
  scss: 'src/sass/**/*.scss',
  js: 'src/js/main.js',
  img: 'src/img/**/*'
}

gulp.task('sass', () => {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(reload({stream:true}));
});

gulp.task('html', () => {
  gulp.src(paths.html)
    .pipe(reload({stream:true}));
});

gulp.task('images', () => {
    gulp.src(paths.img)
      .pipe(reload({stream:true}));
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: "./src"
    },
    port: 3000,
    // tunnel: true,
    notify: false
  });
});

gulp.task('watcher', () => {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.img, ['images']);
});

gulp.task('default', ['watcher', 'browserSync']);
