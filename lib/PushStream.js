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

  /**
   * PushStream : a utility Stream to permit to push/pipe in an ready piped stream. It permits to avoid the original stream to be closed by the end of the new incoming stream.
   */
  function PushStream(s) {
    if (!(this instanceof PushStream)) return new PushStream(s)
    if (!(s instanceof stream.Writable) && !(s instanceof stream.Duplex) && !(s instanceof stream.Transform)) throw new Error('Given stream must be a Writable')
    this.s = s
    stream.Writable.call(this, {objectMode: true})
  }
  util.inherits(PushStream, stream.Writable)
  PushStream.prototype._write = function(data, encoding, callback) {
    this.s.push(data)
    callback()
  }
  return PushStream
}())