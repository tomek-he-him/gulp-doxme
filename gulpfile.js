/*jshint esnext: false, globalstrict: true */
"use strict";

var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require("del");


// `gulp build`
// ------------

gulp.task("build", ["clean", "scripts"]);


// `gulp scripts`
// --------------

var scripts =
  { source: "source/**/*.js"
  , es6Target: "dist.es6"
  , es5Target: "dist.es5"
  };

gulp.task("scripts", ["scripts:es6", "scripts:es5"]);

gulp.task("scripts:es6"
  , ["scripts:clean"]
  , function () {
    return gulp.src(scripts.source)
      .pipe(gulp.dest(scripts.es6Target))
      ;
    }
  );

gulp.task("scripts:es5"
  , ["scripts:clean"]
  , function () {
    return gulp.src(scripts.source)
      .pipe(babel())
      .pipe(gulp.dest(scripts.es5Target))
      ;
    }
  );

gulp.task("scripts:clean", function (done) {
  del([scripts.es6Target, scripts.es5Target]
    , done
    );
  });


// `gulp clean`
// ------------

gulp.task("clean", ["scripts:clean"]);
