var assert = require('should');
var jstrs = require('../.');
var util = require('util');
var printValue;
function print(value) {
  if (typeof printValue !== 'undefined') {
    throw new Error('Test case does not match.');
  }
  printValue = value;
}
describe("./src/jstrs.js", function () {
  printValue = undefined;
  it("format():array", function () {
    print(jstrs.format('#{0} #{1}', [1, 2]));
    assert.equal(printValue, "1 2"); printValue = undefined;
  });
  it("format():object", function () {
    print(jstrs.format('#{level} -- #{color}', {
      color: 'red',
      level: 2
    }));
    assert.equal(printValue, "2 -- red"); printValue = undefined;
  });
  it("format():undefined", function () {
    print(jstrs.format('#{level} -- #{color}', {
      color: 'red'
    }));
    assert.equal(printValue, " -- red"); printValue = undefined;
  });
  it("format():function", function () {
    // "*" 替换成 "*"
    print(jstrs.format(function () {
    /*
      #{color}: #{level}
    */
    }, {
      color: 'red',
      level: 2
    }));
    assert.equal(printValue, "red: 2"); printValue = undefined;
  });
  it("encodeUTF8():base", function () {
    print(encodeURI(jstrs.encodeUTF8('汉')));
    assert.equal(printValue, "%C3%A6%C2%B1%C2%89"); printValue = undefined;
  });
  it("encodeUTF8():ascii", function () {
    print(jstrs.encodeUTF8('ascii'));
    assert.equal(printValue, "ascii"); printValue = undefined;
  });
  it("decodeUTF8():base", function () {
    print(jstrs.decodeUTF8(decodeURI("%C3%A6%C2%B1%C2%89")));
    assert.equal(printValue, "汉"); printValue = undefined;
  });
  it("decodeUTF8():ascii", function () {
    print(jstrs.decodeUTF8('ascii'));
    assert.equal(printValue, "ascii"); printValue = undefined;
  });
  it("decodeHTML():base", function () {
    print(jstrs.decodeHTML('1&nbsp;&lt;&nbsp;2'));
    assert.equal(printValue, "1 < 2"); printValue = undefined;
  });
  it("decodeHTML():hex", function () {
    print(jstrs.decodeHTML('&#x33;&#x34;&#97;'));
    assert.equal(printValue, "34a"); printValue = undefined;
  });
  it("encodeHTML():base", function () {
    print(jstrs.encodeHTML('1 < 2'));
    assert.equal(printValue, "1&nbsp;&lt;&nbsp;2"); printValue = undefined;
  });
  it("util_format():base", function () {
    print(jstrs.util_format(1, null, false, NaN, 'ok', {}, [1, 2], function () {}));
    assert.equal(printValue, "1 null false NaN \"ok\" {} [1,2] [Function]"); printValue = undefined;
  });
  it("util_format():%% %s %j %d", function () {
    print(jstrs.util_format('%% %s %j %d', 1, null, false));
    assert.equal(printValue, "% 1 null 0"); printValue = undefined;
  });
  it("util_format():%s %s", function () {
    print(jstrs.util_format('%s %s', 1));
    assert.equal(printValue, "1 %s"); printValue = undefined;
  });
  it("util_format():circular", function () {
    var a = { x: 1 };
    a.a = a;
    print(jstrs.util_format('%j', a));
    assert.equal(printValue, "[Circular]"); printValue = undefined;
  });
  it("util_format():one string", function () {
    print(jstrs.util_format('hello'));
    assert.equal(printValue, "hello"); printValue = undefined;
  });
  it("util_format():depth > 3", function () {
    var a = { d1: { d2: { d3: { d4: 1, d5: { x: 1, y: 2 } } }, d2_1: 21 }};
    print(jstrs.util_format(a));
    assert.equal(printValue, "{d1:{d2:{d3:[...]},d2_1:21}}"); printValue = undefined;
  });
  it("util_format():window", function () {
    var window = {
      addEventListener: function() {},
      toString: function () { return 'Window{}'; }
    };
    print(jstrs.util_format(window));
    assert.equal(printValue, "Window{}"); printValue = undefined;
  });
  it("util_format():some param", function () {
    print(jstrs.util_format('x = %d, y = %d', 1, 2, {a:1}, null, 5));
    assert.equal(printValue, "x = 1, y = 2 {a:1} null 5"); printValue = undefined;
  });
});
