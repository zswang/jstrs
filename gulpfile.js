/*jshint globalstrict: true*/
/*global require*/

'use strict'

const gulp = require('gulp')
const util = require('util')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const jdists = require('gulp-jdists')
const typescript = require('gulp-typescript')
const examplejs = require('gulp-examplejs')
const pkg = require('./package')
const merge2 = require('merge2')

gulp.task('build', function () {
  var tsResult = gulp.src('src/*.ts')
    .pipe(jdists())
    .pipe(gulp.dest('lib'))
    .pipe(typescript({
      target: 'ES5',
      declaration: true,
      module: 'umd',
    }))

  return merge2([
    tsResult.dts.pipe(gulp.dest('lib')),
    tsResult.js
      .pipe(replace(
        /(\(function\s*\()(factory\)\s*\{)/, '$1root, $2\n    /* istanbul ignore next */'
      ))
      .pipe(replace(
        /(define\(\["require",\s*"exports"\],\s*factory\);\s*\})/, '$1 else { factory(null, root["' + pkg.name + '"] = {}); }'
      ))
      .pipe(replace(
        /(\s*\}\s*\)\s*\()(function\s*\(require,\s*exports\)\s*\{)/, '$1this, $2'
      ))
      .pipe(gulp.dest('lib'))
  ])
})

gulp.task('uglify', function () {
  gulp.src(`lib/${pkg.name}.js`)
    .pipe(uglify())
    .pipe(rename(`${pkg.name}.min.js`))
    .pipe(gulp.dest('lib'))
})

gulp.task('example', function () {
  return gulp.src('lib/jstrs.js')
    .pipe(jdists({
      trigger: 'example'
    }))
    .pipe(examplejs({
      header: `
const jstrs = require('../')

global.atob = function atob(str) {
  return new Buffer(str, 'base64').toString('binary')
}

global.btoa = function btoa(str) {
  var buffer

  if (str instanceof Buffer) {
    buffer = str
  } else {
    buffer = new Buffer(str.toString(), 'binary')
  }

  return buffer.toString('base64')
}
      `
    }))
    .pipe(gulp.dest('test'))
})

gulp.task('dist', ['build', 'example', 'uglify'])