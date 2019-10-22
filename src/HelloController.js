import Controller from './lib/controller';
import nunjucks from 'nunjucks';

function getName(context) {
  // default values
  let name = {
    fname: 'Rick',
    lname: 'Sanchez'
  };
  // split path params
  let nameParts = context.params.name ? context.params.name.split('/') : [];

  // order of precedence
  // 1. path param
  // 2. query param
  // 3. default value
  name.fname = (nameParts[0] || context.query.fname) ||
    name.fname;
  name.lname = (nameParts[1] || context.query.lname) ||
    name.lname;

  return name;
}

export default class HelloController extends Controller {

  toString(callback) {

    nunjucks.render('hello.html', getName(this.context), (err, html) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, html);
    });
  }

}