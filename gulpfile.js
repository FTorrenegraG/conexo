var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var notify = require("gulp-notify") ;
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var config = {
     sassPath: 'app/scss',
     npmDir: './node_modules' ,
    angular_modules: [
      "angular",
      "ngstorage",
      "angular-cookies",
      "angular-route"
    ]
}

gulp.task('bootstrap_js', function() { 
    return gulp.src([
      config.npmDir + '/bootstrap-sass/assets/javascripts/**.*',
      ]) 
      .pipe(gulp.dest('app/js/libs')); 
})
gulp.task('moment_js', function() { 
    return gulp.src([config.npmDir + '/moment/min/moment.min.js',config.npmDir + '/moment/min/moment-with-locales.min.js']) 
        .pipe(gulp.dest('app/js/libs')); 
})
gulp.task('angular_import', function() { 
    return gulp.src(config.npmDir + '/angular/angular.min.js') 
        .pipe(gulp.dest('app/js/libs')); 
})
gulp.task('conca_angular_libs',function () {
  return gulp.src([
      config.npmDir + '/ngstorage/ngstorage.min.js',
      config.npmDir + "/angular-cookies/angular-cookies.min.js",
      config.npmDir + "/angular-route/angular-route.min.js",
      config.npmDir + '/angular-animate/angular-animate.min.js',
    ])
    .pipe(concat('angular_libs.js'))
    .pipe(gulp.dest('app/js/libs'));
})
gulp.task('conca_angular_core',function () {
  return gulp.src([
      'app/js/angular_core/*.js',
      'app/js/angular_core/factories/**/*.js',
      'app/js/angular_core/controllers/**/*.js',
    ])
    .pipe(concat('bundle-angular.js'))
    .pipe(gulp.dest('app/js'));
})
gulp.task('conca_css_import',function () {
  return gulp.src('app/css/imports/*.css')
    .pipe(concat('imports.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
})
gulp.task('jquery', function() { 
    return gulp.src(config.npmDir + '/jquery/dist/jquery.min.js') 
        .pipe(gulp.dest('app/js/libs')); 
})
gulp.task('icons', function() { 
    return gulp.src(config.npmDir + '/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('app/fonts')); 
})
gulp.task('icons_b', function() { 
    return gulp.src(config.npmDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*') 
        .pipe(gulp.dest('app/fonts/bootstrap')); 
})
gulp.task('css', function() { 
    return gulp.src('app/scss/**/*.scss')
         .pipe(sass({
             style: 'compressed',
             includePaths: [
                'app/scss',
                config.npmDir + '/bootstrap-sass/assets/stylesheets',
                 config.npmDir + '/font-awesome/scss'
             ]
         }) 
        .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
})

gulp.task('browserSync', function() {
  browserSync.init({
    
    port: 8081,
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('serve', [
  'browserSync',
  'icons',
  'icons_b',
  'css',
  'jquery',
  'bootstrap_js',
  'moment_js',
  'angular_import',
  'conca_angular_libs',
  'conca_angular_core',
  'conca_css_import'
  ], function (){
  gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
  gulp.watch('app/js/angular_core/**/*.js', ['conca_angular_core']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/partial-views/**/*.html', browserSync.reload); 
  gulp.watch('app/js/angular_core/*.js', browserSync.reload); 
  gulp.watch('app/js/*.js', browserSync.reload); 
})

//gulp.task('default', ['bower', 'icons', 'css'])

gulp.task('useref', function(){
  return gulp.src('app/**/*.html')
    .pipe(useref())
    // .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|PNG)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})


gulp.task('clean:dist', function() {
  return del.sync('dist');
})
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['css', 'useref', 'images', 'fonts'],
    callback
  )
})
// gulp.task('build', function (callback) {
//   runSequence('clean:dist', 
//     ['sass', 'useref', 'images', 'fonts'],
//     callback
//   )
// })