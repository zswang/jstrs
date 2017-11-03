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
  // > 123
  ```
  */
function camelCase(text: string): string {
  if (typeof text !== 'string') { // 非字符串直接返回
    return text
  }

  return text.replace(/([a-z][^A-Z]*)([A-Z])|([A-Z])([A-Z][a-z])/g, (all, $1, $2, $3, $4) => {
    all
    return ($1 || $3) + '-' + ($2 || $4)
  }).replace(/^[_.\- ]+/, '')
    .toLowerCase()
    .replace(/[_.\- ]+(\w|$)/g, (all, $1) => {
      all
      return $1.toUpperCase()
    })
} /*</function>*/

export {
  camelCase,
}