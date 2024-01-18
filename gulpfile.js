"use strict";

var gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");
var csso = require("gulp-csso");

gulp.task("scss", function () {
  return gulp
    .src("./assets/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(gulp.dest("./public/css/"));
});

gulp.task("watch", function () {
  gulp.watch(
    "./assets/scss/**/*.scss",
    gulp.series("scss")
  );
});

