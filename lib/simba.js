var Item = require('./item');
var _ = require('underscore');

/**
 * Simba constructor
 * If no parent is given, this Simba will be a root.
 *
 * @param {Simba} parent Parent containe, this parameter is optional. 
 * @return {Simba} The Simba
 */
var Simba = function (parent) {
  this.items = {};

  if (typeof parent !== 'undefined') {
    this.parent = parent;
  }

  return this;
};

/**
 * Add a new item
 * 
 * @param {String} name Name of the item
 * @param {Function} type Type of the item (String, Boolean, Function, Number, Object)
 * @param {mixed} value Value of the item
 * @param {Boolean} required True if item value is required
 * @param {String} description Description of the item
 * @return {Item} The item
 */
Simba.prototype.add = function (name, type, value, required, description) {
  var item = new Item(this, name, type, value, required, description);

  this.lastAdded = this.items[name] = item;

  return item;
};

/**
 * Return the Simba of the last added item
 *
 * @return {Simba} Simba of the last added item
 */
Simba.prototype.children = function () {
  var container = new Simba(this);

  this.lastAdded.value = container;

  return container;
};

/**
 * Return the parent of the Simba
 *
 * @return {Simba} Parent of the Simba
 */
Simba.prototype.end = Simba.prototype.getParent = function () {
  return this.parent;
};

/**
 * Return the value from a key
 *
 * @return {mixed|undefined} The value or undefined if no value exists
 */
Simba.prototype.get = function(name) {
  if (_.has(this.items, name)) {
    return this.items[name].getValue();
  } else {
    return undefined;
  }
};

/**
 * Return the config of the Simba
 *
 * @return {Object} The config as json object
 */
Simba.prototype.getConfig = Simba.prototype.toJson = function() {
  var json = {};

  for (var key in this.items) {
    json[key] = this.items[key].toJson();
  }

  return json;
};

/**
 * Override the values of the Simba
 *
 * @param {Object} object The object
 * @return {Object} The overriden Simba
 */
Simba.prototype.overrideValues = function(object) {
  for (var key in object) {
    if (_.has(this.items, key)) {
      this.items[key].overrideValues(object[key]);
    }
  }
  return this;
};


module.exports = Simba;