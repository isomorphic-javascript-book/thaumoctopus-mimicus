export default function (application) {

  const reply = function () {};

  reply.redirect = function (url) {
    application.navigate(url);
    return this;
  };

  reply.temporary = function () {
    return this;
  },

  reply.rewritable = function () {
    return this;
  },

  reply.permanent = function () {
    return this;
  }

  return reply;

}