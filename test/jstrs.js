
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
      
describe("lib/jstrs.js", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }

  it("base64URIDecode():base", function() {
    examplejs_printLines = [];
       examplejs_print(jstrs.base64URIDecode('RmFzdENHSSBQcm9jZXNzIE1hbmFnZXI'))
       assert.equal(examplejs_printLines.join("\n"), "FastCGI Process Manager"); examplejs_printLines = [];
       examplejs_print(jstrs.base64URIDecode('WnN3YW5n'))
       assert.equal(examplejs_printLines.join("\n"), "Zswang"); examplejs_printLines = [];
       examplejs_print(jstrs.base64URIDecode('byjila_ilqHilbApbw'))
       assert.equal(examplejs_printLines.join("\n"), "o(╯□╰)o"); examplejs_printLines = [];
  });
  it("base64URIEncode():base", function() {
    examplejs_printLines = [];
       examplejs_print(jstrs.base64URIEncode('FastCGI Process Manager'))
       assert.equal(examplejs_printLines.join("\n"), "RmFzdENHSSBQcm9jZXNzIE1hbmFnZXI"); examplejs_printLines = [];
        examplejs_print(jstrs.base64URIEncode('Zswang'))
        assert.equal(examplejs_printLines.join("\n"), "WnN3YW5n"); examplejs_printLines = [];
        examplejs_print(jstrs.base64URIEncode('o(╯□╰)o'))
        assert.equal(examplejs_printLines.join("\n"), "byjila_ilqHilbApbw"); examplejs_printLines = [];
  });
  it("camelCase():base", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.camelCase('box-width'))
      assert.equal(examplejs_printLines.join("\n"), "boxWidth"); examplejs_printLines = [];
  });
  it("camelCase():Upper & _", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.camelCase('BOX_WIDTH'))
      assert.equal(examplejs_printLines.join("\n"), "boxWidth"); examplejs_printLines = [];
  });
  it("camelCase():First char is _", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.camelCase('_BOX_WIDTH'))
      assert.equal(examplejs_printLines.join("\n"), "BoxWidth"); examplejs_printLines = [];
  });
  it("camelCase():none", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.camelCase('width'))
      assert.equal(examplejs_printLines.join("\n"), "width"); examplejs_printLines = [];
  });
  it("camelCase():Number", function() {
    examplejs_printLines = [];
      examplejs_print(JSON.stringify(jstrs.camelCase(123)))
      assert.equal(examplejs_printLines.join("\n"), "123"); examplejs_printLines = [];
  });
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
  it("decodeHTML():base", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.decodeHTML('&#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&quot;'))
      assert.equal(examplejs_printLines.join("\n"), "'1' < \"2\""); examplejs_printLines = [];
  });
  it("decodeHTML():hex", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.decodeHTML('&#x33;&#x34;&#97;'))
      assert.equal(examplejs_printLines.join("\n"), "34a"); examplejs_printLines = [];
  });
  it("encodeHTML():base", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.encodeHTML('\'1\' < "2"'))
      assert.equal(examplejs_printLines.join("\n"), "&#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&#34;"); examplejs_printLines = [];
  });
  it("encodeUTF8():base", function() {
    examplejs_printLines = [];
      examplejs_print(encodeURI(jstrs.encodeUTF8('汉')))
      assert.equal(examplejs_printLines.join("\n"), "%C3%A6%C2%B1%C2%89"); examplejs_printLines = [];
  });
  it("encodeUTF8():ascii", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.encodeUTF8('ascii'))
      assert.equal(examplejs_printLines.join("\n"), "ascii"); examplejs_printLines = [];
  });
  it("decodeUTF8():base", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.decodeUTF8(decodeURI("%C3%A6%C2%B1%C2%89")))
      assert.equal(examplejs_printLines.join("\n"), "汉"); examplejs_printLines = [];
  });
  it("decodeUTF8():ascii", function() {
    examplejs_printLines = [];
      examplejs_print(jstrs.decodeUTF8('ascii'))
      assert.equal(examplejs_printLines.join("\n"), "ascii"); examplejs_printLines = [];
  });
});