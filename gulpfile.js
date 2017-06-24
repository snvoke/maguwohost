'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const paths = {
  html: 'src/*.html',
  css: 'src/css/style.css',
  scss: 'src/sass/**/*.scss',
  js: 'src/js/main.js',
  img: 'src/img/**/*'
}

gulp.task('html', () => {
  gulp.src(paths.html)
    .pipe(reload({stream:true}));
});

gulp.task('sass', () => {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(reload({stream:true}));
});

gulp.task('minify-css', () => {
  return gulp.src(paths.css)
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/css'));
});

gulp.task('images', () => {
  gulp.src(paths.img)
    .pipe(reload({stream:true}));
});

gulp.task('imagemin', () => {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', () => {
  const spriteData =
    gulp.src('src/img/sprite/*.*')
      .pipe(spritesmith({
        retinaSrcFilter: 'src/img/sprite/*-2x.png',
        imgName: 'spritesheet.png',
        retinaImgName: 'spritesheet-2x.png',
        cssName: '_sprites.scss'
      }));

  spriteData.img.pipe(gulp.dest('src/img')); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest('src/sass')); // путь, куда сохраняем стили
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

gulp.task('clean', () => {
  return del.sync('build'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'minify-css', 'imagemin'], () => {

  const buildCss = gulp.src([ // Переносим CSS стили в продакшен
    'src/css/style.css',
    'src/css/style.min.css'
    ])
  .pipe(gulp.dest('build/css'))

  const buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('build/fonts'))

  const buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
  .pipe(gulp.dest('build/js'))

  const buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
  .pipe(gulp.dest('build'));

});


gulp.task('default', ['watcher', 'browserSync']);
