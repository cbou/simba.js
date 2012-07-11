var Simba = require('../lib/simba');

var root = new Simba();

root
  .add('db')
  .children() 
    .add('host', String, 'localhost')
    .add('port', Number, 27017)
    .add('username', String)
    .add('password', String)
  .end()
;

root.overrideValues({
  db: {
    port: 3306
    , username: 'root'
    , password: 'toor'
  }
});

console.log(root.getConfig());