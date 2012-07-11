# Simba

Simba is a simple but powerful configuration tool

## Installation

```bash
$ npm install simba
```

## Quick Start

```javascript
var Simba = require('simba');
var simba = new Simba();

simba
  .add('db')
  .children() 
    .add('host', String, 'localhost')
    .add('port', String)
    .add('username', String)
    .add('password', String)
  .end()
;

simba.overrideValues({
  db: {
    localhost: '127.0.0.1'
    , port: 3306
    , username: 'root'
    , password: 'toor'
  }
});

var config = simba.getConfig();
/*
    { db: 
       { host: '127.0.0.1',
         port: 3306,
         username: 'root',
         password: 'toor' } }
*/
```

## Test

```bash
$ npm test
```

## License

(The MIT License)

Copyright (c) 2012 Charles Bourasseau charles.bourasseau@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.