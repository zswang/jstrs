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
declare function camelCase(text: string): string;
export { camelCase };
