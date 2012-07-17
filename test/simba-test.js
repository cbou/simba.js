var should = require('should');
var Simba = require('../lib/simba');

describe('new Simba()', function(){
  it('should initialize a simba object', function(){
    var root = new Simba();
    (typeof root).should.equal('object');
  })
});

describe('Simba', function(){
  describe('.add(name, type, value)', function(){
    it('should add a new value', function(){
      var root = new Simba();
      root.add('db', 'myValue');

      root.get('db').should.equal('myValue');
      root.db.should.equal('myValue');
    })
  })

  describe('.getConfig()', function(){
    it('should return a configuration object', function(){
      var root = new Simba();
      root.add('db', 'myValue');

      root.getConfig().should.have.property('db', 'myValue');
      root.db.should.equal('myValue');
    })
  })

  describe('.children()', function(){
    describe('.add(name, type, value)', function(){
      it('should add a new value to the children', function(){
        var root = new Simba();
        root
          .add('db')
          .children()
            .add('hostname', 'localhost');

        var config = root.getConfig();

        config.should.have.property('db');
        config.db.should.have.property('hostname', 'localhost');

        root.db.hostname.should.equal('localhost');
      })
    })
  })

  describe('.end()', function(){
    it('should return the parent container', function(){
      var root = new Simba();
      root
        .add('db')
        .children()
          .add('hostname', 'localhost')
        .end()
        .add('password', 'root');

      var config = root.getConfig();

      config.should.have.property('db');
      config.should.have.property('password', 'root');
      config.db.should.have.property('hostname', 'localhost');
      config.db.should.have.not.property('password');

      root.password.should.equal('root');
      root.db.hostname.should.equal('localhost');
    })
  })

  describe('.setConfig()', function(){
    it('should override the value', function(){
      var root = new Simba();
      root
        .add('db')
        .children()
          .add('hostname', 'localhost')
        .end();

      var config = root.getConfig();

      config.should.have.property('db');
      config.db.should.have.property('hostname', 'localhost');

      root.db.hostname.should.equal('localhost');

      root.setConfig({
        db: {
          hostname: '127.0.0.1'
        }
      });

      var config = root.getConfig();
      
      config.should.have.property('db');
      config.db.should.have.property('hostname', '127.0.0.1');

      root.db.hostname.should.equal('127.0.0.1');
    })
  })
});