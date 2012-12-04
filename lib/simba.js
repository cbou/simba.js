/**
 * ```
 *                    ,   __, ,
 *    _.._         )\/(,-' (-' `.__
 *   /_   `-.      )'_      ` _  (_    _.---._
 *  // \     `-. ,'   `-.    _\`.  `.,'   ,--.\
 * // -.\       `        `.  \`.   `/   ,'   ||
 * || _ `\_         ___    )  )     \  /,-'  ||
 * ||  `---\      ,'__ \   `,' ,--.  \/---. //
 *  \\  .---`.   / /  | |      |,-.\ |`-._ //
 *   `..___.'|   \ |,-| |      |_  )||\___//
 *     `.____/    \\\O| |      \o)// |____/
 *          /      `---/        \-'  \
 *          |        ,'|,--._.--')    \
 *          \       /   `n     n'\    /
 *           `.   `<   .::`-,-'::.) ,'
 *             `.   \-.____,^.   /,'
 *               `. ;`.,-V-.-.`v'
 *                 \| \     ` \|\
 *                  ;  `-^---^-'/
 *                   `-.______,'
 * ```
 */
(function() {

  var root = this;

  /**
   * Simba constructor
   *
   * Simba is the container of Kiara.
   *
   * If no parent is given, this Simba will be a root.
   *
   * @param {Simba} parent Parent containe, this parameter is optional. 
   * @return {Simba} The Simba
   * @function
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
   * @param {mixed} value Value of the kiara
   * @param {String} description Description of the kiara
   * @return {Kiara} The kiara
   * @method
   */
  Simba.prototype.add = function (name, value, description) {

    var me = this;
    me.__defineGetter__(name, function() { return me.get(name); });
    me.__defineSetter__(name, function(value) { return me.set(name, value); });
    
    var kiara = new Kiara(this, name, value, description);

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
    if (has(this.kiaras, name)) {
      return this.kiaras[name].getValue();
    } else {
      return undefined;
    }
  };

  /**
   * Set the value a kiara
   *
   * @param {mixed} The value to set
   * @return {Simba} The simba
   * @method
   */
  Simba.prototype.set = function(name, value) {
    if (has(this.kiaras, name)) {
      this.kiaras[name].setValue(value)
    }
    return this;
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
  Simba.prototype.setConfig = function(object) {
    for (var key in object) {
      if (has(this.kiaras, key)) {
        this.kiaras[key].setConfig(object[key]);
      }
    }
    return this;
  };

  function has(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

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

  // Export the Simba object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `Simba` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Simba;
    }
    exports.Simba = Simba;
  } else {
    root.Simba = Simba;
  }

}).call(this);