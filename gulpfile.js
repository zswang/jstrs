/*jshint globalstrict: true*/
/*global require*/

'use strict';

var gulp = require('gulp');
var util = require('util');
var jdists = require('gulp-jdists');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var examplejs = require('gulp-examplejs');

gulp.task('build', function() {
  return gulp.src(['src/jstrs.js'])
    .pipe(jdists({
      trigger: 'release'
    }))
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(rename('jstrs.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('example', function() {
  return gulp.src('src/**.js')
    .pipe(jdists({
      trigger: 'example'
    }))
    .pipe(examplejs({
      header: `
var jstrs = require('../');

global.atob = function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
}

global.btoa = function btoa(str) {
  var buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'binary');
  }

  return buffer.toString('base64');
}
      `
    }))
    .pipe(gulp.dest('test'));
});

gulp.task('default', ['build']);