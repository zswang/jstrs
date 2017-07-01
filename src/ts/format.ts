/*<function name="format">*/
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
  '''</example>'''
 */
function format(template: string, json: { [key: string]: any }) {
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

/**
 * @see https://github.com/nodejs/node/blob/master/lib/util.js
 */

/*<function name="util_tryStringify">*/
/**
 * 转换为 JSON 字符串
 *
 * @param arg 数据
 * @return 返回 JSON 字符串，如果出现循环引用则返回 "[Circular]"
 */
function util_tryStringify(arg: object) {
  try {
    return JSON.stringify(arg);
  } catch (_) {
    return '[Circular]'
  }
}
/*</function>*/

/*<function name="util_inspect">*/
function util_inspect(value: any, depth: number = 0): string {
  if (depth >= 3) {
    return '[...]'
  }
  switch (typeof value) {
    case 'function':
      return '[Function]'
    case 'string':
      return JSON.stringify(value)
    case 'number':
      return isNaN(value) ? 'NaN' : String(value)
    case 'object':
      if (value === null) {
        return 'null'
      }
      if (Array.isArray(value)) {
        return '[' + value.slice(0, 10).map(function(item) {
          return util_inspect(item, depth + 1)
        }).join(',') + ']'
      }
      if (value.addEventListener) { // DOM
        return String(value)
      }
      let text: string[] = []
      Object.keys(value).forEach(function(key) {
        text.push(key + ':' + util_inspect(value[key], depth + 1))
      })
      return '{' + text.join(',') + '}'
    default:
      return String(value)
  }
}
/*</function>*/

/*<function name="util_format" depend="util_tryStringify,util_inspect">*/
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
function util_format(...params: any[]) {
  let f = params[0]
  if (typeof f !== 'string') {
    return params.map((item) => {
      return util_inspect(item)
    }).join(' ')
  }

  let argLen = arguments.length
  let argv = arguments

  if (argLen === 1) {
    return f
  }
  let a = 1
  let str = f.replace(/%([%dsj])/g, (all, flag) => {
    if (a >= argLen) {
      return all
    }
    switch (flag) {
      case '%':
        return '%'
      case 'd':
        return String(Number(argv[a++]))
      case 'j':
        return util_tryStringify(argv[a++])
      case 's':
        return String(argv[a++])
    }
    return ''
  })

  while (a < argLen) {
    let x = arguments[a++]
    if (x === null || typeof x !== 'object') {
      str += ' ' + x
    } else {
      str += ' ' + util_inspect(x)
    }
  }
  return str;
}
/*</function>*/

export {
  format,
  util_format,
}