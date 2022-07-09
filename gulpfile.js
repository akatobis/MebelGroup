const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const cssmin = require('gulp-cssmin');

gulp.task('clean', async function () {
   del.sync('build')
});

gulp.task('sass', function () {
   return gulp.src('app/scss/**/*.scss')
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(autoprefixer({
         overrideBrowserlist: ['last 8 versions']
      }))
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function () {
   return gulp.src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/magnific-popup/dist/magnific-popup.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
   ])
      .pipe(concat('libs.min.css'))
      .pipe(cssmin())
      .pipe(gulp.dest('app/css'))
});

gulp.task('script', function () {
   return gulp.src([
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
   ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
});

gulp.task('html', function () {
   return gulp.src('app/*.html')
      .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
   return gulp.src('app/js/*.js')
      .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
   browserSync.init({
      server: {
         baseDir: "app/"
      }
   })
})

gulp.task('export', async function () {
   let buildHtml = gulp.src('app/**/*.html')
      .pipe(gulp.dest(build));

   let buildCss = gulp.src('app/**/*.css')
      .pipe(gulp.dest(build / css));

   let buildJs = gulp.src('app/js/**/*.js')
      .pipe(gulp.dest(build / js));

   let buildFonts = gulp.src('app/fonts/**/*.*js')
      .pipe(gulp.dest(build / fonts));

   let buildImg = gulp.src('app/images/**/*.*js')
      .pipe(gulp.dest(build / images));
});

gulp.task('watch', function () {
   gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
   gulp.watch('app/*.html', gulp.parallel('html'));
   gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'));