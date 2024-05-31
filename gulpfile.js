import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import csso from 'postcss-csso';
import svgstore from 'gulp-svgstore';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import htmlmin from 'gulp-htmlmin';
import {deleteAsync} from 'del';
import terser from 'gulp-terser';
import concat from 'gulp-concat';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Image Optimization

export const imageOptimize = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
}

// HTML Minification

export const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

// JS Minification

export const js = () => {
  return gulp.src(['source/js/headerMenu.js', 'source/js/sliderScript.js'])
    .pipe(terser())
    .pipe(concat("script.min.js"))
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream())
}

// Clean

export const clean = () => {
  return deleteAsync('build');
}

//Copy Images

export const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));
}

// Copy Files

export const copyFiles = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/*.webmanifest",
  ], {
    base: "source"
  })
    .pipe(gulp.dest('build'));
  done();
}

// SVG Sprite

export const svgSprite = () => {
  return gulp.src('source/img/**/*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

// Webp Images
export const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
}


// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html));
  gulp.watch('source/js/*.js', gulp.series(js));
}

// Build

export const build = gulp.series(
  clean,
  copyFiles,
  imageOptimize,
  gulp.parallel(
    styles,
    html,
    js,
    svgSprite,
    createWebp
  )
)

// Default

export default gulp.series(
  clean,
  copyFiles,
  copyImages,
  gulp.parallel(
    styles,
    html,
    js,
    svgSprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
