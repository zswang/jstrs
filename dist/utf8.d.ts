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
declare function encodeUTF8(str: string): string;
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
declare function decodeUTF8(str: string): string;
export { encodeUTF8, decodeUTF8 };
