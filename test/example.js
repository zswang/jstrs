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
  it("decodeUTF8():base", function () {
    print(jstrs.decodeUTF8(decodeURI("%C3%A6%C2%B1%C2%89")));
    assert.equal(printValue, "汉"); printValue = undefined;
  });
  it("decodeHTML():base", function () {
    print(jstrs.decodeHTML('1&nbsp;&lt;&nbsp;2'));
    assert.equal(printValue, "1 < 2"); printValue = undefined;
  });
  it("encodeHTML():base", function () {
    print(jstrs.encodeHTML('1 < 2'));
    assert.equal(printValue, "1&nbsp;&lt;&nbsp;2"); printValue = undefined;
  });
});
