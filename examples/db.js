var Simba = require('../lib/simba');

var root = new Simba();

root
  .add('db')
  .children() 
    .add('host', String, 'localhost')
    .add('port', String)
    .add('username', String)
    .add('password', String)
  .end()
;

console.log(root.getConfig());