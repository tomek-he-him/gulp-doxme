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

```js
var gulp = require("gulp");
var dox = require("gulp-dox");
var doxme = require("gulp-doxme");

gulp.src("*.js")
  .pipe(dox({readme: true}))
  .pipe(doxme())
  .pipe(gulp.dest("Readme.md"))
  ;
```

Read through [doxme][] to see what happens under the hood and learn about the available options.




License
-------

[MIT][] © [Tomek Wiszniewski][].

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
