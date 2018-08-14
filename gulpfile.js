"use strict";


var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var rimraf = require("rimraf");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();

gulp.task("clean", function (cb) {
  return rimraf("./build", cb);
});

gulp.task("sass", function () {
  return gulp
    .src("./dist/styles/style.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./build/css"));
});

gulp.task("pug", function buildHTML() {
  return gulp
    .src("./dist/template/_pages/*.pug")
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest("./build/"));
});

gulp.task("scripts", function () {
  return gulp
    .src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./dist/js/retina.js",
      "./dist/js/scrollIt.js",
      "./dist/js/Swiper-3.4.2/dist/js/swiper.jquery.min.js",
      "./dist/js/plyr_video/plyr.js",
      "./dist/js/subscribe_form.js",
      "./dist/js/whitelist_form.js",
      //"./dist/js/parallax.min.js",
      "./dist/js/app.js"
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("images", function () {
  return gulp
    .src("./dist/images/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("./build/images/"));
});

gulp.task("fonts", function () {
  return gulp
    .src("./dist/fonts/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("./build/fonts/"));
});

gulp.task("files", function () {
  return gulp
    .src("./dist/files/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("./build/files/"));
});

gulp.task("styles", function () {
  return gulp
    .src([
      "./node_modules/normalize.css/normalize.css",
      "./dist/js/Swiper-3.4.2/dist/css/swiper.min.css",
      "./dist/js/plyr_video/plyr.css"
    ])
    .pipe(cleanCSS())
    .pipe(concat("libs.css"))
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("watch", function () {
  gulp.watch("./dist/styles/**/*.scss", gulp.series("sass"));
  gulp.watch("./dist/js/*.js", gulp.series("scripts"));
  gulp.watch("./dist/images/**/*.*", gulp.series("images"));
  gulp.watch("./dist/fonts/**/*.*", gulp.series("fonts"));
  gulp.watch("./dist/files/**/*.*", gulp.series("files"));
  gulp.watch("./dist/template/**/*.pug", gulp.series("pug"));
});

gulp.task("serve", function () {
  browserSync.init({
    server: "./build/"
  });
  browserSync.watch("./build/*/*.*").on("change", browserSync.reload);
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "sass",
    "scripts",
    "pug",
    "styles",
    "images",
    "fonts",
    "files"
  )
);

gulp.task(
  "default",
  gulp.series("clean", "build", gulp.parallel("serve", "watch"))
);
