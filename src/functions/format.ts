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