/*<jdists encoding="ejs" data="../package.json">*/
/**
 * @file <%- name %>
 *
 * <%- description %>
 * @author
     <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
 *   <%- item.name %> (<%- item.url %>)
     <% }); %>
 * @version <%- version %>
     <% let now = new Date() %>
 * @date <%- [
      now.getFullYear(),
      now.getMonth() + 101,
      now.getDate() + 100
    ].join('-').replace(/-1/g, '-') %>
  */
/*</jdists>*/

/*<function name="format">*/
/**
 * 格式化函数
 *
 * @param template 模板
 * @param json 数据项
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
  '''</example>'''
  */
function format(template: string, json: object) {
  return template.replace(/#\{(.*?)\}/g, function(all, key) {
    return json && (key in json) ? json[key] : ''
  })
}
/*</function>*/

/*<function name="encodeUTF8">*/
declare function unescape(s: string): string
/**
 * 对字符串进行 utf8 编码
 *
 * param str 原始字符串
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

function encodeUTF8(str: string) {
  if (/[\u0080-\uffff]/.test(str)) {
    return unescape(encodeURIComponent(str))
  }
  return str
}
/*</function>*/

/*<function name="decodeUTF8">*/
declare function escape(s: string): string
/**
 * 对 utf8 字符串进行解码
 *
 * @param str 编码字符串
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
function decodeUTF8(str: string) {
  if (/[\u00c0-\u00df][\u0080-\u00bf]/.test(str) ||
    /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/.test(str)) {
    return decodeURIComponent(escape(str))
  }
  return str
}
/*</function>*/

/*<function name="decodeHTML">*/
/*
  * html编码转换字典
  */
let htmlDecodeDict = {
  'quot': '"',
  'lt': '<',
  'gt': '>',
  'amp': '&',
  'nbsp': ' '
}
/**
 * HTML解码
 *
 * @param html
 '''<example>'''
 * @example decodeHTML():base
  ```js
  console.log(jstrs.decodeHTML('&#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&quot;'));
  // > '1' < "2"
  ```
  * @example decodeHTML():hex
  ```js
  console.log(jstrs.decodeHTML('&#x33;&#x34;&#97;'));
  // > 34a
  ```
  '''</example>'''
  */
