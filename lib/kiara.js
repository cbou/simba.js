/**
 * Kiara constructor
 *
 * Kiara represent a configuration value.
 * 
 * @param {Simba} parent Parent of the kiara
 * @param {String} name Name of the kiara
 * @param {Function} type Type of the kiara (String, Boolean, Function, Number, Object)
 * @param {mixed} value Value of the kiara
 * @param {Boolean} required True if kiara value is required
 * @param {String} description Description of the kiara
 * @return {Kiara} The kiara
 * @function
 */
var Kiara = function (parent, name, type, value, required, description) {
  this.parent = parent;

  if (typeof name !== 'undefined') {
    this.name = name;
  }
  if (typeof type !== 'undefined') {
    this.type = type;
  }
  if (typeof description !== 'undefined') {
    this.description = description;
  }
  if (typeof value !== 'undefined') {
    this.value = value;
  }
  if (typeof required !== 'undefined') {
    this.required = required;
  }

  return this;
};

/**
 * Return the value of the Kiara
 *
 * @return {mixed} The value of the kiara
 * @method
 */
Kiara.prototype.getValue = function () {
  return this.value;
};

/**
 * Return the json representation of the kiara
 * If the Kiara contains other kiara, it will go recursively
 *
 * @return {Object} The json representation of the kiara
 * @method
 */
Kiara.prototype.toJson = function () {
  if (typeof this.value !== 'undefined' && 
      typeof this.value.toJson === 'function') {
    return this.value.toJson();
  }
  return this.value;
};

/**
 * Override the values of the kiara
 * If the Kiara contains other kiara, it will go recursively
 *
 * @return {Kiara} The kiara
 * @method
 */
Kiara.prototype.overrideValues = function(value) {
  if (typeof this.value !== 'undefined' && 
      typeof this.value.overrideValues === 'function') {
    return this.value.overrideValues(value);
  }
  this.value = value;
  return this;
};

/**
 * Call parent.add function
 * 
 * @see Kiara.add
 * @method
 */
Kiara.prototype.add = function () {
  return this.parent.add.apply(this.parent, arguments);
};

/**
 * Call parent.children function
 * 
 * @see Kiara.children
 * @method
 */
Kiara.prototype.children = function () {
  return this.parent.children.apply(this.parent, arguments);
};


/**
 * Call parent.end function
 * 
 * @see Kiara.end
 * @method
 */
Kiara.prototype.end = function () {
  return this.parent.end.apply(this.parent, arguments);
};

module.exports = Kiara;