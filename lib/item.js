
var Item = function (parent, name, type, value, required, description) {
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
}

Item.prototype.getValue = function () {
  return this.value;
};

Item.prototype.toJson = function () {
  if (typeof this.value !== 'undefined' && 
      typeof this.value.toJson === 'function') {
    return this.value.toJson();
  }
  return this.value;
}

Item.prototype.overrideValues = function(value) {
  if (typeof this.value !== 'undefined' && 
      typeof this.value.overrideValues === 'function') {
    return this.value.overrideValues(value);
  }
  this.value = value;
  return this;
}

Item.prototype.add = function () {
  return this.parent.add.apply(this.parent, arguments);
}

Item.prototype.children = function () {
  return this.parent.children.apply(this.parent, arguments);
}

Item.prototype.end = function () {
  return this.parent.end.apply(this.parent, arguments);
}

module.exports = Item;