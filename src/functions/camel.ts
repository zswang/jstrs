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