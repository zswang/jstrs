/*<jdists encoding="ejs" data="../package.json">*/
/**
 * @file <%- name %>
 *
 * <%- description %>
 * @author
     <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
 *   <%- item.name %> (<%- item.url %>)
     <% }); %>
 * @version <%- version %>
     <% let now = new Date() %>
 * @date <%- [
      now.getFullYear(),
      now.getMonth() + 101,
      now.getDate() + 100
    ].join('-').replace(/-1/g, '-') %>
  */
/*</jdists>*/

import { camelCase } from './camel'
import { format, util_format } from './format'
import { decodeUTF8, encodeUTF8 } from './utf8'
import { decodeHTML, encodeHTML } from './html'
import { base64URIDecode, base64URIEncode } from './url'

export default {
  format,
  encodeUTF8,
  decodeUTF8,
  decodeHTML,
  encodeHTML,
  util_format,
  camelCase,
  base64URIDecode,
  base64URIEncode,
}