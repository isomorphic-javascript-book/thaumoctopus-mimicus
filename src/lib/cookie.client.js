import cookie from 'cookies-js';

export default {

  get(name) {
    return cookie.get(name) || undefined;
  },

  set(name, value, options = {}) {
    // convert milliseconds to seconds for cookies-js api
    if (options.expires) {
      options.expires / 1000;
    }
    cookie.set(name, value, options);
  }

}