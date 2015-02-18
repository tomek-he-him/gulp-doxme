import fs from "fs";
import path from "path";

import dox from "dox";
import originalDoxme from "doxme";
import gulp from "gulp";
import gulpDox from "gulp-dox";
import test from "tape-catch";
import spigot from "stream-spigot";
import File from "vinyl";

import doxme from "../source/gulp-doxme";


var inputFilePath = path.resolve(__dirname, "fixtures/input.js");
var doxOutput = dox.parseComments(
  fs.readFileSync(inputFilePath).toString()
  );
var doxOutputFile = new File(
  { cwd: "/"
  , base: "/base/"
  , path: "/base/anything.json"
  , contents: new Buffer(JSON.stringify(doxOutput))
  });


test("Works with file.data", (is) => {
  is.plan(3);

  var inputJSON = "[]";
  var inputFile = doxOutputFile.clone();
  inputFile.contents = new Buffer(inputJSON);
  inputFile.data = doxOutput;

  spigot({objectMode: true}, [inputFile])
    .pipe(doxme())
    .on("data", (outputFile) => {
      var output = outputFile.contents.toString();

      is.notEqual
        ( output
        , doxme(inputJSON)
        , "preferring file.data over JSON"
        );
      is.equal
        ( path.extname(outputFile.path)
        , ".md"
        , "outputting a markdown file"
        );
      is.equal
        ( output
        , originalDoxme(doxOutput)
        , "with the same content as doxme's output"
        );
      })
    ;
  });


test("Works with a JSON file", (is) => {
  is.plan(2);

  spigot({objectMode: true}, [doxOutputFile.clone()])
    .pipe(doxme())
    .on("data", (outputFile) => {
      is.equal
        ( path.extname(outputFile.path)
        , ".md"
        , "outputting a markdown file"
        );
      is.equal
        ( outputFile.contents.toString()
        , originalDoxme(doxOutput)
        , "with the same content as doxme's output"
        );
      })
    ;
  });


test("Works with gulp-dox", (is) => {
  is.plan(2);

  gulp.src(inputFilePath)
    .pipe(gulpDox())
    .pipe(doxme())
    .on("data", (outputFile) => {
      is.equal
        ( path.extname(outputFile.path)
        , ".md"
        , "outputting a markdown file"
        );
      is.equal
        ( outputFile.contents.toString()
        , originalDoxme(doxOutput)
        , "with the same content as doxme's output"
        );
      })
    ;
  });


test("Emits errors", (is) => {
  is.plan(2);

  var brokenDataFile = doxOutputFile.clone();
  brokenDataFile.data = "that's not dox output";

  spigot({objectMode: true}, [brokenDataFile])
    .pipe(doxme())
    .on("error", () => {
      is.pass("when given broken file.data");
      })
    ;

  var brokenJSONFile = doxOutputFile.clone();
  brokenJSONFile.contents = new Buffer("invalid JSON");

  spigot({objectMode: true}, [brokenJSONFile])
    .pipe(doxme())
    .on("error", () => {
      is.pass("when given an invalid JSON file");
      })
    ;
  });
