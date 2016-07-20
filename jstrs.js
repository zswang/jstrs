(function (exportName) {
  var exports = exports || {};
  /**
   * @file jstrs
   *
   * String functions
   * @author
   *   zswang (http://weibo.com/zswang)
   * @version 0.0.37
   * @date 2016-07-20
   */
  /*<function name="format">*/
  /**
   * 格式化函数
   *
   * @param {string} template 模板
   * @param {object} json 数据项
   '''<example>'''
   * @example format():array
    ```js
    console.log(jstrs.format('#{0} #{1}', [1, 2]));
    // > 1 2
    ```
   * @example format():object
    ```js
    console.log(jstrs.format('#{level} -- #{color}', {
      color: 'red',
      level: 2
    }));
    // > 2 -- red
    ```
   * @example format():undefined
    ```js
    console.log(jstrs.format('#{level} -- #{color}', {
      color: 'red'
    }));
    // >  -- red
    ```
   * @example format():function
   '''<jdists encoding="regex" pattern="/~/g" replacement="*" trigger="example">'''
    ```js
    // "~" 替换成 "*"
    console.log(jstrs.format(function () {
    /~
      #{color}: #{level}
    ~/
    }, {
      color: 'red',
      level: 2
    }));
    // > red: 2
    ```
   '''</jdists>'''
   '''</example>'''
   */
  function format(template, json) {
    /*<funcTemplate>*/
    if (typeof template === 'function') { // 函数多行注释处理
      template = String(template).replace(
        /[^]*\/\*!?\s*|\s*\*\/[^]*/g, // 替换掉函数前后部分
        ''
      );
    }
    /*</funcTemplate>*/
    return template.replace(/#\{(.*?)\}/g, function (all, key) {
      return json && (key in json) ? json[key] : "";
    });
  }
  /*</function>*/
  exports.format = format;
  /*<function name="encodeUTF8">*/
  /**
   * 对字符串进行 utf8 编码
   *
   * param {string} str 原始字符串
   '''<example>'''
   * @example encodeUTF8():base
    ```js
    console.log(encodeURI(jstrs.encodeUTF8('汉')));
    // > %C3%A6%C2%B1%C2%89
    ```
   * @example encodeUTF8():ascii
    ```js
    console.log(jstrs.encodeUTF8('ascii'));
    // > ascii
    ```
   '''</example>'''
   */
  function encodeUTF8(str) {
    if (/[\u0080-\uffff]/.test(str)) {
      return unescape(encodeURIComponent(str));
    }
    return str;
  }
  /*</function>*/
  exports.encodeUTF8 = encodeUTF8;
  /*<function name="decodeUTF8">*/
  /**
   * 对 utf8 字符串进行解码
   *
   * @param {string} str 编码字符串
   '''<example>'''
   * @example decodeUTF8():base
    ```js
    console.log(jstrs.decodeUTF8(decodeURI("%C3%A6%C2%B1%C2%89")));
    // > 汉
    ```
   * @example decodeUTF8():ascii
    ```js
    console.log(jstrs.decodeUTF8('ascii'));
    // > ascii
    ```
   '''</example>'''
   */
  function decodeUTF8(str) {
    if (/[\u00c0-\u00df][\u0080-\u00bf]/.test(str) ||
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/.test(str)) {
      return decodeURIComponent(escape(str));
    }
    return str;
  }
  /*</function>*/
  exports.decodeUTF8 = decodeUTF8;
  /*<function name="decodeHTML">*/
  /*
   * html编码转换字典
   */
  var htmlDecodeDict = {
    'quot': '"',
    'lt': '<',
    'gt': '>',
    'amp': '&',
    'nbsp': ' '
  };
  /**
   * HTML解码
   *
   * @param {string} html
   '''<example>'''
   * @example decodeHTML():base
    ```js
    console.log(jstrs.decodeHTML('1&nbsp;&lt;&nbsp;2'));
    // > 1 < 2
    ```
   * @example decodeHTML():hex
    ```js
    console.log(jstrs.decodeHTML('&#x33;&#x34;&#97;'));
    // > 34a
    ```
   '''</example>'''
   */
  function decodeHTML(html) {
    return String(html).replace(
      /&((quot|lt|gt|amp|nbsp)|#x([a-f\d]+)|#(\d+));/ig,
      function (all, group, key, hex, dec) {
        return key ? htmlDecodeDict[key.toLowerCase()] :
          hex ? String.fromCharCode(parseInt(hex, 16)) :
          String.fromCharCode(+dec);
      }
    );
  }
  /*</function>*/
  exports.decodeHTML = decodeHTML;
  /*<function name="encodeHTML">*/
  var htmlEncodeDict = {
    '"': 'quot',
    '<': 'lt',
    '>': 'gt',
    '&': 'amp',
    ' ': 'nbsp'
  };
  /**
   * HTML编码
   *
   * @param {string} text 文本
   '''<example>'''
   * @example encodeHTML():base
    ```js
    console.log(jstrs.encodeHTML('1 < 2'));
    // > 1&nbsp;&lt;&nbsp;2
    ```
   '''</example>'''
   */
  function encodeHTML(text) {
    return String(text).replace(/["<>& ]/g, function (all) {
      return '&' + htmlEncodeDict[all] + ';';
    });
  }
  /*</function>*/
  exports.encodeHTML = encodeHTML;
  /**
   * @see https://github.com/nodejs/node/blob/master/lib/util.js
   */
  /*<function name="util_tryStringify">*/
  /**
   * 转换为 JSON 字符串
   *
   * @param {Any} arg 数据
   * @return {string} 返回 JSON 字符串，如果出现循环引用则返回 "[Circular]"
   */
  function util_tryStringify(arg) {
    try {
      return JSON.stringify(arg);
    }
    catch (_) {
      return '[Circular]';
    }
  }
  /*</function>*/
  /*<function name="util_inspect">*/
  function util_inspect(value, depth) {
    depth = depth || 0;
    if (depth >= 3) {
      return '[...]';
    }
    switch (typeof value) {
    case 'function':
      return '[Function]';
    case 'string':
      return JSON.stringify(value);
    case 'number':
      return isNaN(value) ? 'NaN' : String(value);
    case 'object':
      if (value === null) {
        return 'null';
      }
      if (Array.isArray(value)) {
        return '[' + value.slice(0, 10).map(function (item) {
          return util_inspect(item, depth + 1);
        }).join(',') + ']';
      }
      if (value.addEventListener) { // DOM
        return String(value);
      }
      var text = [];
      Object.keys(value).forEach(function (key) {
        text.push(key + ':' + util_inspect(value[key], depth + 1));
      });
      return '{' + text.join(',') + '}';
    default:
      return String(value);
    }
  }
  /*</function>*/
  /*<function name="util_format" depend="util_tryStringify,util_inspect">*/
  /**
   * 系统风格的格式化输出
   *
   * @param {String|Any} f 格式化字符，或者是输出序列
   * @return {string} 返回格式化的结果
   '''<example>'''
   * @example util_format():base
    ```js
    console.log(jstrs.util_format(1, null, false, NaN, 'ok', {}, [1, 2], function () {}));
    // > 1 null false NaN "ok" {} [1,2] [Function]
    ```
   * @example util_format():%% %s %j %d
    ```js
    console.log(jstrs.util_format('%% %s %j %d', 1, null, false));
    // > % 1 null 0
    ```
   * @example util_format():%s %s
    ```js
    console.log(jstrs.util_format('%s %s', 1));
    // > 1 %s
    ```
   * @example util_format():circular
    ```js
    var a = { x: 1 };
    a.a = a;
    console.log(jstrs.util_format('%j', a));
    // > [Circular]
    ```
   * @example util_format():one string
    ```js
    console.log(jstrs.util_format('hello'));
    // > hello
    ```
   * @example util_format():depth > 3
    ```js
    var a = { d1: { d2: { d3: { d4: 1, d5: { x: 1, y: 2 } } }, d2_1: 21 }};
    console.log(jstrs.util_format(a));
    // > {d1:{d2:{d3:[...]},d2_1:21}}
    ```
   * @example util_format():window
    ```js
    var window = {
      addEventListener: function() {},
      toString: function () { return 'Window{}'; }
    };
    console.log(jstrs.util_format(window));
    // > Window{}
    ```
   * @example util_format():some param
    ```js
    console.log(jstrs.util_format('x = %d, y = %d', 1, 2, {a:1}, null, 5));
    // > x = 1, y = 2 {a:1} null 5
    ```
   '''</example>'''
   */
  function util_format(f) {
    if (typeof f !== 'string') {
      return [].slice.call(arguments).map(function (item) {
        return util_inspect(item);
      }).join(' ');
    }
    var argLen = arguments.length;
    var argv = arguments;
    if (argLen === 1) {
      return f;
    }
    var a = 1;
    var str = f.replace(/%([%dsj])/g, function (all, flag) {
      if (a >= argLen) {
        return all;
      }
      switch (flag) {
      case '%':
        return '%';
      case 'd':
        return Number(argv[a++]);
      case 'j':
        return util_tryStringify(argv[a++]);
      case 's':
        return String(argv[a++]);
      }
    });
    while (a < argLen) {
      var x = arguments[a++];
      if (x === null || typeof x !== 'object') {
        str += ' ' + x;
      }
      else {
        str += ' ' + util_inspect(x);
      }
    }
    return str;
  }
  /*</function>*/
  exports.util_format = util_format;
  /*<function name="camelCase">*/
  /**
   * 将字符串转换为驼峰命名
   *
   * @param {String} text 字符串
   * @return {String} 返回驼峰字符串
   '''<example>'''
   * @example camelCase():base
    ```js
    console.log(jstrs.camelCase('box-width'));
    // > boxWidth
    ```
   * @example camelCase():Upper & _
    ```js
    console.log(jstrs.camelCase('BOX_WIDTH'));
    // > boxWidth
    ```
   * @example camelCase():First char is _
    ```js
    console.log(jstrs.camelCase('_BOX_WIDTH'));
    // > BoxWidth
    ```
   * @example camelCase():none
    ```js
    console.log(jstrs.camelCase('width'));
    // > width
    ```
   * @example camelCase():Number
    ```js
    console.log(JSON.stringify(jstrs.camelCase(123)));
    // > 123
    ```
   '''</example>'''
   */
  function camelCase(text) {
    if (!text || typeof text !== 'string') { // 非字符串直接返回
      return text;
    }
    var result = text.toLowerCase();
    if (text.indexOf('_') >= 0 || text.indexOf('-') >= 0) {
      result = result.replace(/[-_]+([a-z])/ig, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    return result;
  }
  /*</function>*/
  exports.camelCase = camelCase;
  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function () {
        return exports;
      });
    }
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }
  else {
    window[exportName] = exports;
  }
})('jstrs');