var Kiara = require('./kiara');
var _ = require('underscore');

/**
 * Simba constructor
 * If no parent is given, this Simba will be a root.
 *
 * @param {Simba} parent Parent containe, this parameter is optional. 
 * @return {Simba} The Simba
 * @method
 */
var Simba = function (parent) {
  this.kiaras = {};

  if (typeof parent !== 'undefined') {
    this.parent = parent;
  }

  return this;
};

/**
 * Add a new kiara
 * 
 * @param {String} name Name of the kiara
 * @param {Function} type Type of the kiara (String, Boolean, Function, Number, Object)
 * @param {mixed} value Value of the kiara
 * @param {Boolean} required True if kiara value is required
 * @param {String} description Description of the kiara
 * @return {Kiara} The kiara
 * @method
 */
Simba.prototype.add = function (name, type, value, required, description) {
  var kiara = new Kiara(this, name, type, value, required, description);

  this.lastAdded = this.kiaras[name] = kiara;

  return kiara;
};

/**
 * Return the Simba of the last added kiara
 *
 * @return {Simba} Simba of the last added kiara
 * @method
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
 * @method
 */
Simba.prototype.end = Simba.prototype.getParent = function () {
  return this.parent;
};

/**
 * Return the value from a key
 *
 * @return {mixed|undefined} The value or undefined if no value exists
 * @method
 */
Simba.prototype.get = function(name) {
  if (_.has(this.kiaras, name)) {
    return this.kiaras[name].getValue();
  } else {
    return undefined;
  }
};

/**
 * Return the config of the Simba
 *
 * @return {Object} The config as json object
 * @method
 */
Simba.prototype.getConfig = Simba.prototype.toJson = function() {
  var json = {};

  for (var key in this.kiaras) {
    json[key] = this.kiaras[key].toJson();
  }

  return json;
};

/**
 * Override the values of the Simba
 *
 * @param {Object} object The object
 * @return {Object} The overriden Simba
 * @method
 */
Simba.prototype.overrideValues = function(object) {
  for (var key in object) {
    if (_.has(this.kiaras, key)) {
      this.kiaras[key].overrideValues(object[key]);
    }
  }
  return this;
};


module.exports = Simba;