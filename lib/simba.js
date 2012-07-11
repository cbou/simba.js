var Item = require('./item');
var _ = require('underscore');

var Simba = function (parent) {
  this.items = {};

  if (typeof parent !== 'undefined') {
    this.parent = parent;
  }

  return this;
};

Simba.prototype.add = function (name, type, value, required, description) {
  var item = new Item(this, name, type, value, required, description);

  this.lastAdded = this.items[name] = item;

  return item;
};

Simba.prototype.children = function () {
  var container = new Simba(this);

  this.lastAdded.value = container;

  return container;
};

Simba.prototype.end = function () {
  return this.parent;
};

Simba.prototype.get = function(name) {
  return this.items[name].getValue();
};

Simba.prototype.getConfig = Simba.prototype.toJson = function() {
  var json = {};

  for (var key in this.items) {
    json[key] = this.items[key].toJson();
  }

  return json;
};

Simba.prototype.overrideValues = function(object) {
  for (var key in object) {
    if (_.has(this.items, key)) {
      this.items[key].overrideValues(object[key]);
    }
  }
  return this;
};


module.exports = Simba;