'use strict';

var assert = require('assert');

/**
 * A linked list.
 * @exports List
 * @constructor
 */

function List() {
  if (!(this instanceof List))
    return new List();

  this.head = null;
  this.tail = null;
  this.size = 0;
}

/**
 * Reset the cache. Clear all items.
 */

List.prototype.reset = function reset() {
  var item, next;

  for (item = this.head; item; item = next) {
    next = item.next;
    item.prev = null;
    item.next = null;
  }

  assert(!item);

  this.head = null;
  this.tail = null;
  this.size = 0;
};

/**
 * Remove the first item in the list.
 */

List.prototype.shift = function shift() {
  var item = this.head;

  if (!item)
    return;

  this.remove(item);

  return item;
};

/**
 * Prepend an item to the linked list (sets new head).
 * @private
 * @param {ListItem}
 */

List.prototype.unshift = function unshift(item) {
  return this.insert(null, item);
};

/**
 * Append an item to the linked list (sets new tail).
 * @private
 * @param {ListItem}
 */

List.prototype.push = function push(item) {
  return this.insert(this.tail, item);
};

/**
 * Remove the last item in the list.
 */

List.prototype.pop = function pop() {
  var item = this.tail;

  if (!item)
    return;

  this.remove(item);

  return item;
};

/**
 * Insert item into the linked list.
 * @private
 * @param {ListItem|null} ref
 * @param {ListItem} item
 */

List.prototype.insert = function insert(ref, item) {
  if (item.prev || item.next || item === this.head)
    return false;

  assert(!item.prev);
  assert(!item.next);

  if (ref == null) {
    if (!this.head) {
      this.head = item;
      this.tail = item;
    } else {
      this.head.prev = item;
      item.next = this.head;
      this.head = item;
    }
    this.size++;
    return true;
  }

  item.next = ref.next;
  item.prev = ref;
  ref.next = item;

  if (ref === this.tail)
    this.tail = item;

  this.size++;

  return true;
};

/**
 * Remove item from the linked list.
 * @private
 * @param {ListItem}
 */

List.prototype.remove = function remove(item) {
  if (!item.prev && !item.next && item !== this.head)
    return false;

  if (item.prev)
    item.prev.next = item.next;

  if (item.next)
    item.next.prev = item.prev;

  if (item === this.head)
    this.head = item.next;

  if (item === this.tail)
    this.tail = item.prev || this.head;

  if (!this.head)
    assert(!this.tail);

  if (!this.tail)
    assert(!this.head);

  item.prev = null;
  item.next = null;

  this.size--;

  return true;
};

/**
 * Slice the list to an array of items.
 * @param {Number} total
 * @returns {Object[]}
 */

List.prototype.slice = function slice(total) {
  var items = [];
  var item, next;

  if (total == null)
    total = Infinity;

  for (item = this.head; item; item = next) {
    next = item.next;
    item.prev = null;
    item.next = null;

    this.size--;

    items.push(item);

    if (items.length === total)
      break;
  }

  if (next) {
    this.head = next;
    next.prev = null;
  } else {
    this.head = null;
    this.tail = null;
  }

  return items;
};

/**
 * Convert the list to an array of items.
 * @returns {Object[]}
 */

List.prototype.toArray = function toArray() {
  var items = [];
  var item;

  for (item = this.head; item; item = item.next)
    items.push(item);

  return items;
};

/**
 * Represents an LRU item.
 * @constructor
 * @private
 * @param {String} key
 * @param {Object} value
 */

function ListItem(value) {
  this.next = null;
  this.prev = null;
}

/*
 * Expose
 */

exports = List;
exports.Item = ListItem;

module.exports = exports;