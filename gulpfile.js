/*jshint esnext: false, globalstrict: true */
"use strict";

var gulp = require("gulp");
var to5 = require("gulp-6to5");


var settings =
  { scripts:
    { source: "source/**/*.js"
    , target:
      { es5: "dist.es5"
      , es6: "dist.es6"
      }
    }
  };


// `gulp build`
// ------------

gulp.task("build", ["scripts"]);


// `gulp scripts`
// --------------

gulp.task("scripts", ["scripts:es6", "scripts:es5"]);

gulp.task("scripts:es6", function () {
  return gulp.src(settings.scripts.source)
    .pipe(gulp.dest(settings.scripts.target.es6))
    ;
});

gulp.task("scripts:es5", function () {
  return gulp.src(settings.scripts.source)
    .pipe(to5())
    .pipe(gulp.dest(settings.scripts.target.es5))
    ;
});
