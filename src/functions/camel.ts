/*<function name="camelCase">*/
/**
 * 将字符串转换为驼峰命名
 *
 * @param text 字符串
 * @return 返回驼峰字符串
 * @see https://github.com/sindresorhus/camelcase
 * @example camelCase():base
  ```js
  console.log(jstrs.camelCase('box-width'))
  // > boxWidth

  console.log(jstrs.camelCase('boxWidth'))
  // > boxWidth
  ```
  * @example camelCase():Upper
  ```js
  console.log(jstrs.camelCase('FOÈ-BAR'))
  // > foèBar
  console.log(jstrs.camelCase('FBBazzy'))
  // > fbBazzy
  ```
  * @example camelCase():Upper & _
  ```js
  console.log(jstrs.camelCase('BOX_WIDTH'))
  // > boxWidth
  ```
  * @example camelCase():First char is _
  ```js
  console.log(jstrs.camelCase('_BOX_WIDTH'))
  // > boxWidth
  ```
  * @example camelCase():none
  ```js
  console.log(jstrs.camelCase('width'))
  // > width
  ```
  * @example camelCase():Number
  ```js
  console.log(JSON.stringify(jstrs.camelCase(123)))
  // > "123"
  ```
  */
function camelCase(text: string): string {
  return String(text)
    .replace(
      /([a-z][^A-Z]*)([A-Z])|([A-Z])([A-Z][a-z])/g,
      (...params: string[]) => {
        return (params[1] || params[3]) + '-' + (params[2] || params[4])
      }
    )
    .replace(/^[_.\- ]+/, '')
    .toLowerCase()
    .replace(/[_.\- ]+(\w|$)/g, (...params: string[]) => {
      return params[1].toUpperCase()
    })
} /*</function>*/

export { camelCase }
