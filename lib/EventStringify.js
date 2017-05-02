/*
 * Copyright 2014 Nicolas Lochet Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

module.exports = (function() {
  'use strict'
  var stream = require('stream')
    , util = require('util')
    , Event = require('./Event')

  /**
   * EventStringify : a Stream of type Transform that stringify incoming object data an pipe out stringified object
   */
  function EventStringify() {
    if (!(this instanceof EventStringify)) return new EventStringify()
    stream.Transform.call(this, {objectMode: true})
  }
  util.inherits(EventStringify, stream.Transform)
  EventStringify.prototype._transform = function (data, encoding, callback) {
    try {
      this.push(Event.stringify(data))
      callback()
    } catch(e) {
      callback(e)
    }
  }
  return EventStringify
}())