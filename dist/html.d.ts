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
declare function decodeHTML(html: string): string;
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
declare function encodeHTML(text: string): string;
export { encodeHTML, decodeHTML };
