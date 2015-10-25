export default function (request, reply) {

  // encoding functions http://www.rfc-editor.org/rfc/rfc6265.txt
  // follows same patterns as 'cookies-js' that is used on the client
  function cleanName(name) {
    name = name.replace(/[^#$&+\^`|]/g, encodeURIComponent);
    return name.replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  function cleanValue(value) {
    return (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
  }

  return {

    get(name) {
      return request.state[name] && decodeURIComponent(request.state[name]) ||
        undefined;
    },

    set(name, value, options = {}) {
      reply.state(cleanName(name), cleanValue(value), {
        // use hapi defaults if values are falsy
        isSecure: options.secure || false,
        path: options.path || null,
        ttl: options.expires || null,
        domain: options.domain || null
      });
    }

  };

}