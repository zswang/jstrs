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

/*<jdists encoding="glob" pattern="functions/*.ts" export="#functions" />*/
/*<jdists encoding="jhtmls" data="#functions">
forEach(function (filename) {
  !#{'<!--'}jdists import="!#{filename}"!#{'/-->'}
})
</jdists>*/