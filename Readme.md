[![Build status](https://img.shields.io/travis/tomekwi/gulp-doxme/master.svg?style=flat-square)](https://travis-ci.org/tomekwi/gulp-doxme)
 [![Code climate](https://img.shields.io/codeclimate/github/tomekwi/gulp-doxme.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/gulp-doxme)
 [![David DM](https://img.shields.io/david/tomekwi/gulp-doxme.svg?style=flat-square)](http://david-dm.org/tomekwi/gulp-doxme)




gulp-doxme
==========

**Create markdown from [dox][]-ish output.**

[dox]: https://github.com/tj/dox

A gulp plugin for [doxme][].

[doxme]: https://github.com/tmcw/doxme




Installation
------------

```sh
$ npm install gulp-doxme
```




Usage
-----

Read through [doxme][] to see what happens under the hood and learn about the available options.


### With gulp-dox

Takes a JSON file as input (such as that coming from [gulp-dox][]). This approach is quick and simple.

[gulp-dox]: https://github.com/ayhankuru/gulp-dox

```js
var gulp = require("gulp");
var dox = require("gulp-dox");
var doxme = require("gulp-doxme");

gulp.src("*.js")
  .pipe(dox())
  .pipe(doxme())
  .pipe(gulp.dest("Readme.md"))
  ;
```


### With gulp-data

Takes `file.data` as input (for example coming from [gulp-data]). This approach gives you more power, when you want to process the dox output before passing it to gulp-doxme.

[gulp-data]: https://github.com/colynb/gulp-data

```js
var gulp = require("gulp");
var dox = require("dox");
var data = require("gulp-data");
var doxme = require("gulp-doxme");

gulp.src("*.js")
  .pipe(data(function (file) {
    return dox.parseComments(file.contents.toString());
    }))
  .pipe(doxme())
  .pipe(gulp.dest("Readme.md"))
  ;
```


### Passing options

The options `readme`, `package` and `travis` are passed to [doxme][]:

```js
//...
  .pipe(doxme(
    { readme: true
    , package: {/*...*/}
    , travis: true
    }))
```



License
-------

[MIT][] © [Tomek Wiszniewski][].

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
