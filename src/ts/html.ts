/*<function name="decodeHTML">*/
/*
  * html编码转换字典
  */
let htmlDecodeDict: {
  [key: string]: string
} = {
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

export {
  encodeHTML,
  decodeHTML,
}