function decodeHTML(html: string) {
  return html.replace(
    /&((quot|lt|gt|amp|nbsp)|#x([a-f\d]+)|#(\d+));/ig,
    function(all, group, key, hex, dec) {
      return key ? htmlDecodeDict[key.toLowerCase()] :
        hex ? String.fromCharCode(parseInt(hex, 16)) :
        String.fromCharCode(+dec)
    }
  )
}
/*</function>*/

/*<function name="encodeHTML">*/
let htmlEncodeDict = {
  '"': '#34',
  "'": '#39',
  '<': 'lt',
  '>': 'gt',
  '&': 'amp',
  ' ': 'nbsp'
}
/**
 * HTML编码
 *
 * @param text 文本
 '''<example>'''
 * @example encodeHTML():base
  ```js
  console.log(jstrs.encodeHTML('\'1\' < "2"'));
  // > &#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&#34;
  ```
  '''</example>'''
  */
function encodeHTML(text: string) {
  return text.replace(/["<>& ']/g, function (all) {
    return '&' + htmlEncodeDict[all] + ';'
  })
}
/*</function>*/

/**
 * @see https://github.com/nodejs/node/blob/master/lib/util.js
 */

/*<function name="util_tryStringify">*/
/**
 * 转换为 JSON 字符串
 *
 * @param arg 数据
 * @return 返回 JSON 字符串，如果出现循环引用则返回 "[Circular]"
 */
function util_tryStringify(arg: object) {
  try {
    return JSON.stringify(arg);
  } catch (_) {
    return '[Circular]'
  }
}
/*</function>*/

/*<function name="util_inspect">*/
function util_inspect(value: any, depth: number = 0) {
  if (depth >= 3) {
    return '[...]'
  }
  switch (typeof value) {
    case 'function':
      return '[Function]'
    case 'string':
      return JSON.stringify(value)
    case 'number':
      return isNaN(value) ? 'NaN' : String(value)
    case 'object':
      if (value === null) {
        return 'null'
      }
      if (Array.isArray(value)) {
        return '[' + value.slice(0, 10).map(function(item) {
          return util_inspect(item, depth + 1)
        }).join(',') + ']'
      }
      if (value.addEventListener) { // DOM
        return String(value)
      }
      let text = []
      Object.keys(value).forEach(function(key) {
        text.push(key + ':' + util_inspect(value[key], depth + 1))
      })
      return '{' + text.join(',') + '}'
    default:
      return String(value)
  }
}
/*</function>*/

/*<function name="util_format" depend="util_tryStringify,util_inspect">*/
/**
 * 系统风格的格式化输出
 *
 * @param f 格式化字符，或者是输出序列
 * @return 返回格式化的结果
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
  let a = { x: 1 };
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
  let a = { d1: { d2: { d3: { d4: 1, d5: { x: 1, y: 2 } } }, d2_1: 21 }};
  console.log(jstrs.util_format(a));
  // > {d1:{d2:{d3:[...]},d2_1:21}}
  ```
  * @example util_format():window
  ```js
  let window = {
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
function util_format(f: string | any) {
  if (typeof f !== 'string') {
    return [].slice.call(arguments).map(function(item) {
      return util_inspect(item)
    }).join(' ')
  }

  let argLen = arguments.length
  let argv = arguments

  if (argLen === 1) {
    return f
  }
  let a = 1
  let str = f.replace(/%([%dsj])/g, (all, flag) => {
    if (a >= argLen) {
      return all
    }
    switch (flag) {
      case '%':
        return '%'
      case 'd':
        return String(argv[a++])
      case 'j':
        return util_tryStringify(argv[a++])
      case 's':
        return String(argv[a++])
    }
  })

  while (a < argLen) {
    let x = arguments[a++]
    if (x === null || typeof x !== 'object') {
      str += ' ' + x
    } else {
      str += ' ' + util_inspect(x)
    }
  }
  return str;
}
/*</function>*/

/*<function name="camelCase">*/
/**
 * 将字符串转换为驼峰命名
 *
 * @param text 字符串
 * @return 返回驼峰字符串
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
function camelCase(text: string) {
  let result = text.toLowerCase()
  if (text.indexOf('_') >= 0 || text.indexOf('-') >= 0) {
    result = result.replace(/[-_]+([a-z])/ig, (all, letter) => {
      return letter.toUpperCase()
    })
  }
  return result
}
/*</function>*/

/*<function name="base64URIDecode" depend="decodeUTF8">*/
/**
 * 进行 bas64 解码
 *
 * @param data base64 字符
 * @return 返回解码后的内容
 * @example base64URIDecode():base
   ```js
   console.log(jstrs.base64URIDecode('RmFzdENHSSBQcm9jZXNzIE1hbmFnZXI'));
   // > FastCGI Process Manager
   console.log(jstrs.base64URIDecode('WnN3YW5n'));
   // > Zswang
   console.log(jstrs.base64URIDecode('byjila_ilqHilbApbw'));
   // > o(╯□╰)o
   ```
 */
function base64URIDecode(data: string) {
  return decodeUTF8(atob(String(data).replace('-', '+').replace('_', '/')))
}
/*</function>*/

/*<function name="base64URIDecode" depend="encodeUTF8">*/
/**
 * 进行 bas64 编码
 *
 * @param data 字符串
 * @return 返回编码后的内容
 * @example base64URIEncode():base
   ```js
   console.log(jstrs.base64URIEncode('FastCGI Process Manager'));
   // > RmFzdENHSSBQcm9jZXNzIE1hbmFnZXI

    console.log(jstrs.base64URIEncode('Zswang'));
    // > WnN3YW5n

    console.log(jstrs.base64URIEncode('o(╯□╰)o'));
    // > byjila_ilqHilbApbw
    ```
  */
function base64URIEncode(data: string) {
  return btoa(encodeUTF8(data)).replace(/[+/=]/g, (all) => {
    return {
      '+': '-',
      '/': '_',
      '=': ''
    }[all];
  });
}
/*</function>*/

let jstrs = {
  format,
  encodeUTF8,
  decodeUTF8,
  decodeHTML,
  encodeHTML,
  util_format,
  camelCase,
  base64URIDecode,
  base64URIEncode,
}

export {
  jstrs
}