/**
 * @file jstrs
 *
 * String functions
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 1.0.1
 * @date 2017-09-30
  */
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
declare function base64URIDecode(data: string): string;
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
declare function base64URIEncode(data: string): string;
export { base64URIDecode, base64URIEncode };
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
declare function camelCase(text: string): string;
export { camelCase };
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
declare function format(template: string | Function, json: {
    [key: string]: any;
}): string;
export { format };
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
declare function decodeHTML(html: string): string;
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
declare function encodeHTML(text: string): string;
export { encodeHTML, decodeHTML };
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
declare function encodeUTF8(str: string): string;
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
declare function decodeUTF8(str: string): string;
export { encodeUTF8, decodeUTF8 };
