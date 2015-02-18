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

This approach is quick and simple.

Takes a JSON file as input (such as that coming from [gulp-dox][]).

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

This approach gives you more power. Among other things it allows you to process output from dox before passing it to gulp-doxme.

Takes `file.data` as input (for example coming from [gulp-data]):

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
