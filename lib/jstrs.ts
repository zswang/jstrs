/**
 * @file jstrs
 *
 * String functions
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 1.0.0
 * @date 2017-09-30
  */
  /*<function name="camelCase">*/
/**
 * 将字符串转换为驼峰命名
 *
 * @param text 字符串
 * @return 返回驼峰字符串
 * @example camelCase():base
  ```js
  console.log(jstrs.camelCase('box-width'))
  // > boxWidth
  ```
  * @example camelCase():Upper & _
  ```js
  console.log(jstrs.camelCase('BOX_WIDTH'))
  // > boxWidth
  ```
  * @example camelCase():First char is _
  ```js
  console.log(jstrs.camelCase('_BOX_WIDTH'))
  // > BoxWidth
  ```
  * @example camelCase():none
  ```js
  console.log(jstrs.camelCase('width'))
  // > width
  ```
  * @example camelCase():Number
  ```js
  console.log(JSON.stringify(jstrs.camelCase(123)))
  // > 123
  ```
  */
function camelCase(text: string): string {
  if (typeof text !== 'string') { // 非字符串直接返回
    return text
  }
  let result = text.toLowerCase()
  if (text.indexOf('_') >= 0 || text.indexOf('-') >= 0) {
    result = result.replace(/[-_]+([a-z])/ig, (...params: string[]) => {
      let letter = params[1]
      return letter.toUpperCase()
    })
  }
  return result
}
/*</function>*/
export {
  camelCase,
}
  /*<function name="format">*/
/**
 * 格式化函数
 *
 * @param template 模板
 * @param json 数据项
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
  '''<jdists encoding="regex" pattern="/~/g" replacement="*" trigger="example" desc="~ 替换成 *">'''
  ```js
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
 */
function format(template: string | Function, json: { [key: string]: any }): string {
  /*<funcTemplate>*/
  if (typeof template === 'function') { // 函数多行注释处理
    template = String(template).replace(
      /[^]*\/\*!?\s*|\s*\*\/[^]*/g, // 替换掉函数前后部分
      ''
    )
  }
  /*</funcTemplate>*/
  return template.replace(/#\{(.*?)\}/g, (...params: string[]) => {
    let key = params[1]
    return json && (key in json) ? json[key] : ''
  })
}
/*</function>*/
export {
  format,
}
  /*<function name="decodeHTML">*/
/**
 * html编码转换字典
 */
let htmlDecodeDict: {
  [key: string]: string
} = {
    'quot': '"',
    'lt': '<',
    'gt': '>',
    'amp': '&',
    'nbsp': '\u00a0',
  }
/**
 * HTML解码
 *
 * @param html
 * @example decodeHTML():base
  ```js
  console.log(jstrs.decodeHTML('&#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&quot;'))
  // > '1' < "2"
  ```
  * @example decodeHTML():hex
  ```js
  console.log(jstrs.decodeHTML('&#x33;&#x34;&#97;'))
  // > 34a
  ```
  */
function decodeHTML(html: string): string {
  return html.replace(
    /&((quot|lt|gt|amp|nbsp)|#x([a-f\d]+)|#(\d+));/ig,
    (...params: string[]) => {
      let key = params[2]
      let hex = params[3]
      let dec = params[4]
      return key ? htmlDecodeDict[key.toLowerCase()] :
        hex ? String.fromCharCode(parseInt(hex, 16)) :
          String.fromCharCode(+dec)
    }
  )
}
/*</function>*/
/*<function name="encodeHTML">*/
let htmlEncodeDict: {
  [key: string]: string
} = {
    '"': '#34',
    "'": '#39',
    '<': 'lt',
    '>': 'gt',
    '&': 'amp',
    '\u00a0': 'nbsp',
  }
/**
 * HTML编码
 *
 * @param text 文本
 * @example encodeHTML():base
  ```js
  console.log(jstrs.encodeHTML('\'1\' < "2"'))
  // > &#39;1&#39;&nbsp;&lt;&nbsp;&#34;2&#34;
  ```
  */
function encodeHTML(text: string): string {
  return text.replace(/["<>& ']/g, (all) => {
    return '&' + htmlEncodeDict[all] + ';'
  })
}
/*</function>*/
export {
  encodeHTML,
  decodeHTML,
}
/*<function name="base64URIDecode" depend="decodeUTF8">*/
/**
 * 进行 bas64 解码
 *
 * @param data base64 字符
 * @return 返回解码后的内容
 * @example base64URIDecode():base
   ```js
   console.log(jstrs.base64URIDecode('RmFzdENHSSBQcm9jZXNzIE1hbmFnZXI'))
   // > FastCGI Process Manager
   console.log(jstrs.base64URIDecode('WnN3YW5n'))
   // > Zswang
   console.log(jstrs.base64URIDecode('byjila_ilqHilbApbw'))
   // > o(╯□╰)o
   ```
 */
function base64URIDecode(data: string): string {
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
   console.log(jstrs.base64URIEncode('FastCGI Process Manager'))
   // > RmFzdENHSSBQcm9jZXNzIE1hbmFnZXI
    console.log(jstrs.base64URIEncode('Zswang'))
    // > WnN3YW5n
    console.log(jstrs.base64URIEncode('o(╯□╰)o'))
    // > byjila_ilqHilbApbw
    ```
  */
function base64URIEncode(data: string): string {
  let dict: {
    [key: string]: string
  } = {
      '+': '-',
      '/': '_',
      '=': ''
    }
  return btoa(encodeUTF8(data)).replace(/[+/=]/g, (all) => {
    return dict[all]
  })
}
/*</function>*/
export {
  base64URIDecode,
  base64URIEncode,
}
  /*<function name="encodeUTF8">*/
declare function unescape(s: string): string
/**
 * 对字符串进行 utf8 编码
 *
 * param str 原始字符串
 * @example encodeUTF8():base
  ```js
  console.log(encodeURI(jstrs.encodeUTF8('汉')))
  // > %C3%A6%C2%B1%C2%89
  ```
  * @example encodeUTF8():ascii
  ```js
  console.log(jstrs.encodeUTF8('ascii'))
  // > ascii
  ```
  */
function encodeUTF8(str: string): string {
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
 * @example decodeUTF8():base
  ```js
  console.log(jstrs.decodeUTF8(decodeURI("%C3%A6%C2%B1%C2%89")))
  // > 汉
  ```
  * @example decodeUTF8():ascii
  ```js
  console.log(jstrs.decodeUTF8('ascii'))
  // > ascii
  ```
  */
function decodeUTF8(str: string): string {
  if (/[\u00c0-\u00df][\u0080-\u00bf]/.test(str) ||
    /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/.test(str)) {
    return decodeURIComponent(escape(str))
  }
  return str
}
/*</function>*/
export {
  encodeUTF8,
  decodeUTF8,
}