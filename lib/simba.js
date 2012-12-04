var Kiara = require('./kiara');

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


module.exports = Simba;