import Controller from './lib/controller';
import nunjucks from 'nunjucks';

// configure nunjucks to read from the dist directory
nunjucks.configure('./dist');

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
    // read template and compile using context object
    nunjucks.render('index.html', getName(this.context), (err, html) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, html);
    });
  }

}