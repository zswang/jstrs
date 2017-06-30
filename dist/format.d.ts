/**
 * 格式化函数
 *
 * @param template 模板
 * @param json 数据项
 '''<example>'''
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
  '''</example>'''
  */
declare function format(template: string, json: {
    [key: string]: any;
}): string;
/**
 * 系统风格的格式化输出
 *
 * @param f 格式化字符，或者是输出序列
 * @return 返回格式化的结果
 '''<example>'''
 * @example util_format():base
  ```js
  console.log(jstrs.util_format(1, null, false, NaN, 'ok', {}, [1, 2], function () {}));
  // > 1 null false NaN "ok" {} [1,2] [Function]
  ```
  * @example util_format():%% %s %j %d
  ```js
  console.log(jstrs.util_format('%% %s %j %d', 1, null, false));
  // > % 1 null 0
  ```
  * @example util_format():%s %s
  ```js
  console.log(jstrs.util_format('%s %s', 1));
  // > 1 %s
  ```
  * @example util_format():circular
  ```js
  let a = { x: 1 };
  a.a = a;
  console.log(jstrs.util_format('%j', a));
  // > [Circular]
  ```
  * @example util_format():one string
  ```js
  console.log(jstrs.util_format('hello'));
  // > hello
  ```
  * @example util_format():depth > 3
  ```js
  let a = { d1: { d2: { d3: { d4: 1, d5: { x: 1, y: 2 } } }, d2_1: 21 }};
  console.log(jstrs.util_format(a));
  // > {d1:{d2:{d3:[...]},d2_1:21}}
  ```
  * @example util_format():window
  ```js
  let window = {
    addEventListener: function() {},
    toString: function () { return 'Window{}'; }
  };
  console.log(jstrs.util_format(window));
  // > Window{}
  ```
  * @example util_format():some param
  ```js
  console.log(jstrs.util_format('x = %d, y = %d', 1, 2, {a:1}, null, 5));
  // > x = 1, y = 2 {a:1} null 5
  ```
  '''</example>'''
  */
declare function util_format(...params: any[]): string;
export { format, util_format };
