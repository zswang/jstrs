var jstrs = require('../');

describe("src/jstrs.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }

  it("format():array", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.format('#{0} #{1}', [1, 2]));
    assert.equal(examplejs_printLines.join("\n"), "1 2"); examplejs_printLines = [];
  });
  it("format():object", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.format('#{level} -- #{color}', {
      color: 'red',
      level: 2
    }));
    assert.equal(examplejs_printLines.join("\n"), "2 -- red"); examplejs_printLines = [];
  });
  it("format():undefined", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.format('#{level} -- #{color}', {
      color: 'red'
    }));
    assert.equal(examplejs_printLines.join("\n"), " -- red"); examplejs_printLines = [];
  });
  it("format():function", function() {
    examplejs_printLines = [];
    // "*" 替换成 "*"
    examplejs_print(jstrs.format(function () {
    /*
      #{color}: #{level}
    */
    }, {
      color: 'red',
      level: 2
    }));
    assert.equal(examplejs_printLines.join("\n"), "red: 2"); examplejs_printLines = [];
  });
  it("encodeUTF8():base", function() {
    examplejs_printLines = [];
    examplejs_print(encodeURI(jstrs.encodeUTF8('汉')));
    assert.equal(examplejs_printLines.join("\n"), "%C3%A6%C2%B1%C2%89"); examplejs_printLines = [];
  });
  it("encodeUTF8():ascii", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.encodeUTF8('ascii'));
    assert.equal(examplejs_printLines.join("\n"), "ascii"); examplejs_printLines = [];
  });
  it("decodeUTF8():base", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.decodeUTF8(decodeURI("%C3%A6%C2%B1%C2%89")));
    assert.equal(examplejs_printLines.join("\n"), "汉"); examplejs_printLines = [];
  });
  it("decodeUTF8():ascii", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.decodeUTF8('ascii'));
    assert.equal(examplejs_printLines.join("\n"), "ascii"); examplejs_printLines = [];
  });
  it("decodeHTML():base", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.decodeHTML('&#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&quot;'));
    assert.equal(examplejs_printLines.join("\n"), "'1' < \"2\""); examplejs_printLines = [];
  });
  it("decodeHTML():hex", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.decodeHTML('&#x33;&#x34;&#97;'));
    assert.equal(examplejs_printLines.join("\n"), "34a"); examplejs_printLines = [];
  });
  it("encodeHTML():base", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.encodeHTML('\'1\' < "2"'));
    assert.equal(examplejs_printLines.join("\n"), "&#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&#34;"); examplejs_printLines = [];
  });
  it("util_format():base", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.util_format(1, null, false, NaN, 'ok', {}, [1, 2], function () {}));
    assert.equal(examplejs_printLines.join("\n"), "1 null false NaN \"ok\" {} [1,2] [Function]"); examplejs_printLines = [];
  });
  it("util_format():%% %s %j %d", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.util_format('%% %s %j %d', 1, null, false));
    assert.equal(examplejs_printLines.join("\n"), "% 1 null 0"); examplejs_printLines = [];
  });
  it("util_format():%s %s", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.util_format('%s %s', 1));
    assert.equal(examplejs_printLines.join("\n"), "1 %s"); examplejs_printLines = [];
  });
  it("util_format():circular", function() {
    examplejs_printLines = [];
    var a = { x: 1 };
    a.a = a;
    examplejs_print(jstrs.util_format('%j', a));
    assert.equal(examplejs_printLines.join("\n"), "[Circular]"); examplejs_printLines = [];
  });
  it("util_format():one string", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.util_format('hello'));
    assert.equal(examplejs_printLines.join("\n"), "hello"); examplejs_printLines = [];
  });
  it("util_format():depth > 3", function() {
    examplejs_printLines = [];
    var a = { d1: { d2: { d3: { d4: 1, d5: { x: 1, y: 2 } } }, d2_1: 21 }};
    examplejs_print(jstrs.util_format(a));
    assert.equal(examplejs_printLines.join("\n"), "{d1:{d2:{d3:[...]},d2_1:21}}"); examplejs_printLines = [];
  });
  it("util_format():window", function() {
    examplejs_printLines = [];
    var window = {
      addEventListener: function() {},
      toString: function () { return 'Window{}'; }
    };
    examplejs_print(jstrs.util_format(window));
    assert.equal(examplejs_printLines.join("\n"), "Window{}"); examplejs_printLines = [];
  });
  it("util_format():some param", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.util_format('x = %d, y = %d', 1, 2, {a:1}, null, 5));
    assert.equal(examplejs_printLines.join("\n"), "x = 1, y = 2 {a:1} null 5"); examplejs_printLines = [];
  });
  it("camelCase():base", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.camelCase('box-width'));
    assert.equal(examplejs_printLines.join("\n"), "boxWidth"); examplejs_printLines = [];
  });
  it("camelCase():Upper & _", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.camelCase('BOX_WIDTH'));
    assert.equal(examplejs_printLines.join("\n"), "boxWidth"); examplejs_printLines = [];
  });
  it("camelCase():First char is _", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.camelCase('_BOX_WIDTH'));
    assert.equal(examplejs_printLines.join("\n"), "BoxWidth"); examplejs_printLines = [];
  });
  it("camelCase():none", function() {
    examplejs_printLines = [];
    examplejs_print(jstrs.camelCase('width'));
    assert.equal(examplejs_printLines.join("\n"), "width"); examplejs_printLines = [];
  });
  it("camelCase():Number", function() {
    examplejs_printLines = [];
    examplejs_print(JSON.stringify(jstrs.camelCase(123)));
    assert.equal(examplejs_printLines.join("\n"), "123"); examplejs_printLines = [];
  });
});