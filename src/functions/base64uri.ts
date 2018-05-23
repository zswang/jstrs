/*<remove>*/
import { decodeUTF8, encodeUTF8 } from './utf8'
/*</remove>*/

/*<function name="base64URIDecode" depend="decodeUTF8">*/
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
function base64URIDecode(data: string): string {
  let dict: {
    [key: string]: string
  } = {
    '-': '+',
    _: '/',
  }
  return decodeUTF8(
    atob(
      String(data).replace(/[\-_]/g, all => {
        return dict[all]
      })
    )
  )
} /*</function>*/

/*<function name="base64URIDecode" depend="encodeUTF8">*/
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
function base64URIEncode(data: string): string {
  let dict: {
    [key: string]: string
  } = {
    '+': '-',
    '/': '_',
    '=': '',
  }
  return btoa(encodeUTF8(data)).replace(/[+/=]/g, all => {
    return dict[all]
  })
} /*</function>*/

export { base64URIDecode, base64URIEncode }
