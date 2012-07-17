/**
 * Kiara constructor
 *
 * Kiara represent a configuration value.
 * 
 * @param {Simba} parent Parent of the kiara
 * @param {String} name Name of the kiara
 * @param {mixed} value Value of the kiara
 * @param {String} description Description of the kiara
 * @return {Kiara} The kiara
 * @function
 */
var Kiara = function (parent, name, value, description) {
  this.parent = parent;

  if (typeof name !== 'undefined') {
    this.name = name;
  }
  if (typeof description !== 'undefined') {
    this.description = description;
  }
  if (typeof value !== 'undefined') {
    this.value = value;
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
 * Set the value of the Kiara
 *
 * @param {mixed} The value to set
 * @return {Kiara} The kiara
 * @method
 */
Kiara.prototype.setValue = function (value) {
  this.value = value;
  return this;
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
Kiara.prototype.setConfig = function(value) {
  // If the value is a Simba
  if (typeof this.value !== 'undefined' && 
      typeof this.value.setConfig === 'function') {
    return this.value.setConfig(value);
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