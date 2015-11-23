(function(exportName) {
  var exports = exports || {};
  /**
   * @file jstrs
   *
   * String functions
   * @author
   *   zswang (http://weibo.com/zswang)
   * @version 0.0.1
   * @date 2015-11-23
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
    if (typeof template === 'function') { // 函数多行注释处理
      template = String(template).replace(
        /[^]*\/\*!?\s*|\s*\*\/[^]*/g, // 替换掉函数前后部分
        ''
      );
    }
    return template.replace(/#\{(.*?)\}/g, function(all, key) {
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
    console.log(jstrs.encodeUTF8('汉'));
    // > æ±
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
    console.log(jstrs.decodeUTF8('æ±'));
    // > 汉
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
   '''</example>'''
   */
  function decodeHTML(html) {
    return String(html).replace(
      /&((quot|lt|gt|amp|nbsp)|#x([a-f\d]+)|#(\d+));/ig,
      function(all, group, key, hex, dec) {
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
    return String(text).replace(/["<>& ]/g, function(all) {
      return '&' + htmlEncodeDict[all] + ';';
    });
  }
  /*</function>*/
  exports.encodeHTML = encodeHTML;
  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function() {
        return exports;
      });
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }
})('jstrs');