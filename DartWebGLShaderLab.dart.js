function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_lib_msg"], {
 toString$0: function() {
  if (this._lib_msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._lib_msg);
  }
  return t0;
 },
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_lib_numberOfDeleted", "_lib_numberOfEntries", "_lib_loadLimit", "_lib_values", "_lib_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._lib_probeForLookup$1(key), -1);
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._lib_keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(f, 1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    var key = $.index(this._lib_keys, i);
    if (key !== (void 0) && key !== $.CTC7) {
      f.$call$2(key, $.index(this._lib_values, i));
    }
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._lib_keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        var key = $.index(this._lib_keys, i);
        if (key !== (void 0) && key !== $.CTC7) {
          f.$call$2(key, $.index(this._lib_values, i));
        }
        i = i + 1;
      }
  }
 },
 get$length: function() {
  return this._lib_numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._lib_numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._lib_probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  }
  return $.index(this._lib_values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._lib_ensureCapacity$0();
  var index = this._lib_probeForAdding$1(key);
  if ($.index(this._lib_keys, index) === (void 0) || $.index(this._lib_keys, index) === $.CTC7) {
    this._lib_numberOfEntries = $.add(this._lib_numberOfEntries, 1);
  }
  $.indexSet(this._lib_keys, index, key);
  $.indexSet(this._lib_values, index, value);
 },
 clear$0: function() {
  this._lib_numberOfEntries = 0;
  this._lib_numberOfDeleted = 0;
  var length$ = $.get$length(this._lib_keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    $.indexSet(this._lib_keys, i, (void 0));
    $.indexSet(this._lib_values, i, (void 0));
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      this._lib_numberOfEntries = 0;
      this._lib_numberOfDeleted = 0;
      var length$ = $.get$length(this._lib_keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        $.indexSet(this._lib_keys, i, (void 0));
        $.indexSet(this._lib_values, i, (void 0));
        i = i + 1;
      }
  }
 },
 _lib_grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._lib_keys);
  if (typeof capacity !== 'number') return this._lib_grow$1$bailout(newCapacity, 1, capacity);
  this._lib_loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._lib_keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._lib_grow$1$bailout(newCapacity, 2, capacity, oldKeys);
  var oldValues = this._lib_values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._lib_grow$1$bailout(newCapacity, 3, capacity, oldKeys, oldValues);
  this._lib_keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._lib_values = t0;
  for (var i = 0; i < capacity; i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC7) {
      continue;
    }
    var t3 = oldValues.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var t4 = oldValues[i];
    var newIndex = this._lib_probeForAdding$1(t2);
    $.indexSet(this._lib_keys, newIndex, t2);
    $.indexSet(this._lib_values, newIndex, t4);
  }
  this._lib_numberOfDeleted = 0;
 },
 _lib_grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      break;
    case 2:
      capacity = env0;
      oldKeys = env1;
      break;
    case 3:
      capacity = env0;
      oldKeys = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._lib_keys);
    case 1:
      state = 0;
      this._lib_loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._lib_keys;
    case 2:
      state = 0;
      var oldValues = this._lib_values;
    case 3:
      state = 0;
      this._lib_keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._lib_values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          if (key === (void 0) || key === $.CTC7) {
            break c$0;
          }
          var value = $.index(oldValues, i);
          var newIndex = this._lib_probeForAdding$1(key);
          $.indexSet(this._lib_keys, newIndex, key);
          $.indexSet(this._lib_values, newIndex, value);
        }
        i = i + 1;
      }
      this._lib_numberOfDeleted = 0;
  }
 },
 _lib_ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._lib_numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._lib_loadLimit)) {
    this._lib_grow$1($.mul($.get$length(this._lib_keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._lib_keys), newNumberOfEntries), this._lib_numberOfDeleted);
  if ($.gtB(this._lib_numberOfDeleted, numberOfFree)) {
    this._lib_grow$1($.get$length(this._lib_keys));
  }
 },
 _lib_probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib_keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    numberOfProbes0 = numberOfProbes;
    hash0 = hash;
    var existingKey = $.index(this._lib_keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    }
    var numberOfProbes1 = numberOfProbes + 1;
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._lib_keys));
    numberOfProbes0 = numberOfProbes1;
    hash0 = hash1;
  }
 },
 _lib_probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib_keys));
  if (hash !== (hash | 0)) return this._lib_probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    numberOfProbes0 = numberOfProbes;
    hash1 = hash0;
    insertionIndex0 = insertionIndex;
    var existingKey = $.index(this._lib_keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        insertionIndex0 = insertionIndex;
        if ($.ltB(insertionIndex, 0) && $.CTC7 === existingKey) {
          insertionIndex0 = hash0;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._lib_keys));
    numberOfProbes0 = numberOfProbes1;
    hash1 = hash2;
  }
 },
 _lib_probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib_keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var numberOfProbes0 = numberOfProbes;
        var hash1 = hash0;
        var insertionIndex0 = insertionIndex;
        var existingKey = $.index(this._lib_keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            insertionIndex0 = insertionIndex;
            if ($.ltB(insertionIndex, 0) && $.CTC7 === existingKey) {
              insertionIndex0 = hash0;
            }
            var numberOfProbes1 = numberOfProbes + 1;
          }
        }
        var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._lib_keys));
        numberOfProbes0 = numberOfProbes1;
        hash1 = hash2;
        numberOfProbes = numberOfProbes0;
        hash0 = hash1;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._lib_numberOfEntries = 0;
  this._lib_numberOfDeleted = 0;
  this._lib_loadLimit = $._computeLoadLimit(8);
  this._lib_keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._lib_values = t0;
 },
 is$Map: function() { return true; },
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_lib_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._lib_backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib_backingMap);
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t0.result_2 = result;
  $.forEach(this._lib_backingMap, new $.Closure12(t0));
  return t0.result_2;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._lib_backingMap, new $.Closure11(t0));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure10(this));
 },
 contains$1: function(value) {
  return this._lib_backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._lib_backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._lib_backingMap);
 },
 HashSetImplementation$0: function() {
  this._lib_backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("HashSetIterator", "Object", ["_lib_nextValidIndex", "_lib_entries"], {
 _lib_advance$0: function() {
  var length$ = $.get$length(this._lib_entries);
  if (typeof length$ !== 'number') return this._lib_advance$0$bailout(1, length$);
  var entry = (void 0);
  do {
    var t0 = $.add(this._lib_nextValidIndex, 1);
    this._lib_nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    }
    entry = $.index(this._lib_entries, this._lib_nextValidIndex);
  } while (entry === (void 0) || entry === $.CTC7);
 },
 _lib_advance$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._lib_entries);
    case 1:
      state = 0;
      var entry = (void 0);
      L0: while (true) {
        var t0 = $.add(this._lib_nextValidIndex, 1);
        this._lib_nextValidIndex = t0;
        if ($.geB(t0, length$)) {
          break;
        }
        entry = $.index(this._lib_entries, this._lib_nextValidIndex);
        if (!(entry === (void 0) || entry === $.CTC7)) break L0;
      }
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var res = $.index(this._lib_entries, this._lib_nextValidIndex);
  this._lib_advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._lib_nextValidIndex, $.get$length(this._lib_entries))) {
    return false;
  }
  if ($.index(this._lib_entries, this._lib_nextValidIndex) === $.CTC7) {
    this._lib_advance$0();
  }
  return $.lt(this._lib_nextValidIndex, $.get$length(this._lib_entries));
 },
 HashSetIterator$1: function(set_) {
  this._lib_advance$0();
 },
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("StopwatchImplementation", "Object", ["_lib_stop", "_lib_start"], {
 frequency$0: function() {
  return $.frequency();
 },
 elapsedInMs$0: function() {
  return $.tdiv($.mul(this.elapsed$0(), 1000), this.frequency$0());
 },
 elapsed$0: function() {
  if (this._lib_start === (void 0)) {
    return 0;
  }
  if (this._lib_stop === (void 0)) {
    var t0 = $.sub($.now(), this._lib_start);
  } else {
    t0 = $.sub(this._lib_stop, this._lib_start);
  }
  return t0;
 },
 reset$0: function() {
  if (this._lib_start === (void 0)) {
    return;
  }
  this._lib_start = $.now();
  if (this._lib_stop !== (void 0)) {
    this._lib_stop = this._lib_start;
  }
 },
 start$0: function() {
  if (this._lib_start === (void 0)) {
    this._lib_start = $.now();
  } else {
    if (this._lib_stop === (void 0)) {
      return;
    }
    this._lib_start = $.sub($.now(), $.sub(this._lib_stop, this._lib_start));
    this._lib_stop = (void 0);
  }
 },
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_lib_length", "_lib_buffer"], {
 toString$0: function() {
  if ($.get$length(this._lib_buffer) === 0) {
    return '';
  }
  if ($.get$length(this._lib_buffer) === 1) {
    return $.index(this._lib_buffer, 0);
  }
  var result = $.concatAll(this._lib_buffer);
  $.clear(this._lib_buffer);
  $.add$1(this._lib_buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._lib_buffer = t0;
  this._lib_length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t0 = $.iterator(objects); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) {
    return this;
  }
  $.add$1(this._lib_buffer, str);
  this._lib_length = $.add(this._lib_length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._lib_length === 0;
 },
 get$length: function() {
  return this._lib_length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 },
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._lib_AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true,
});

Isolate.$defineClass("MatchImplementation", "Object", ["_lib_groups", "_lib_end", "_lib_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._lib_groups, index);
 },
 start$0: function() {
  return this._lib_start;
 },
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_lib_str", "_lib_re"], {
 iterator$0: function() {
  return $._lib_AllMatchesIterator$2(this._lib_re, this._lib_str);
 },
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_lib_done", "_lib_next", "_lib_str", "_lib_re"], {
 hasNext$0: function() {
  if (this._lib_done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._lib_next)) {
      return true;
    }
  }
  this._lib_next = this._lib_re.firstMatch$1(this._lib_str);
  if ($.eqNullB(this._lib_next)) {
    this._lib_done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var next = this._lib_next;
  this._lib_next = (void 0);
  return next;
 },
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 },
});

Isolate.$defineClass("Closure13", "Object", [], {
 toString$0: function() {
  return 'Closure';
 },
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_lib4_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 start$0: function() {
  return this._lib4_start;
 },
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 },
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_lib2_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._lib2_index);
 },
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_lib2_existingArgumentNames", "_lib2_arguments", "_lib2_functionName", "_lib2_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._lib2_arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    }
    sb.add$1($.index(this._lib2_arguments, i));
  }
  if (this._lib2_existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._lib2_functionName) + '\'\nReceiver: ' + $.stringToString(this._lib2_receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._lib2_existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      }
      sb0.add$1($.index(this._lib2_existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._lib2_functionName) + '\'\nReceiver: ' + $.stringToString(this._lib2_receiver) + '\nTried calling: ' + $.stringToString(this._lib2_functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._lib2_functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 },
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 },
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_lib2_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._lib2_arg);
 },
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 },
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 },
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 },
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_lib2_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._lib2_message);
 },
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_lib2_errmsg", "_lib2_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._lib2_pattern) + '\' \'' + $.stringToString(this._lib2_errmsg) + '\'';
 },
});

Isolate.$defineClass("DartWebGLShaderLab", "Object", ["viewY?", "viewX?", "sizeY", "sizeX", "timer", "animation", "mouseY!", "mouseX!", "time", "fps", "frames", "it", "delay", "halted=", "texture_noise_l", "texture_noise_n", "texture_blur", "texture_helper", "texture_main2_n", "texture_main2_l", "texture_main_n", "texture_main_l", "FBO_noise", "FBO_blur", "FBO_helper", "FBO_main2", "FBO_main", "prog_blur_vertical", "prog_blur_horizontal", "prog_composite", "prog_advance", "c", "gl", "watch"], {
 anim$1: function(i) {
  $.document().get$window().webkitRequestAnimationFrame$1(this.get$anim());
  if (this.halted !== true) {
    this.advance$0();
  }
  this.composite$0();
  if ($.geB(this.watch.elapsedInMs$0(), 1000)) {
    this.fps = $.round($.mul(1000, $.div($.toDouble(this.frames), $.toDouble(this.watch.elapsedInMs$0()))));
    var t0 = 'fps=' + $.stringToString(this.fps);
    $.document().query$1('#fps').set$innerHTML(t0);
    this.frames = 0;
    this.watch.reset$0();
  }
 },
 get$anim: function() { return new $.Closure14(this); },
 composite$0: function() {
  this.gl.viewport$4(0, 0, this.viewX, this.viewY);
  this.gl.useProgram$1(this.prog_composite);
  this.setUniforms$1(this.prog_composite);
  if ($.ltB(this.it, 0)) {
    this.gl.activeTexture$1(33984);
    this.gl.bindTexture$2(3553, this.texture_main_l);
    this.gl.activeTexture$1(33985);
    this.gl.bindTexture$2(3553, this.texture_main_n);
  } else {
    this.gl.activeTexture$1(33984);
    this.gl.bindTexture$2(3553, this.texture_main2_l);
    this.gl.activeTexture$1(33985);
    this.gl.bindTexture$2(3553, this.texture_main2_n);
  }
  this.gl.bindFramebuffer$2(36160, (void 0));
  this.gl.drawArrays$3(5, 0, 4);
  this.gl.flush$0();
  this.frames = $.add(this.frames, 1);
 },
 advance$0: function() {
  this.gl.viewport$4(0, 0, this.sizeX, this.sizeY);
  this.gl.useProgram$1(this.prog_advance);
  this.setUniforms$1(this.prog_advance);
  if ($.gtB(this.it, 0)) {
    this.gl.activeTexture$1(33984);
    this.gl.bindTexture$2(3553, this.texture_main_l);
    this.gl.activeTexture$1(33985);
    this.gl.bindTexture$2(3553, this.texture_main_n);
    this.gl.bindFramebuffer$2(36160, this.FBO_main2);
  } else {
    this.gl.activeTexture$1(33984);
    this.gl.bindTexture$2(3553, this.texture_main2_l);
    this.gl.activeTexture$1(33985);
    this.gl.bindTexture$2(3553, this.texture_main2_n);
    this.gl.bindFramebuffer$2(36160, this.FBO_main);
  }
  this.gl.drawArrays$3(5, 0, 4);
  this.gl.flush$0();
  this.calculateBlurTexture$0();
  this.it = $.neg(this.it);
 },
 calculateBlurTexture$0: function() {
  this.gl.viewport$4(0, 0, this.sizeX, this.sizeY);
  this.gl.useProgram$1(this.prog_blur_horizontal);
  this.gl.activeTexture$1(33984);
  if ($.ltB(this.it, 0)) {
    this.gl.bindTexture$2(3553, this.texture_main2_l);
    this.gl.bindFramebuffer$2(36160, this.FBO_helper);
  } else {
    this.gl.bindTexture$2(3553, this.texture_main_l);
    this.gl.bindFramebuffer$2(36160, this.FBO_helper);
  }
  this.gl.drawArrays$3(5, 0, 4);
  this.gl.flush$0();
  this.gl.viewport$4(0, 0, this.sizeX, this.sizeY);
  this.gl.useProgram$1(this.prog_blur_vertical);
  this.gl.activeTexture$1(33984);
  this.gl.bindTexture$2(3553, this.texture_helper);
  this.gl.bindFramebuffer$2(36160, this.FBO_blur);
  this.gl.drawArrays$3(5, 0, 4);
  this.gl.flush$0();
  this.gl.drawArrays$3(5, 0, 4);
  this.gl.flush$0();
 },
 setUniforms$1: function(program) {
  this.gl.uniform2f$3(this.gl.getUniformLocation$2(program, 'pixelSize'), $.div(1.0, this.sizeX), $.div(1.0, this.sizeY));
  this.gl.uniform4f$5(this.gl.getUniformLocation$2(program, 'rnd'), $.random(), $.random(), $.random(), $.random());
  this.gl.uniform1f$2(this.gl.getUniformLocation$2(program, 'fps'), this.fps);
  this.gl.uniform1f$2(this.gl.getUniformLocation$2(program, 'time'), this.time);
  this.gl.uniform2f$3(this.gl.getUniformLocation$2(program, 'aspect'), $.max(1, $.div(this.viewX, this.viewY)), $.max(1, $.div(this.viewY, this.viewX)));
  this.gl.uniform2f$3(this.gl.getUniformLocation$2(program, 'mouse'), this.mouseX, this.mouseY);
  this.gl.uniform1i$2(this.gl.getUniformLocation$2(program, 'sampler_prev'), 0);
  this.gl.uniform1i$2(this.gl.getUniformLocation$2(program, 'sampler_prev_n'), 1);
  this.gl.uniform1i$2(this.gl.getUniformLocation$2(program, 'sampler_blur'), 2);
  this.gl.uniform1i$2(this.gl.getUniformLocation$2(program, 'sampler_noise'), 3);
  this.gl.uniform1i$2(this.gl.getUniformLocation$2(program, 'sampler_noise_n'), 4);
 },
 run$0: function() {
  this.c = $.document().query$1('#c');
  this.gl = $.getWebGLContext(this.c);
  var t0 = this.c;
  var t1 = typeof t0 === 'object' && t0.is$CanvasElement();
  var t2 = !t1;
  if (t1) {
    var t3 = this.gl;
    t2 = !((typeof t3 === 'object') && t3.is$WebGLRenderingContext());
  }
  if (t2) {
    $.print('failed to load canvas');
    return;
  }
  $.add$1($.document().get$on().get$mouseMove(), new $.Closure(this));
  $.add$1($.document().get$on().get$click(), new $.Closure2(this));
  var t4 = this.viewX;
  this.c.set$width(t4);
  var t5 = this.viewY;
  this.c.set$height(t5);
  this.prog_advance = this.gl.createProgram$0();
  this.gl.attachShader$2(this.prog_advance, this.getShader$2(this.gl, '#shader-vs'));
  this.gl.attachShader$2(this.prog_advance, this.getShader$2(this.gl, '#shader-fs-advance'));
  this.gl.linkProgram$1(this.prog_advance);
  this.prog_composite = this.gl.createProgram$0();
  this.gl.attachShader$2(this.prog_composite, this.getShader$2(this.gl, '#shader-vs'));
  this.gl.attachShader$2(this.prog_composite, this.getShader$2(this.gl, '#shader-fs-composite'));
  this.gl.linkProgram$1(this.prog_composite);
  this.prog_blur_horizontal = this.gl.createProgram$0();
  this.gl.attachShader$2(this.prog_blur_horizontal, this.getShader$2(this.gl, '#shader-vs'));
  this.gl.attachShader$2(this.prog_blur_horizontal, this.getShader$2(this.gl, '#shader-fs-blur-horizontal'));
  this.gl.linkProgram$1(this.prog_blur_horizontal);
  this.prog_blur_vertical = this.gl.createProgram$0();
  this.gl.attachShader$2(this.prog_blur_vertical, this.getShader$2(this.gl, '#shader-vs'));
  this.gl.attachShader$2(this.prog_blur_vertical, this.getShader$2(this.gl, '#shader-fs-blur-vertical'));
  this.gl.linkProgram$1(this.prog_blur_vertical);
  var posBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, posBuffer);
  var vertices = $.Float32Array$fromList([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
  var aPosLoc = this.gl.getAttribLocation$2(this.prog_advance, 'aPos');
  this.gl.enableVertexAttribArray$1(aPosLoc);
  var aTexLoc = this.gl.getAttribLocation$2(this.prog_advance, 'aTexCoord');
  this.gl.enableVertexAttribArray$1(aTexLoc);
  var texCoords = $.Float32Array$fromList([0, 0, 1, 0, 0, 1, 1, 1]);
  var texCoordOffset = vertices.get$byteLength();
  this.gl.bufferData$3(34962, $.add(texCoordOffset, texCoords.get$byteLength()), 35044);
  this.gl.bufferSubData$3(34962, 0, vertices);
  this.gl.bufferSubData$3(34962, texCoordOffset, texCoords);
  this.gl.vertexAttribPointer$6(aPosLoc, 3, 5126, false, 0, 0);
  this.gl.vertexAttribPointer$6(aTexLoc, 2, 5126, false, 0, texCoordOffset);
  var noisepixels = [];
  var pixels = [];
  for (var i = 0; $.ltB(i, this.sizeX); i = i + 1) {
    for (var j = 0; $.ltB(j, this.sizeY); j = j + 1) {
      $.add$1(noisepixels, $.mul($.random(), 255));
      $.add$1(noisepixels, $.mul($.random(), 255));
      $.add$1(noisepixels, $.mul($.random(), 255));
      $.add$1(noisepixels, 255);
      $.add$1(pixels, 0);
      $.add$1(pixels, 0);
      $.add$1(pixels, 0);
      $.add$1(pixels, 255);
    }
  }
  var rawData = $.Uint8Array$fromList(noisepixels);
  this.texture_main_l = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_main_l);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData);
  this.gl.texParameteri$3(3553, 10241, 9729);
  this.gl.texParameteri$3(3553, 10240, 9729);
  this.texture_main_n = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_main_n);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData);
  this.gl.texParameteri$3(3553, 10241, 9728);
  this.gl.texParameteri$3(3553, 10240, 9728);
  $.Uint8Array$fromList(noisepixels);
  var rawData0 = $.Uint8Array$fromList(noisepixels);
  this.texture_main2_l = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_main2_l);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData0);
  this.gl.texParameteri$3(3553, 10241, 9729);
  this.gl.texParameteri$3(3553, 10240, 9729);
  this.texture_main2_n = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_main2_n);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData0);
  this.gl.texParameteri$3(3553, 10241, 9728);
  this.gl.texParameteri$3(3553, 10240, 9728);
  var rawData1 = $.Uint8Array$fromList(pixels);
  this.texture_helper = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_helper);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData1);
  this.gl.texParameteri$3(3553, 10241, 9729);
  this.gl.texParameteri$3(3553, 10240, 9729);
  var rawData2 = $.Uint8Array$fromList(pixels);
  this.texture_blur = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_blur);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData2);
  this.gl.texParameteri$3(3553, 10241, 9729);
  this.gl.texParameteri$3(3553, 10240, 9729);
  var rawData3 = $.Uint8Array$fromList(noisepixels);
  this.texture_noise_l = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_noise_l);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData3);
  this.gl.texParameteri$3(3553, 10241, 9729);
  this.gl.texParameteri$3(3553, 10240, 9729);
  this.texture_noise_n = this.gl.createTexture$0();
  this.gl.bindTexture$2(3553, this.texture_noise_n);
  this.gl.pixelStorei$2(3317, 1);
  this.gl.texImage2D$9(3553, 0, 6408, this.sizeX, this.sizeY, 0, 6408, 5121, rawData3);
  this.gl.texParameteri$3(3553, 10241, 9728);
  this.gl.texParameteri$3(3553, 10240, 9728);
  this.FBO_main = this.gl.createFramebuffer$0();
  this.gl.bindFramebuffer$2(36160, this.FBO_main);
  this.gl.framebufferTexture2D$5(36160, 36064, 3553, this.texture_main_l, 0);
  this.FBO_main2 = this.gl.createFramebuffer$0();
  this.gl.bindFramebuffer$2(36160, this.FBO_main2);
  this.gl.framebufferTexture2D$5(36160, 36064, 3553, this.texture_main2_l, 0);
  this.FBO_helper = this.gl.createFramebuffer$0();
  this.gl.bindFramebuffer$2(36160, this.FBO_helper);
  this.gl.framebufferTexture2D$5(36160, 36064, 3553, this.texture_helper, 0);
  this.FBO_blur = this.gl.createFramebuffer$0();
  this.gl.bindFramebuffer$2(36160, this.FBO_blur);
  this.gl.framebufferTexture2D$5(36160, 36064, 3553, this.texture_blur, 0);
  this.FBO_noise = this.gl.createFramebuffer$0();
  this.gl.bindFramebuffer$2(36160, this.FBO_noise);
  this.gl.framebufferTexture2D$5(36160, 36064, 3553, this.texture_noise_l, 0);
  this.gl.useProgram$1(this.prog_advance);
  this.setUniforms$1(this.prog_advance);
  this.gl.useProgram$1(this.prog_blur_horizontal);
  this.gl.uniform2f$3(this.gl.getUniformLocation$2(this.prog_blur_horizontal, 'pixelSize'), $.div(1.0, this.sizeX), $.div(1.0, this.sizeY));
  this.gl.uniform1i$2(this.gl.getUniformLocation$2(this.prog_blur_horizontal, 'src_tex'), 0);
  this.gl.useProgram$1(this.prog_blur_vertical);
  this.gl.uniform2f$3(this.gl.getUniformLocation$2(this.prog_blur_vertical, 'pixelSize'), $.div(1.0, this.sizeX), $.div(1.0, this.sizeY));
  this.gl.uniform1i$2(this.gl.getUniformLocation$2(this.prog_blur_vertical, 'src_tex'), 0);
  this.gl.useProgram$1(this.prog_composite);
  this.setUniforms$1(this.prog_composite);
  this.gl.activeTexture$1(33986);
  this.gl.bindTexture$2(3553, this.texture_blur);
  this.gl.activeTexture$1(33987);
  this.gl.bindTexture$2(3553, this.texture_noise_l);
  this.gl.activeTexture$1(33988);
  this.gl.bindTexture$2(3553, this.texture_noise_n);
  this.calculateBlurTexture$0();
  this.watch = $.StopwatchImplementation$0();
  this.watch.start$0();
  this.anim$1(0);
 },
 getShader$2: function(g, id) {
  return $.createShaderFromScriptElement(g, id);
 },
});

Isolate.$defineClass("_AbstractWorkerEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_AudioContextEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_BatteryManagerEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_BodyElementEventsImpl", "_ElementEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_DOMApplicationCacheEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_DedicatedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_DeprecatedPeerConnectionEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_DocumentEventsImpl", "_ElementEventsImpl", ["_lib3_ptr"], {
 get$reset: function() {
  return this._lib3_get$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this._lib3_get$1('mousemove');
 },
 get$click: function() {
  return this._lib3_get$1('click');
 },
});

Isolate.$defineClass("FilteredElementList", "Object", ["_lib3_childNodes", "_lib3_node"], {
 last$0: function() {
  return $.last(this.get$_lib3_filtered());
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_lib3_filtered(), element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_lib3_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_lib3_filtered());
 },
 operator$index$1: function(index) {
  return $.index(this.get$_lib3_filtered(), index);
 },
 get$length: function() {
  return $.get$length(this.get$_lib3_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_lib3_filtered());
 },
 filter$1: function(f) {
  return $.filter(this.get$_lib3_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    result.remove$0();
  }
  return result;
 },
 clear$0: function() {
  $.clear(this._lib3_childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_lib3_filtered(), start, rangeLength), new $.Closure6());
 },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.add$1(this._lib3_childNodes, value);
 },
 get$add: function() { return new $.Closure15(this); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) {
    return;
  } else {
    if ($.ltB(newLength, 0)) {
      throw $.captureStackTrace($.CTC4);
    }
  }
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_lib3_filtered(), f);
 },
 get$first: function() {
  for (var t0 = $.iterator(this._lib3_childNodes); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (typeof t1 === 'object' && t1.is$Element()) {
      return t1;
    }
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_lib3_filtered: function() {
  return $.List$from($.filter(this._lib3_childNodes, new $.Closure4()));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("_ChildrenElementList", "Object", ["_lib3_childElements", "_lib3_element"], {
 last$0: function() {
  return this._lib3_element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._lib3_element.$dom_removeChild$1(result);
  }
  return result;
 },
 clear$0: function() {
  this._lib3_element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 getRange$2: function(start, rangeLength) {
  return $._lib3_FrozenElementList$_wrap$1($.getRange2(this, start, rangeLength, []));
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._lib3_element.$dom_appendChild$1(t1);
  }
 },
 iterator$0: function() {
  return $.iterator(this._lib3_toList$0());
 },
 add$1: function(value) {
  this._lib3_element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC3);
 },
 operator$indexSet$2: function(index, value) {
  this._lib3_element.$dom_replaceChild$2(value, $.index(this._lib3_childElements, index));
 },
 operator$index$1: function(index) {
  return $.index(this._lib3_childElements, index);
 },
 get$length: function() {
  return $.get$length(this._lib3_childElements);
 },
 isEmpty$0: function() {
  return $.eqNull(this._lib3_element.get$$$dom_firstElementChild());
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var output = [];
  this.forEach$1(new $.Closure5(t0, output));
  return $._lib3_FrozenElementList$_wrap$1(output);
 },
 forEach$1: function(f) {
  for (var t0 = $.iterator(this._lib3_childElements); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return this._lib3_element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _lib3_toList$0: function() {
  var output = $.List($.get$length(this._lib3_childElements));
  var len = $.get$length(this._lib3_childElements);
  if (typeof len !== 'number') return this._lib3_toList$0$bailout(1, output, len);
  var i = 0;
  for (; i < len; i = i + 1) {
    var t0 = $.index(this._lib3_childElements, i);
    var t1 = output.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    output[i] = t0;
  }
  return output;
 },
 _lib3_toList$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      output = env0;
      len = env1;
      break;
  }
  switch (state) {
    case 0:
      var output = $.List($.get$length(this._lib3_childElements));
      var len = $.get$length(this._lib3_childElements);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t0 = $.index(this._lib3_childElements, i);
        var t1 = output.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        output[i] = t0;
        i = i + 1;
      }
      return output;
  }
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("_FrozenElementList", "Object", ["_lib3_nodeList"], {
 last$0: function() {
  return $.last(this._lib3_nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC3);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC3);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib3_nodeList, element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $._lib3_FrozenElementList$_wrap$1($.getRange(this._lib3_nodeList, start, rangeLength));
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
 },
 iterator$0: function() {
  return $._lib3_FrozenElementListIterator$1(this);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
 },
 set$length: function(newLength) {
  $.set$length(this._lib3_nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC3);
 },
 operator$index$1: function(index) {
  return $.index(this._lib3_nodeList, index);
 },
 get$length: function() {
  return $.get$length(this._lib3_nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib3_nodeList);
 },
 filter$1: function(f) {
  var out = $._lib3_ElementList$1([]);
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      out.add$1(t1);
    }
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return $.index(this._lib3_nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("_FrozenElementListIterator", "Object", ["_lib3_index", "_lib3_list"], {
 hasNext$0: function() {
  return $.lt(this._lib3_index, $.get$length(this._lib3_list));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var t0 = this._lib3_list;
  var t1 = this._lib3_index;
  this._lib3_index = $.add(t1, 1);
  return $.index(t0, t1);
 },
});

Isolate.$defineClass("_ElementList", "_ListWrapper", ["_lib3_list"], {
 getRange$2: function(start, rangeLength) {
  return $._lib3_ElementList$1($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._lib3_ElementList$1($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("_ElementEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
 get$reset: function() {
  return this._lib3_get$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this._lib3_get$1('mousemove');
 },
 get$click: function() {
  return this._lib3_get$1('click');
 },
});

Isolate.$defineClass("_EventSourceEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_EventsImpl", "Object", ["_lib3_ptr"], {
 _lib3_get$1: function(type) {
  return $._lib3_EventListenerListImpl$2(this._lib3_ptr, type);
 },
 operator$index$1: function(type) {
  return this._lib3_get$1($.toLowerCase(type));
 },
});

Isolate.$defineClass("_EventListenerListImpl", "Object", ["_lib3_type", "_lib3_ptr"], {
 _lib3_add$2: function(listener, useCapture) {
  this._lib3_ptr.$dom_addEventListener$3(this._lib3_type, listener, useCapture);
 },
 add$2: function(listener, useCapture) {
  this._lib3_add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
},
});

Isolate.$defineClass("_FileReaderEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_FileWriterEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_FrameSetElementEventsImpl", "_ElementEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_IDBDatabaseEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_IDBRequestEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_IDBTransactionEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_IDBVersionChangeRequestEventsImpl", "_IDBRequestEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_InputElementEventsImpl", "_ElementEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_JavaScriptAudioNodeEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_MediaElementEventsImpl", "_ElementEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_MediaStreamEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_MessagePortEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_ChildNodeListLazy", "Object", ["_lib3_this"], {
 operator$index$1: function(index) {
  return $.index(this._lib3_this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._lib3_this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._lib3_NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._lib3_NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._lib3_this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._lib3_this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._lib3_this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._lib3_this.$dom_removeChild$1(result);
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._lib3_this.$dom_appendChild$1(t1);
  }
 },
 add$1: function(value) {
  this._lib3_this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
 get$first: function() {
  return $.index(this._lib3_list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._lib3_list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._lib3_list);
 },
 removeLast$0: function() {
  return $.removeLast(this._lib3_list);
 },
 clear$0: function() {
  return $.clear(this._lib3_list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib3_list, element, start);
 },
 addAll$1: function(collection) {
  return $.addAll(this._lib3_list, collection);
 },
 add$1: function(value) {
  return $.add$1(this._lib3_list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._lib3_list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib3_list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._lib3_list, index);
 },
 get$length: function() {
  return $.get$length(this._lib3_list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib3_list);
 },
 filter$1: function(f) {
  return $.filter(this._lib3_list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._lib3_list, f);
 },
 iterator$0: function() {
  return $.iterator(this._lib3_list);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_lib3_list"], {
 getRange$2: function(start, rangeLength) {
  return $._lib3_NodeListWrapper$1($.getRange(this._lib3_list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._lib3_NodeListWrapper$1($.filter(this._lib3_list, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("_NotificationEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
 get$click: function() {
  return this._lib3_get$1('click');
 },
});

Isolate.$defineClass("_PeerConnection00EventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_SVGElementInstanceEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
 get$reset: function() {
  return this._lib3_get$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this._lib3_get$1('mousemove');
 },
 get$click: function() {
  return this._lib3_get$1('click');
 },
});

Isolate.$defineClass("_SharedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_SpeechRecognitionEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
 get$start: function() {
  return this._lib3_get$1('start');
 },
 start$0: function() { return this.get$start().$call$0(); },
});

Isolate.$defineClass("_TextTrackEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_TextTrackCueEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_TextTrackListEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_WebSocketEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_WindowEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
 get$reset: function() {
  return this._lib3_get$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseMove: function() {
  return this._lib3_get$1('mousemove');
 },
 get$click: function() {
  return this._lib3_get$1('click');
 },
});

Isolate.$defineClass("_WorkerEventsImpl", "_AbstractWorkerEventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_WorkerContextEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestUploadEventsImpl", "_EventsImpl", ["_lib3_ptr"], {
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib3_length", "_lib3_pos", "_lib3_array"], {
 hasNext$0: function() {
  return $.gt(this._lib3_length, this._lib3_pos);
 },
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var t0 = this._lib3_array;
  var t1 = this._lib3_pos;
  this._lib3_pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._lib3_array), this._lib3_pos);
 },
});

Isolate.$defineClass("Closure", "Closure13", ["this_0"], {
 $call$1: function(event$) {
  var t0 = $.div(event$.get$pageX(), this.this_0.get$viewX());
  this.this_0.set$mouseX(t0);
  var t1 = $.sub(1, $.div(event$.get$pageY(), this.this_0.get$viewY()));
  this.this_0.set$mouseY(t1);
 },
});

Isolate.$defineClass("Closure2", "Closure13", ["this_1"], {
 $call$1: function(_) {
  var t0 = this.this_1.get$halted() !== true;
  this.this_1.set$halted(t0);
 },
});

Isolate.$defineClass("Closure3", "Closure13", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 },
});

Isolate.$defineClass("Closure4", "Closure13", [], {
 $call$1: function(n) {
  return typeof n === 'object' && n.is$Element();
 },
});

Isolate.$defineClass("Closure5", "Closure13", ["box_0", "output_2"], {
 $call$1: function(element) {
  if (this.box_0.f_1.$call$1(element) === true) {
    $.add$1(this.output_2, element);
  }
 },
});

Isolate.$defineClass("Closure6", "Closure13", [], {
 $call$1: function(el) {
  return el.remove$0();
 },
});

Isolate.$defineClass("Closure7", "Closure13", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 },
});

Isolate.$defineClass("Closure8", "Closure13", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 },
});

Isolate.$defineClass("Closure9", "Closure13", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 },
});

Isolate.$defineClass("Closure10", "Closure13", ["this_0"], {
 $call$1: function(value) {
  this.this_0.add$1(value);
 },
});

Isolate.$defineClass("Closure11", "Closure13", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 },
});

Isolate.$defineClass("Closure12", "Closure13", ["box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.f_1.$call$1(key) === true) {
    $.add$1(this.box_0.result_2, key);
  }
 },
});

Isolate.$defineClass("Closure13", "Object", [], {
 toString$0: function() {
  return 'Closure';
 },
});

Isolate.$defineClass('Closure14', 'Closure13', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.anim$1(arg0);
},
});
Isolate.$defineClass('Closure15', 'Closure13', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.add$1(arg0);
},
});
Isolate.$defineClass('Closure16', 'Closure13', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.click$0();
},
});
Isolate.$defineClass('Closure17', 'Closure13', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.click$0();
},
});
$._lib3_ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._lib3_AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  }
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  return $.eq(a, b) === true;
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    }
  }
  return false;
};

$._lib3_NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.isJsArray = function(value) {
  return value !== (void 0) && (value.constructor === Array);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.getWebGLContext = function(canvas) {
  return canvas.getContext$1('experimental-webgl');
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.ensureNative = function(list) {
  return list;
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    }
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  }
  return name$;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  }
  $.set$length(receiver, 0);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && name$ !== 'Object') {
      return name$;
    }
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.max = function(a, b) {
  if ($.ltB($.compareTo(a, b), 0)) {
    var t0 = b;
  } else {
    t0 = a;
  }
  return t0;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate($.div(a, b));
  }
  return a.operator$tdiv$1(b);
};

$.printString = function(string) {
  if (typeof console == "object") {
    console.log(string);
  } else {
    write(string);
    write("\n");
  }
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  }
  return name$;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(b, 0)) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    return a >>> b;
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  var endIndex0 = endIndex;
  if (endIndex === (void 0)) {
    endIndex0 = length$;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0 || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._lib3_DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure7(t0).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure8(t0).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure9(t0).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$.createShaderFromScriptElement = function(gl, id) {
  var shaderScript = $.document().query$1(id);
  var shaderSource = shaderScript.get$text();
  if ($.eqB(shaderScript.get$type(), 'x-shader/x-vertex')) {
    var shaderType = 35633;
  } else {
    if ($.eqB(shaderScript.get$type(), 'x-shader/x-fragment')) {
    } else {
      throw $.captureStackTrace($.ExceptionImplementation$1('*** Error: unknown shader type'));
    }
    shaderType = 35632;
  }
  return $.loadShader(gl, shaderSource, shaderType);
};

$.assert = function(condition) {
};

$.DartWebGLShaderLab$0 = function() {
  return new $.DartWebGLShaderLab(1024, 1024, 1024, 1024, (void 0), (void 0), 0.5, 0.5, (void 0), 60, 0, 1, 3, false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, inputTable, result, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  }
  return $.contains$2(receiver, other, 0);
};

$._lib3_EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$._lib3_NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.last$0();
  }
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) {
      $._cachedBrowserPrefix = '-moz-';
    } else {
      $._cachedBrowserPrefix = '-webkit-';
    }
  }
  return $._cachedBrowserPrefix;
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  }
  return a.operator$negate$0();
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    first0 = first;
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    }
    $._emitObject(t2, result, visiting);
    first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._lib3_PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._lib3_ElementList$1 = function(list) {
  return new $._ElementList(list);
};

$._lib3_WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.filter$1(predicate);
  } else {
    return $.filter2(receiver, [], predicate);
  }
};

$._lib3_DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.filter2 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    }
  }
  return destination;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.filter3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    }
  }
  return destination;
};

$._lib3_EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$._lib3_IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$._lib3_SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._lib3_SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  }
  return receiver.iterator$0();
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  }
  return result;
};

$.geB = function(a, b) {
  return $.ge(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return $.indexOf$2(receiver, other, startIndex) !== -1;
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.add = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    }
  }
  return a.operator$add$1(b);
};

$.Uint8Array$fromList = function(list) {
  return $._U8($.ensureNative(list));
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    if (receiver === 0) {
      var t0 = 1 / receiver < 0;
    } else {
      t0 = receiver < 0;
    }
    return t0;
  } else {
    return receiver.isNegative$0();
  }
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(sb, 'm');
  }
  if (ignoreCase === true) {
    $.add$1(sb, 'i');
  }
  if (global === true) {
    $.add$1(sb, 'g');
  }
  try {
    return new RegExp(pattern, $.toString(sb));
  }catch (t0) {
    var t1 = $.unwrapException(t0);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$._lib3_FrozenElementListIterator$1 = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$._lib3_XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._lib3_JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure3(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$._lib3_IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) {
      return -1;
    } else {
      if ($.gtB(a, b)) {
        return 1;
      } else {
        if ($.eqB(a, b)) {
          if ($.eqB(a, 0)) {
            var aIsNegative = $.isNegative(a);
            if ($.eqB(aIsNegative, $.isNegative(b))) {
              return 0;
            }
            if (aIsNegative === true) {
              return -1;
            }
            return 1;
          }
          return 0;
        } else {
          if ($.isNaN(a) === true) {
            if ($.isNaN(b) === true) {
              return 0;
            }
            return 1;
          } else {
            return -1;
          }
        }
      }
    }
  } else {
    if (typeof a === 'string') {
      if (!(typeof b === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(b));
      }
      if (a == b) {
        var t0 = 0;
      } else {
        if (a < b) {
          t0 = -1;
        } else {
          t0 = 1;
        }
      }
      return t0;
    } else {
      return a.compareTo$1(b);
    }
  }
};

$.ge = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$._lib3_TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      }
      if (start < 0) {
        return -1;
      }
      return receiver.indexOf(element, start);
    }
  }
  return receiver.indexOf$2(element, start);
};

$._lib3_DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._lib3_FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.eqNullB = function(a) {
  return $.eqNull(a) === true;
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._F32 = function(arg) {
  return new Float32Array(arg);;
};

$._lib3_FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    t1 = length$ < 0;
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.DartWebGLShaderLab$0().run$0();
};

$.dateNow = function() {
  return Date.now();
};

$._lib3_AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_lib_backingMap().get$_lib_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._lib3_MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._lib3_IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._lib3_BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._lib_AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.Float32Array$fromList = function(list) {
  return $._F32($.ensureNative(list));
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.round$0();
  }
  if (receiver < 0) {
    return -Math.round(-receiver);
  } else {
    return Math.round(receiver);
  }
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    startIndex0 = startIndex;
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$._lib3_ChildrenElementList$_wrap$1 = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$._lib_AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.StopwatchImplementation$0 = function() {
  return new $.StopwatchImplementation((void 0), (void 0));
};

$._lib3_WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return $.lt(a, b) === true;
};

$.now = function() {
  return $.dateNow();
};

$.FilteredElementList$1 = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.convertDartClosureToJS = function(closure) {
  if (closure === (void 0)) {
    return;
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $, arguments.length, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$._lib3_FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._lib3_FrozenElementList$_wrap$1 = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    result0 = result;
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
    result0 = result + t1;
  }
  return result;
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._lib3_InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.getRange$2(start, length$);
  }
  if (0 === length$) {
    return [];
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  }
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  return receiver.slice(start, end);
};

$.getRange2 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if (typeof start !== 'number') return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = $.add(start, length$);
  if (end > a.length) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  }
  for (var i = start; i < end; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$._lib3_TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  }
  return $dynamicMetadata;
};

$._lib3_DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  var r0 = r;
  if (r === (void 0)) {
    r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  }
  return object;
};

$._lib3_EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._lib3_WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return false;
};

$.random = function() {
  return $.random2();
};

$.random2 = function() {
  return Math.random();
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return res;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._lib3_TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$._lib3_BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._lib3_WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._lib3_MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: false, configurable: true});;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (f !== (void 0) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC8)[name$]);
  if (dartMethod !== (void 0)) {
    methods['Object'] = dartMethod;
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.div = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addAll$1(collection);
  }
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  if (name$ === (void 0)) {
    var name0 = (object.constructor.toString().match(/^\s*function\s*\$?(\S*)\s*\(/)[1]);
  } else {
    name0 = name$;
    if ($.charCodeAt(name$, 0) === 36) {
      name0 = $.substring$1(name$, 1);
    }
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  }
  return name$;
};

$.frequency = function() {
  return 1000;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  }
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; hash = hash0, i = i0) {
    hash0 = hash;
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    }
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  }
  return other == receiver.substring(0, length$);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var method0 = method;
  if (method === (void 0) && $._dynamicMetadata2() !== (void 0)) {
    for (var method1 = method, i = 0; method0 = method1, $.ltB(i, $.get$length($._dynamicMetadata2())); method1 = method2, i = i0) {
      method2 = method1;
      var entry = $.index($._dynamicMetadata2(), i);
      method2 = method1;
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (method3 !== (void 0)) {
          method0 = method3;
          break;
        }
        method2 = method3;
      }
      var i0 = i + 1;
    }
  }
  var method4 = method0;
  if (method0 === (void 0)) {
    method4 = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  var method5 = method4;
  if (method4 === (void 0)) {
    method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  }
  return nullCheckMethod.apply(obj, arguments$);
};

$._lib3_MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getFunctionForTypeNameOf = function() {
  if ((typeof(navigator)) !== 'object') {
    return $.typeNameInChrome;
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC6) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.index = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
      if ($.truncate(index) !== index) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return a[index];
  }
  return a.operator$index$1(index);
};

$._lib3_ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  }
  return receiver.toLowerCase();
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toDouble$0();
  }
  return receiver;
};

$.List = function(length$) {
  return $.newList(length$);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$._lib3_XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$._U8 = function(arg) {
  return new Uint8Array(arg);;
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  }
  return a === b;
};

$._lib3_SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._lib3_IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  }
  if (value === (void 0)) {
    return 'null';
  }
  if (typeof value == "function") {
    return 'Closure';
  }
  return String(value);
};

$.gtB = function(a, b) {
  return $.gt(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (target !== (void 0)) {
    target.builtin$typeInfo = typeInfo;
  }
};

$.loadShader = function(gl, shaderSource, shaderType) {
  var shader = gl.createShader$1(shaderType);
  gl.shaderSource$2(shader, shaderSource);
  gl.compileShader$1(shader);
  return shader;
};

$.document = function() {
  return document;;
};

$._lib3_FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
    if (ex instanceof TypeError) {
      var type = (ex.type);
      var name$ = $.index((ex.arguments), 0);
      if (type === 'property_not_function' || type === 'called_non_callable' || type === 'non_object_property_call' || type === 'non_object_property_load') {
        if (name$ !== (void 0) && $.startsWith(name$, '$call$') === true) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NullPointerException$2((void 0), $.CTC);
        }
      } else {
        if (type === 'undefined_method') {
          if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
            return $.ObjectNotClosureException$0();
          } else {
            return $.NoSuchMethodException$4('', name$, [], (void 0));
          }
        }
      }
    } else {
      if (ex instanceof RangeError) {
        if ($.contains$1((ex.message), 'call stack') === true) {
          return $.StackOverflowException$0();
        }
      }
    }
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  }
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.sub = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.ltB(length$, 0)) {
        throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      }
      if ($.ltB(start, 0)) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      }
      var end = $.add(start, length$);
      if ($.gtB(end, $.get$length(a))) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      }
      var i0 = start;
      L0: while (true) {
        if (!$.ltB(i0, end)) break L0;
        $.add$1(accumulator, $.index(a, i0));
        i0 = $.add(i0, 1);
      }
      return accumulator;
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var startIndex0 = startIndex;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      result = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC3 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC4 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC5 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC7 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC8 = new Isolate.$isolateProperties.Object();
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$._cachedBrowserPrefix = (void 0);
$._getTypeNameOf = (void 0);
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
(function() {
$.defineProperty(Object.prototype, 'is$CanvasElement', function() { return false; });
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'is$WebGLRenderingContext', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.dynamicFunction('$dom_addEventListener$3').AbstractWorker = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').AbstractWorker = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._lib3_AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 };
$.dynamicFunction('toString$0').HTMLAnchorElement = function() {
  return this.toString();
 };
$.dynamicFunction('get$type').HTMLAnchorElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLAnchorElement = function() { return true; };
$.dynamicFunction('get$length').WebKitAnimationList = function() { return this.length; };
$.dynamicFunction('set$width').HTMLAppletElement = function(v) { this.width = v; };
$.dynamicFunction('set$height').HTMLAppletElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLAppletElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLAreaElement = function() { return true; };
$.dynamicFunction('get$byteLength').ArrayBuffer = function() { return this.byteLength; };
$.dynamicFunction('get$byteLength').ArrayBufferView = function() { return this.byteLength; };
$.dynamicFunction('get$length').AudioBuffer = function() { return this.length; };
$.dynamicFunction('get$on').AudioContext = function() {
  return $._lib3_AudioContextEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLAudioElement = function() { return true; };
$.dynamicFunction('clear$0').HTMLBRElement = function() { return this.clear.$call$0(); };
$.dynamicFunction('is$Element').HTMLBRElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLBaseElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLBaseFontElement = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').BatteryManager = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').BatteryManager = function() {
  return $._lib3_BatteryManagerEventsImpl$1(this);
 };
$.dynamicFunction('get$type').BiquadFilterNode = function() { return this.type; };
$.dynamicFunction('get$type').Blob = function() { return this.type; };
$.dynamicFunction('get$on').HTMLBodyElement = function() {
  return $._lib3_BodyElementEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLBodyElement = function() { return true; };
$.dynamicFunction('get$type').HTMLButtonElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLButtonElement = function() { return true; };
$.dynamicFunction('toString$0').WebKitCSSMatrix = function() {
  return this.toString();
 };
$.dynamicFunction('get$type').CSSRule = function() { return this.type; };
$.dynamicFunction('get$length').CSSRuleList = function() { return this.length; };
$.dynamicFunction('set$width').CSSStyleDeclaration = function(value) {
  this.setProperty$3('width', value, '');
 };
$.dynamicFunction('set$height').CSSStyleDeclaration = function(value) {
  this.setProperty$3('height', value, '');
 };
$.dynamicFunction('get$filter').CSSStyleDeclaration = function() {
  return this.getPropertyValue$1('' + $.stringToString($._browserPrefix()) + 'filter');
 };
$.dynamicFunction('filter$1').CSSStyleDeclaration = function(arg0) { return this.get$filter().$call$1(arg0); };
$.dynamicFunction('get$clear').CSSStyleDeclaration = function() {
  return this.getPropertyValue$1('clear');
 };
$.dynamicFunction('clear$0').CSSStyleDeclaration = function() { return this.get$clear().$call$0(); };
$.dynamicFunction('setProperty$3').CSSStyleDeclaration = function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 };
$.dynamicFunction('getPropertyValue$1').CSSStyleDeclaration = function(propertyName) {
  return this.getPropertyValue(propertyName);
 };
$.dynamicFunction('get$length').CSSStyleDeclaration = function() { return this.length; };
$.dynamicFunction('get$length').CSSValueList = function() { return this.length; };
$.dynamicFunction('getContext$1').HTMLCanvasElement = function(contextId) {
  return this.getContext(contextId);
 };
$.dynamicFunction('set$width').HTMLCanvasElement = function(v) { this.width = v; };
$.dynamicFunction('set$height').HTMLCanvasElement = function(v) { this.height = v; };
$.dynamicFunction('is$CanvasElement').HTMLCanvasElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLCanvasElement = function() { return true; };
$.dynamicFunction('get$length').CharacterData = function() { return this.length; };
$.dynamicFunction('get$length').ClientRectList = function() { return this.length; };
_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.dynamicFunction('is$Element').HTMLContentElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLDListElement = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').DOMApplicationCache = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').DOMApplicationCache = function() {
  return $._lib3_DOMApplicationCacheEventsImpl$1(this);
 };
$.dynamicFunction('toString$0').DOMException = function() {
  return this.toString();
 };
$.dynamicFunction('get$type').DOMMimeType = function() { return this.type; };
$.dynamicFunction('get$length').DOMMimeTypeArray = function() { return this.length; };
$.dynamicFunction('get$length').DOMPlugin = function() { return this.length; };
$.dynamicFunction('get$length').DOMPluginArray = function() { return this.length; };
$.dynamicFunction('toString$0').DOMSelection = function() {
  return this.toString();
 };
$.dynamicFunction('get$type').DOMSelection = function() { return this.type; };
$.dynamicFunction('contains$1').DOMStringList = function(string) {
  return this.contains(string);
 };
$.dynamicFunction('getRange$2').DOMStringList = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').DOMStringList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').DOMStringList = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').DOMStringList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').DOMStringList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').DOMStringList = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').DOMStringList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').DOMStringList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').DOMStringList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').DOMStringList = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').DOMStringList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').DOMStringList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').DOMStringList = function() { return this.length; };
$.dynamicFunction('is$List2').DOMStringList = function() { return true; };
$.dynamicFunction('is$Collection').DOMStringList = function() { return true; };
$.dynamicFunction('toString$0').DOMTokenList = function() {
  return this.toString();
 };
$.dynamicFunction('contains$1').DOMTokenList = function(token) {
  return this.contains(token);
 };
$.dynamicFunction('add$1').DOMTokenList = function(token) {
  return this.add(token);
 };
$.dynamicFunction('get$length').DOMTokenList = function() { return this.length; };
$.dynamicFunction('get$type').DataTransferItem = function() { return this.type; };
$.dynamicFunction('clear$0').DataTransferItemList = function() {
  return this.clear();
 };
$.dynamicFunction('add$2').DataTransferItemList = function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 };
$.dynamicFunction('add$1').DataTransferItemList = function(data_OR_file) {
  return this.add(data_OR_file);
};
$.dynamicFunction('get$length').DataTransferItemList = function() { return this.length; };
$.dynamicFunction('get$on').DedicatedWorkerContext = function() {
  return $._lib3_DedicatedWorkerContextEventsImpl$1(this);
 };
$.dynamicFunction('$dom_addEventListener$3').DeprecatedPeerConnection = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').DeprecatedPeerConnection = function() {
  return $._lib3_DeprecatedPeerConnectionEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLDetailsElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLDirectoryElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLDivElement = function() { return true; };
$.dynamicFunction('$dom_querySelector$1').HTMLDocument = function(selectors) {
  return this.querySelector(selectors);;
 };
$.dynamicFunction('query$1').HTMLDocument = function(selectors) {
  if ($.CTC5.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  }
  return this.$dom_querySelector$1(selectors);
 };
$.dynamicFunction('$dom_getElementById$1').HTMLDocument = function(elementId) {
  return this.getElementById(elementId);
 };
$.dynamicFunction('get$window').HTMLDocument = function() {
  return this.defaultView;;
 };
$.dynamicFunction('get$on').HTMLDocument = function() {
  return $._lib3_DocumentEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLDocument = function() { return true; };
$.dynamicFunction('query$1').DocumentFragment = function(selectors) {
  return this.querySelector(selectors);
 };
$.dynamicFunction('get$on').DocumentFragment = function() {
  return $._lib3_ElementEventsImpl$1(this);
 };
$.dynamicFunction('click$0').DocumentFragment = function() {
 };
$.dynamicFunction('get$click').DocumentFragment = function() { return new $.Closure16(this); };
$.dynamicFunction('get$parent').DocumentFragment = function() {
  return;
 };
$.dynamicFunction('get$$$dom_lastElementChild').DocumentFragment = function() {
  return $.last(this.get$elements());
 };
$.dynamicFunction('get$$$dom_firstElementChild').DocumentFragment = function() {
  return this.get$elements().first$0();
 };
$.dynamicFunction('set$innerHTML').DocumentFragment = function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $.Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 };
$.dynamicFunction('get$elements').DocumentFragment = function() {
  if ($.eqNullB(this._lib3_elements)) {
    this._lib3_elements = $.FilteredElementList$1(this);
  }
  return this._lib3_elements;
 };
$.dynamicFunction('is$Element').DocumentFragment = function() { return true; };
$.dynamicFunction('query$1').Element = function(selectors) {
  return this.querySelector(selectors);
 };
$.dynamicFunction('click$0').Element = function() {
  return this.click();
 };
$.dynamicFunction('get$click').Element = function() { return new $.Closure17(this); };
$.dynamicFunction('get$$$dom_lastElementChild').Element = function() {
  return this.lastElementChild;;
 };
$.dynamicFunction('set$innerHTML').Element = function(v) { this.innerHTML = v; };
$.dynamicFunction('get$$$dom_firstElementChild').Element = function() {
  return this.firstElementChild;;
 };
$.dynamicFunction('get$$$dom_children').Element = function() {
  return this.children;;
 };
$.dynamicFunction('get$on').Element = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._lib3_ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 };
$.dynamicFunction('get$elements').Element = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._lib3_ChildrenElementList$_wrap$1(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 };
$.dynamicFunction('set$elements').Element = function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 };
$.dynamicFunction('is$Element').Element = function() { return true; };
$.dynamicFunction('set$width').HTMLEmbedElement = function(v) { this.width = v; };
$.dynamicFunction('get$type').HTMLEmbedElement = function() { return this.type; };
$.dynamicFunction('set$height').HTMLEmbedElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLEmbedElement = function() { return true; };
$.dynamicFunction('get$length').EntryArray = function() { return this.length; };
$.dynamicFunction('get$length').EntryArraySync = function() { return this.length; };
$.dynamicFunction('remove$0').EntrySync = function() {
  return this.remove();
 };
$.dynamicFunction('get$type').Event = function() { return this.type; };
$.dynamicFunction('toString$0').EventException = function() {
  return this.toString();
 };
$.dynamicFunction('$dom_addEventListener$3').EventSource = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').EventSource = function() {
  return $._lib3_EventSourceEventsImpl$1(this);
 };
$.dynamicFunction('$dom_addEventListener$3').EventTarget = function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 };
$.dynamicFunction('get$on').EventTarget = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._lib3_EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 };
$.dynamicFunction('get$type').HTMLFieldSetElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLFieldSetElement = function() { return true; };
$.dynamicFunction('toString$0').FileException = function() {
  return this.toString();
 };
$.dynamicFunction('getRange$2').FileList = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').FileList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').FileList = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').FileList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').FileList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').FileList = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').FileList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').FileList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').FileList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').FileList = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').FileList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').FileList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').FileList = function() { return this.length; };
$.dynamicFunction('is$List2').FileList = function() { return true; };
$.dynamicFunction('is$Collection').FileList = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').FileReader = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').FileReader = function() {
  return $._lib3_FileReaderEventsImpl$1(this);
 };
$.dynamicFunction('$dom_addEventListener$3').FileWriter = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$length').FileWriter = function() { return this.length; };
$.dynamicFunction('get$on').FileWriter = function() {
  return $._lib3_FileWriterEventsImpl$1(this);
 };
$.dynamicFunction('get$length').FileWriterSync = function() { return this.length; };
$.dynamicFunction('getRange$2').Float32Array = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Float32Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Float32Array = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Float32Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Float32Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Float32Array = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Float32Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Float32Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Float32Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Float32Array = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Float32Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Float32Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Float32Array = function() { return this.length; };
$.dynamicFunction('is$List2').Float32Array = function() { return true; };
$.dynamicFunction('is$Collection').Float32Array = function() { return true; };
$.dynamicFunction('getRange$2').Float64Array = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Float64Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Float64Array = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Float64Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Float64Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Float64Array = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Float64Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Float64Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Float64Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Float64Array = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Float64Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Float64Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Float64Array = function() { return this.length; };
$.dynamicFunction('is$List2').Float64Array = function() { return true; };
$.dynamicFunction('is$Collection').Float64Array = function() { return true; };
$.dynamicFunction('is$Element').HTMLFontElement = function() { return true; };
$.dynamicFunction('reset$0').HTMLFormElement = function() {
  return this.reset();
 };
$.dynamicFunction('get$length').HTMLFormElement = function() { return this.length; };
$.dynamicFunction('is$Element').HTMLFormElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLFrameElement = function() { return true; };
$.dynamicFunction('get$on').HTMLFrameSetElement = function() {
  return $._lib3_FrameSetElementEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLFrameSetElement = function() { return true; };
$.dynamicFunction('set$width').HTMLHRElement = function(v) { this.width = v; };
$.dynamicFunction('is$Element').HTMLHRElement = function() { return true; };
$.dynamicFunction('get$length').HTMLAllCollection = function() { return this.length; };
$.dynamicFunction('getRange$2').HTMLCollection = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').HTMLCollection = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').HTMLCollection = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').HTMLCollection = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').HTMLCollection = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').HTMLCollection = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').HTMLCollection = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').HTMLCollection = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').HTMLCollection = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').HTMLCollection = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').HTMLCollection = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').HTMLCollection = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').HTMLCollection = function() { return this.length; };
$.dynamicFunction('is$List2').HTMLCollection = function() { return true; };
$.dynamicFunction('is$Collection').HTMLCollection = function() { return true; };
$.dynamicFunction('set$length').HTMLOptionsCollection = function(value) {
  this.length = value;;
 };
$.dynamicFunction('get$length').HTMLOptionsCollection = function() {
  return this.length;;
 };
$.dynamicFunction('is$List2').HTMLOptionsCollection = function() { return true; };
$.dynamicFunction('is$Collection').HTMLOptionsCollection = function() { return true; };
$.dynamicFunction('is$Element').HTMLHeadElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLHeadingElement = function() { return true; };
$.dynamicFunction('get$length').History = function() { return this.length; };
$.dynamicFunction('is$Element').HTMLHtmlElement = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').IDBDatabase = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').IDBDatabase = function() {
  return $._lib3_IDBDatabaseEventsImpl$1(this);
 };
$.dynamicFunction('toString$0').IDBDatabaseException = function() {
  return this.toString();
 };
$.dynamicFunction('clear$0').IDBObjectStore = function() {
  return this.clear();
 };
$.dynamicFunction('add$2').IDBObjectStore = function(value, key) {
  return this.add(value,key);
 };
$.dynamicFunction('add$1').IDBObjectStore = function(value) {
  return this.add(value);
};
$.dynamicFunction('$dom_addEventListener$3').IDBRequest = function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 };
$.dynamicFunction('get$on').IDBRequest = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._lib3_IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 };
$.dynamicFunction('$dom_addEventListener$3').IDBTransaction = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').IDBTransaction = function() {
  return $._lib3_IDBTransactionEventsImpl$1(this);
 };
$.dynamicFunction('$dom_addEventListener$3').IDBVersionChangeRequest = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').IDBVersionChangeRequest = function() {
  return $._lib3_IDBVersionChangeRequestEventsImpl$1(this);
 };
$.dynamicFunction('set$width').HTMLIFrameElement = function(v) { this.width = v; };
$.dynamicFunction('set$height').HTMLIFrameElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLIFrameElement = function() { return true; };
$.dynamicFunction('set$width').HTMLImageElement = function(v) { this.width = v; };
$.dynamicFunction('set$height').HTMLImageElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLImageElement = function() { return true; };
$.dynamicFunction('get$type').HTMLInputElement = function() { return this.type; };
$.dynamicFunction('get$pattern').HTMLInputElement = function() { return this.pattern; };
$.dynamicFunction('get$on').HTMLInputElement = function() {
  return $._lib3_InputElementEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLInputElement = function() { return true; };
$.dynamicFunction('getRange$2').Int16Array = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Int16Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Int16Array = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Int16Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Int16Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Int16Array = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Int16Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Int16Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Int16Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Int16Array = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Int16Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Int16Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Int16Array = function() { return this.length; };
$.dynamicFunction('is$List2').Int16Array = function() { return true; };
$.dynamicFunction('is$Collection').Int16Array = function() { return true; };
$.dynamicFunction('getRange$2').Int32Array = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Int32Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Int32Array = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Int32Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Int32Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Int32Array = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Int32Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Int32Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Int32Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Int32Array = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Int32Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Int32Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Int32Array = function() { return this.length; };
$.dynamicFunction('is$List2').Int32Array = function() { return true; };
$.dynamicFunction('is$Collection').Int32Array = function() { return true; };
$.dynamicFunction('getRange$2').Int8Array = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Int8Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Int8Array = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Int8Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Int8Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Int8Array = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Int8Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Int8Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Int8Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Int8Array = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Int8Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Int8Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Int8Array = function() { return this.length; };
$.dynamicFunction('is$List2').Int8Array = function() { return true; };
$.dynamicFunction('is$Collection').Int8Array = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').JavaScriptAudioNode = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').JavaScriptAudioNode = function() {
  return $._lib3_JavaScriptAudioNodeEventsImpl$1(this);
 };
$.dynamicFunction('get$type').JavaScriptCallFrame = function() { return this.type; };
$.dynamicFunction('get$type').HTMLKeygenElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLKeygenElement = function() { return true; };
$.dynamicFunction('get$type').HTMLLIElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLLIElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLLabelElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLLegendElement = function() { return true; };
$.dynamicFunction('get$type').HTMLLinkElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLLinkElement = function() { return true; };
$.dynamicFunction('toString$0').Location = function() {
  return this.toString();
 };
$.dynamicFunction('is$Element').HTMLMapElement = function() { return true; };
$.dynamicFunction('start$0').HTMLMarqueeElement = function() {
  return this.start();
 };
$.dynamicFunction('set$width').HTMLMarqueeElement = function(v) { this.width = v; };
$.dynamicFunction('set$height').HTMLMarqueeElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLMarqueeElement = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').MediaController = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').HTMLMediaElement = function() {
  return $._lib3_MediaElementEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLMediaElement = function() { return true; };
$.dynamicFunction('getRange$2').MediaList = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').MediaList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').MediaList = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').MediaList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').MediaList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').MediaList = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').MediaList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').MediaList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').MediaList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').MediaList = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').MediaList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').MediaList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').MediaList = function() { return this.length; };
$.dynamicFunction('is$List2').MediaList = function() { return true; };
$.dynamicFunction('is$Collection').MediaList = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').MediaStream = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').MediaStream = function() {
  return $._lib3_MediaStreamEventsImpl$1(this);
 };
$.dynamicFunction('get$length').MediaStreamList = function() { return this.length; };
$.dynamicFunction('get$length').MediaStreamTrackList = function() { return this.length; };
$.dynamicFunction('is$Element').HTMLMenuElement = function() { return true; };
$.dynamicFunction('start$0').MessagePort = function() {
  return this.start();
 };
$.dynamicFunction('$dom_addEventListener$3').MessagePort = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').MessagePort = function() {
  return $._lib3_MessagePortEventsImpl$1(this);
 };
$.dynamicFunction('is$Element').HTMLMetaElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLMeterElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLModElement = function() { return true; };
$.dynamicFunction('get$type').MutationRecord = function() { return this.type; };
$.dynamicFunction('getRange$2').NamedNodeMap = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').NamedNodeMap = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').NamedNodeMap = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').NamedNodeMap = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').NamedNodeMap = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').NamedNodeMap = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').NamedNodeMap = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').NamedNodeMap = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').NamedNodeMap = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').NamedNodeMap = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').NamedNodeMap = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').NamedNodeMap = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').NamedNodeMap = function() { return this.length; };
$.dynamicFunction('is$List2').NamedNodeMap = function() { return true; };
$.dynamicFunction('is$Collection').NamedNodeMap = function() { return true; };
$.dynamicFunction('get$userAgent').Navigator = function() { return this.userAgent; };
$.dynamicFunction('$dom_replaceChild$2').Node = function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 };
$.dynamicFunction('$dom_removeChild$1').Node = function(oldChild) {
  return this.removeChild(oldChild);
 };
$.dynamicFunction('contains$1').Node = function(other) {
  return this.contains(other);
 };
$.dynamicFunction('$dom_appendChild$1').Node = function(newChild) {
  return this.appendChild(newChild);
 };
$.dynamicFunction('set$text').Node = function(value) {
  this.textContent = value;;
 };
$.dynamicFunction('get$text').Node = function() {
  return this.textContent;;
 };
$.dynamicFunction('get$parent').Node = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 };
$.dynamicFunction('get$$$dom_childNodes').Node = function() {
  return this.childNodes;;
 };
$.dynamicFunction('replaceWith$1').Node = function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  }catch (t0) {
    $.unwrapException(t0);
  }
  return this;
 };
$.dynamicFunction('remove$0').Node = function() {
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  }
  return this;
 };
$.dynamicFunction('get$nodes').Node = function() {
  return $._lib3_ChildNodeListLazy$1(this);
 };
$.dynamicFunction('filter$1').NodeIterator = function(arg0) { return this.filter.$call$1(arg0); };
$.dynamicFunction('operator$index$1').NodeList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').NodeList = function() { return this.length; };
$.dynamicFunction('getRange$2').NodeList = function(start, rangeLength) {
  return $._lib3_NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 };
$.dynamicFunction('get$first').NodeList = function() {
  return this.operator$index$1(0);
 };
$.dynamicFunction('first$0').NodeList = function() { return this.get$first().$call$0(); };
$.dynamicFunction('last$0').NodeList = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').NodeList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').NodeList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').NodeList = function(f) {
  return $._lib3_NodeListWrapper$1($.filter3(this, [], f));
 };
$.dynamicFunction('forEach$1').NodeList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('operator$indexSet$2').NodeList = function(index, value) {
  this._lib3_parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 };
$.dynamicFunction('clear$0').NodeList = function() {
  this._lib3_parent.set$text('');
 };
$.dynamicFunction('removeLast$0').NodeList = function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._lib3_parent.$dom_removeChild$1(result);
  }
  return result;
 };
$.dynamicFunction('addAll$1').NodeList = function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._lib3_parent.$dom_appendChild$1(t1);
  }
 };
$.dynamicFunction('add$1').NodeList = function(value) {
  this._lib3_parent.$dom_appendChild$1(value);
 };
$.dynamicFunction('iterator$0').NodeList = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 };
$.dynamicFunction('is$List2').NodeList = function() { return true; };
$.dynamicFunction('is$Collection').NodeList = function() { return true; };
$.dynamicFunction('query$1').NodeSelector = function(selectors) {
  return this.querySelector(selectors);
 };
$.dynamicFunction('get$tag').Notification = function() { return this.tag; };
$.dynamicFunction('get$on').Notification = function() {
  return $._lib3_NotificationEventsImpl$1(this);
 };
$.dynamicFunction('get$type').HTMLOListElement = function() { return this.type; };
$.dynamicFunction('start$0').HTMLOListElement = function() { return this.start.$call$0(); };
$.dynamicFunction('is$Element').HTMLOListElement = function() { return true; };
$.dynamicFunction('set$width').HTMLObjectElement = function(v) { this.width = v; };
$.dynamicFunction('get$type').HTMLObjectElement = function() { return this.type; };
$.dynamicFunction('set$height').HTMLObjectElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLObjectElement = function() { return true; };
$.dynamicFunction('toString$0').OperationNotAllowedException = function() {
  return this.toString();
 };
$.dynamicFunction('is$Element').HTMLOptGroupElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLOptionElement = function() { return true; };
$.dynamicFunction('get$type').Oscillator = function() { return this.type; };
$.dynamicFunction('get$type').HTMLOutputElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLOutputElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLParagraphElement = function() { return true; };
$.dynamicFunction('get$type').HTMLParamElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLParamElement = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').PeerConnection00 = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').PeerConnection00 = function() {
  return $._lib3_PeerConnection00EventsImpl$1(this);
 };
$.dynamicFunction('get$type').PerformanceNavigation = function() { return this.type; };
$.dynamicFunction('set$width').HTMLPreElement = function(v) { this.width = v; };
$.dynamicFunction('is$Element').HTMLPreElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLProgressElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLQuoteElement = function() { return true; };
$.dynamicFunction('toString$0').Range = function() {
  return this.toString();
 };
$.dynamicFunction('toString$0').RangeException = function() {
  return this.toString();
 };
$.dynamicFunction('get$length').SQLResultSetRowList = function() { return this.length; };
$.dynamicFunction('is$Element').SVGAElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAltGlyphDefElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAltGlyphElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAltGlyphItemElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAnimateColorElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAnimateElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAnimateMotionElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAnimateTransformElement = function() { return true; };
$.dynamicFunction('is$Element').SVGAnimationElement = function() { return true; };
$.dynamicFunction('is$Element').SVGCircleElement = function() { return true; };
$.dynamicFunction('is$Element').SVGClipPathElement = function() { return true; };
$.dynamicFunction('get$type').SVGComponentTransferFunctionElement = function() { return this.type; };
$.dynamicFunction('is$Element').SVGComponentTransferFunctionElement = function() { return true; };
$.dynamicFunction('is$Element').SVGCursorElement = function() { return true; };
$.dynamicFunction('is$Element').SVGDefsElement = function() { return true; };
$.dynamicFunction('is$Element').SVGDescElement = function() { return true; };
$.dynamicFunction('is$Element').SVGDocument = function() { return true; };
$.dynamicFunction('set$innerHTML').SVGElement = function(svg) {
  var container = $.Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.stringToString(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 };
$.dynamicFunction('set$elements').SVGElement = function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 };
$.dynamicFunction('get$elements').SVGElement = function() {
  return $.FilteredElementList$1(this);
 };
$.dynamicFunction('is$Element').SVGElement = function() { return true; };
$.dynamicFunction('get$on').SVGElementInstance = function() {
  return $._lib3_SVGElementInstanceEventsImpl$1(this);
 };
$.dynamicFunction('get$length').SVGElementInstanceList = function() { return this.length; };
$.dynamicFunction('is$Element').SVGEllipseElement = function() { return true; };
$.dynamicFunction('toString$0').SVGException = function() {
  return this.toString();
 };
$.dynamicFunction('is$Element').SVGFEBlendElement = function() { return true; };
$.dynamicFunction('get$type').SVGFEColorMatrixElement = function() { return this.type; };
$.dynamicFunction('is$Element').SVGFEColorMatrixElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEComponentTransferElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFECompositeElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEConvolveMatrixElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEDiffuseLightingElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEDisplacementMapElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEDistantLightElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEDropShadowElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEFloodElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEFuncAElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEFuncBElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEFuncGElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEFuncRElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEGaussianBlurElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEImageElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEMergeElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEMergeNodeElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEMorphologyElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEOffsetElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFEPointLightElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFESpecularLightingElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFESpotLightElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFETileElement = function() { return true; };
$.dynamicFunction('get$type').SVGFETurbulenceElement = function() { return this.type; };
$.dynamicFunction('is$Element').SVGFETurbulenceElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFilterElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFontElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFontFaceElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFontFaceFormatElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFontFaceNameElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFontFaceSrcElement = function() { return true; };
$.dynamicFunction('is$Element').SVGFontFaceUriElement = function() { return true; };
$.dynamicFunction('is$Element').SVGForeignObjectElement = function() { return true; };
$.dynamicFunction('is$Element').SVGGElement = function() { return true; };
$.dynamicFunction('is$Element').SVGGlyphElement = function() { return true; };
$.dynamicFunction('is$Element').SVGGlyphRefElement = function() { return true; };
$.dynamicFunction('is$Element').SVGGradientElement = function() { return true; };
$.dynamicFunction('is$Element').SVGHKernElement = function() { return true; };
$.dynamicFunction('is$Element').SVGImageElement = function() { return true; };
$.dynamicFunction('clear$0').SVGLengthList = function() {
  return this.clear();
 };
$.dynamicFunction('is$Element').SVGLineElement = function() { return true; };
$.dynamicFunction('is$Element').SVGLinearGradientElement = function() { return true; };
$.dynamicFunction('is$Element').SVGMPathElement = function() { return true; };
$.dynamicFunction('is$Element').SVGMarkerElement = function() { return true; };
$.dynamicFunction('is$Element').SVGMaskElement = function() { return true; };
$.dynamicFunction('is$Element').SVGMetadataElement = function() { return true; };
$.dynamicFunction('is$Element').SVGMissingGlyphElement = function() { return true; };
$.dynamicFunction('clear$0').SVGNumberList = function() {
  return this.clear();
 };
$.dynamicFunction('is$Element').SVGPathElement = function() { return true; };
$.dynamicFunction('clear$0').SVGPathSegList = function() {
  return this.clear();
 };
$.dynamicFunction('is$Element').SVGPatternElement = function() { return true; };
$.dynamicFunction('clear$0').SVGPointList = function() {
  return this.clear();
 };
$.dynamicFunction('is$Element').SVGPolygonElement = function() { return true; };
$.dynamicFunction('is$Element').SVGPolylineElement = function() { return true; };
$.dynamicFunction('is$Element').SVGRadialGradientElement = function() { return true; };
$.dynamicFunction('set$width').SVGRect = function(v) { this.width = v; };
$.dynamicFunction('set$height').SVGRect = function(v) { this.height = v; };
$.dynamicFunction('is$Element').SVGRectElement = function() { return true; };
$.dynamicFunction('viewport$4').SVGSVGElement = function(arg0, arg1, arg2, arg3) { return this.viewport.$call$4(arg0, arg1, arg2, arg3); };
$.dynamicFunction('is$Element').SVGSVGElement = function() { return true; };
$.dynamicFunction('get$type').SVGScriptElement = function() { return this.type; };
$.dynamicFunction('is$Element').SVGScriptElement = function() { return true; };
$.dynamicFunction('is$Element').SVGSetElement = function() { return true; };
$.dynamicFunction('is$Element').SVGStopElement = function() { return true; };
$.dynamicFunction('clear$0').SVGStringList = function() {
  return this.clear();
 };
$.dynamicFunction('get$type').SVGStyleElement = function() { return this.type; };
$.dynamicFunction('is$Element').SVGStyleElement = function() { return true; };
$.dynamicFunction('is$Element').SVGSwitchElement = function() { return true; };
$.dynamicFunction('is$Element').SVGSymbolElement = function() { return true; };
$.dynamicFunction('is$Element').SVGTRefElement = function() { return true; };
$.dynamicFunction('is$Element').SVGTSpanElement = function() { return true; };
$.dynamicFunction('is$Element').SVGTextContentElement = function() { return true; };
$.dynamicFunction('is$Element').SVGTextElement = function() { return true; };
$.dynamicFunction('is$Element').SVGTextPathElement = function() { return true; };
$.dynamicFunction('is$Element').SVGTextPositioningElement = function() { return true; };
$.dynamicFunction('is$Element').SVGTitleElement = function() { return true; };
$.dynamicFunction('get$type').SVGTransform = function() { return this.type; };
$.dynamicFunction('clear$0').SVGTransformList = function() {
  return this.clear();
 };
$.dynamicFunction('is$Element').SVGUseElement = function() { return true; };
$.dynamicFunction('is$Element').SVGVKernElement = function() { return true; };
$.dynamicFunction('is$Element').SVGViewElement = function() { return true; };
$.dynamicFunction('get$type').HTMLScriptElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLScriptElement = function() { return true; };
$.dynamicFunction('get$type').HTMLSelectElement = function() { return this.type; };
$.dynamicFunction('get$length').HTMLSelectElement = function() { return this.length; };
$.dynamicFunction('set$length').HTMLSelectElement = function(v) { this.length = v; };
$.dynamicFunction('is$Element').HTMLSelectElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLShadowElement = function() { return true; };
$.dynamicFunction('set$innerHTML').ShadowRoot = function(v) { this.innerHTML = v; };
$.dynamicFunction('is$Element').ShadowRoot = function() { return true; };
$.dynamicFunction('get$on').SharedWorkerContext = function() {
  return $._lib3_SharedWorkerContextEventsImpl$1(this);
 };
$.dynamicFunction('get$type').HTMLSourceElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLSourceElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLSpanElement = function() { return true; };
$.dynamicFunction('get$length').SpeechGrammarList = function() { return this.length; };
$.dynamicFunction('get$length').SpeechInputResultList = function() { return this.length; };
$.dynamicFunction('start$0').SpeechRecognition = function() {
  return this.start();
 };
$.dynamicFunction('$dom_addEventListener$3').SpeechRecognition = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').SpeechRecognition = function() {
  return $._lib3_SpeechRecognitionEventsImpl$1(this);
 };
$.dynamicFunction('get$length').SpeechRecognitionResult = function() { return this.length; };
$.dynamicFunction('get$length').SpeechRecognitionResultList = function() { return this.length; };
$.dynamicFunction('$dom_setItem$2').Storage = function(key, data) {
  return this.setItem(key,data);
 };
$.dynamicFunction('$dom_key$1').Storage = function(index) {
  return this.key(index);
 };
$.dynamicFunction('$dom_getItem$1').Storage = function(key) {
  return this.getItem(key);
 };
$.dynamicFunction('$dom_clear$0').Storage = function() {
  return this.clear();
 };
$.dynamicFunction('get$$$dom_length').Storage = function() {
  return this.length;;
 };
$.dynamicFunction('isEmpty$0').Storage = function() {
  return $.eqNull(this.$dom_key$1(0));
 };
$.dynamicFunction('get$length').Storage = function() {
  return this.get$$$dom_length();
 };
$.dynamicFunction('forEach$1').Storage = function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 };
$.dynamicFunction('clear$0').Storage = function() {
  return this.$dom_clear$0();
 };
$.dynamicFunction('operator$indexSet$2').Storage = function(key, value) {
  return this.$dom_setItem$2(key, value);
 };
$.dynamicFunction('operator$index$1').Storage = function(key) {
  return this.$dom_getItem$1(key);
 };
$.dynamicFunction('containsKey$1').Storage = function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 };
$.dynamicFunction('is$Map').Storage = function() { return true; };
$.dynamicFunction('get$type').HTMLStyleElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLStyleElement = function() { return true; };
$.dynamicFunction('get$type').StyleMedia = function() { return this.type; };
$.dynamicFunction('get$type').StyleSheet = function() { return this.type; };
$.dynamicFunction('getRange$2').StyleSheetList = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').StyleSheetList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').StyleSheetList = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').StyleSheetList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').StyleSheetList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').StyleSheetList = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').StyleSheetList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').StyleSheetList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').StyleSheetList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').StyleSheetList = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').StyleSheetList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').StyleSheetList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').StyleSheetList = function() { return this.length; };
$.dynamicFunction('is$List2').StyleSheetList = function() { return true; };
$.dynamicFunction('is$Collection').StyleSheetList = function() { return true; };
$.dynamicFunction('is$Element').HTMLTableCaptionElement = function() { return true; };
$.dynamicFunction('set$width').HTMLTableCellElement = function(v) { this.width = v; };
$.dynamicFunction('set$height').HTMLTableCellElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLTableCellElement = function() { return true; };
$.dynamicFunction('set$width').HTMLTableColElement = function(v) { this.width = v; };
$.dynamicFunction('is$Element').HTMLTableColElement = function() { return true; };
$.dynamicFunction('set$width').HTMLTableElement = function(v) { this.width = v; };
$.dynamicFunction('is$Element').HTMLTableElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLTableRowElement = function() { return true; };
$.dynamicFunction('is$Element').HTMLTableSectionElement = function() { return true; };
$.dynamicFunction('get$type').HTMLTextAreaElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLTextAreaElement = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').TextTrack = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').TextTrack = function() {
  return $._lib3_TextTrackEventsImpl$1(this);
 };
$.dynamicFunction('$dom_addEventListener$3').TextTrackCue = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$text').TextTrackCue = function() { return this.text; };
$.dynamicFunction('set$text').TextTrackCue = function(v) { this.text = v; };
$.dynamicFunction('get$on').TextTrackCue = function() {
  return $._lib3_TextTrackCueEventsImpl$1(this);
 };
$.dynamicFunction('get$length').TextTrackCueList = function() { return this.length; };
$.dynamicFunction('$dom_addEventListener$3').TextTrackList = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$length').TextTrackList = function() { return this.length; };
$.dynamicFunction('get$on').TextTrackList = function() {
  return $._lib3_TextTrackListEventsImpl$1(this);
 };
$.dynamicFunction('get$length').TimeRanges = function() { return this.length; };
$.dynamicFunction('is$Element').HTMLTitleElement = function() { return true; };
$.dynamicFunction('get$pageY').Touch = function() { return this.pageY; };
$.dynamicFunction('get$pageX').Touch = function() { return this.pageX; };
$.dynamicFunction('getRange$2').TouchList = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').TouchList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').TouchList = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').TouchList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').TouchList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').TouchList = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').TouchList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').TouchList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').TouchList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').TouchList = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').TouchList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').TouchList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').TouchList = function() { return this.length; };
$.dynamicFunction('is$List2').TouchList = function() { return true; };
$.dynamicFunction('is$Collection').TouchList = function() { return true; };
$.dynamicFunction('is$Element').HTMLTrackElement = function() { return true; };
$.dynamicFunction('filter$1').TreeWalker = function(arg0) { return this.filter.$call$1(arg0); };
$.dynamicFunction('get$pageY').UIEvent = function() { return this.pageY; };
$.dynamicFunction('get$pageX').UIEvent = function() { return this.pageX; };
$.dynamicFunction('get$type').HTMLUListElement = function() { return this.type; };
$.dynamicFunction('is$Element').HTMLUListElement = function() { return true; };
$.dynamicFunction('getRange$2').Uint16Array = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Uint16Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Uint16Array = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Uint16Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Uint16Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Uint16Array = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Uint16Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Uint16Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Uint16Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Uint16Array = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Uint16Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Uint16Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Uint16Array = function() { return this.length; };
$.dynamicFunction('is$List2').Uint16Array = function() { return true; };
$.dynamicFunction('is$Collection').Uint16Array = function() { return true; };
$.dynamicFunction('getRange$2').Uint32Array = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Uint32Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Uint32Array = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Uint32Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Uint32Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Uint32Array = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Uint32Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Uint32Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Uint32Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Uint32Array = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Uint32Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Uint32Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Uint32Array = function() { return this.length; };
$.dynamicFunction('is$List2').Uint32Array = function() { return true; };
$.dynamicFunction('is$Collection').Uint32Array = function() { return true; };
$.dynamicFunction('getRange$2').Uint8Array = function(start, rangeLength) {
  if (Object.getPrototypeOf(this).hasOwnProperty('getRange$2')) {
    return $.getRange2(this, start, rangeLength, []);
  } else {
    return Object.prototype.getRange$2.call(this, start, rangeLength);
  }
 };
$.dynamicFunction('removeLast$0').Uint8Array = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('removeLast$0')) {
    throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
  } else {
    return Object.prototype.removeLast$0.call(this);
  }
 };
$.dynamicFunction('last$0').Uint8Array = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('last$0')) {
    return this.operator$index$1($.sub($.get$length(this), 1));
  } else {
    return Object.prototype.last$0.call(this);
  }
 };
$.dynamicFunction('indexOf$2').Uint8Array = function(element, start) {
  if (Object.getPrototypeOf(this).hasOwnProperty('indexOf$2')) {
    return $.indexOf2(this, element, start, $.get$length(this));
  } else {
    return Object.prototype.indexOf$2.call(this, element, start);
  }
 };
$.dynamicFunction('isEmpty$0').Uint8Array = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('isEmpty$0')) {
    return $.eq($.get$length(this), 0);
  } else {
    return Object.prototype.isEmpty$0.call(this);
  }
 };
$.dynamicFunction('filter$1').Uint8Array = function(f) {
  if (Object.getPrototypeOf(this).hasOwnProperty('filter$1')) {
    return $.filter3(this, [], f);
  } else {
    return Object.prototype.filter$1.call(this, f);
  }
 };
$.dynamicFunction('forEach$1').Uint8Array = function(f) {
  if (Object.getPrototypeOf(this).hasOwnProperty('forEach$1')) {
    return $.forEach3(this, f);
  } else {
    return Object.prototype.forEach$1.call(this, f);
  }
 };
$.dynamicFunction('addAll$1').Uint8Array = function(collection) {
  if (Object.getPrototypeOf(this).hasOwnProperty('addAll$1')) {
    throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
  } else {
    return Object.prototype.addAll$1.call(this, collection);
  }
 };
$.dynamicFunction('add$1').Uint8Array = function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('add$1')) {
    throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
  } else {
    return Object.prototype.add$1.call(this, value);
  }
 };
$.dynamicFunction('iterator$0').Uint8Array = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('iterator$0')) {
    var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
  } else {
    return Object.prototype.iterator$0.call(this);
  }
 };
$.dynamicFunction('operator$indexSet$2').Uint8Array = function(index, value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('operator$indexSet$2')) {
    this[index] = value;
  } else {
    return Object.prototype.operator$indexSet$2.call(this, index, value);
  }
 };
$.dynamicFunction('operator$index$1').Uint8Array = function(index) {
  if (Object.getPrototypeOf(this).hasOwnProperty('operator$index$1')) {
    return this[index];;
  } else {
    return Object.prototype.operator$index$1.call(this, index);
  }
 };
$.dynamicFunction('get$length').Uint8Array = function() { return this.length; };
$.dynamicFunction('is$List2').Uint8Array = function() { return true; };
$.dynamicFunction('is$Collection').Uint8Array = function() { return true; };
$.dynamicFunction('getRange$2').Uint8ClampedArray = function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 };
$.dynamicFunction('removeLast$0').Uint8ClampedArray = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('last$0').Uint8ClampedArray = function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 };
$.dynamicFunction('indexOf$2').Uint8ClampedArray = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Uint8ClampedArray = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('filter$1').Uint8ClampedArray = function(f) {
  return $.filter3(this, [], f);
 };
$.dynamicFunction('forEach$1').Uint8ClampedArray = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Uint8ClampedArray = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Uint8ClampedArray = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Uint8ClampedArray = function() {
  var t0 = $._lib3_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Uint8ClampedArray = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Uint8ClampedArray = function(index) {
  return this[index];;
 };
$.dynamicFunction('is$List2').Uint8ClampedArray = function() { return true; };
$.dynamicFunction('is$Collection').Uint8ClampedArray = function() { return true; };
$.dynamicFunction('is$Element').HTMLUnknownElement = function() { return true; };
$.dynamicFunction('set$width').HTMLVideoElement = function(v) { this.width = v; };
$.dynamicFunction('set$height').HTMLVideoElement = function(v) { this.height = v; };
$.dynamicFunction('is$Element').HTMLVideoElement = function() { return true; };
$.dynamicFunction('get$type').WebGLActiveInfo = function() { return this.type; };
$.dynamicFunction('viewport$4').WebGLRenderingContext = function(x, y, width, height) {
  return this.viewport(x,y,width,height);
 };
$.dynamicFunction('vertexAttribPointer$6').WebGLRenderingContext = function(indx, size, type, normalized, stride, offset) {
  return this.vertexAttribPointer(indx,size,type,normalized,stride,offset);
 };
$.dynamicFunction('useProgram$1').WebGLRenderingContext = function(program) {
  return this.useProgram(program);
 };
$.dynamicFunction('uniform4f$5').WebGLRenderingContext = function(location, x, y, z, w) {
  return this.uniform4f(location,x,y,z,w);
 };
$.dynamicFunction('uniform2f$3').WebGLRenderingContext = function(location, x, y) {
  return this.uniform2f(location,x,y);
 };
$.dynamicFunction('uniform1i$2').WebGLRenderingContext = function(location, x) {
  return this.uniform1i(location,x);
 };
$.dynamicFunction('uniform1f$2').WebGLRenderingContext = function(location, x) {
  return this.uniform1f(location,x);
 };
$.dynamicFunction('texParameteri$3').WebGLRenderingContext = function(target, pname, param) {
  return this.texParameteri(target,pname,param);
 };
$.dynamicFunction('texImage2D$9').WebGLRenderingContext = function(target, level, internalformat, format_OR_width, height_OR_type, border_OR_canvas_OR_image_OR_pixels_OR_video, format, type, pixels) {
  return this.texImage2D(target,level,internalformat,format_OR_width,height_OR_type,border_OR_canvas_OR_image_OR_pixels_OR_video,format,type,pixels);
 };
$.dynamicFunction('shaderSource$2').WebGLRenderingContext = function(shader, string) {
  return this.shaderSource(shader,string);
 };
$.dynamicFunction('pixelStorei$2').WebGLRenderingContext = function(pname, param) {
  return this.pixelStorei(pname,param);
 };
$.dynamicFunction('linkProgram$1').WebGLRenderingContext = function(program) {
  return this.linkProgram(program);
 };
$.dynamicFunction('getUniformLocation$2').WebGLRenderingContext = function(program, name) {
  return this.getUniformLocation(program,name);
 };
$.dynamicFunction('getAttribLocation$2').WebGLRenderingContext = function(program, name) {
  return this.getAttribLocation(program,name);
 };
$.dynamicFunction('framebufferTexture2D$5').WebGLRenderingContext = function(target, attachment, textarget, texture, level) {
  return this.framebufferTexture2D(target,attachment,textarget,texture,level);
 };
$.dynamicFunction('flush$0').WebGLRenderingContext = function() {
  return this.flush();
 };
$.dynamicFunction('enableVertexAttribArray$1').WebGLRenderingContext = function(index) {
  return this.enableVertexAttribArray(index);
 };
$.dynamicFunction('drawArrays$3').WebGLRenderingContext = function(mode, first, count) {
  return this.drawArrays(mode,first,count);
 };
$.dynamicFunction('createTexture$0').WebGLRenderingContext = function() {
  return this.createTexture();
 };
$.dynamicFunction('createShader$1').WebGLRenderingContext = function(type) {
  return this.createShader(type);
 };
$.dynamicFunction('createProgram$0').WebGLRenderingContext = function() {
  return this.createProgram();
 };
$.dynamicFunction('createFramebuffer$0').WebGLRenderingContext = function() {
  return this.createFramebuffer();
 };
$.dynamicFunction('createBuffer$0').WebGLRenderingContext = function() {
  return this.createBuffer();
 };
$.dynamicFunction('compileShader$1').WebGLRenderingContext = function(shader) {
  return this.compileShader(shader);
 };
$.dynamicFunction('bufferSubData$3').WebGLRenderingContext = function(target, offset, data) {
  return this.bufferSubData(target,offset,data);
 };
$.dynamicFunction('bufferData$3').WebGLRenderingContext = function(target, data_OR_size, usage) {
  return this.bufferData(target,data_OR_size,usage);
 };
$.dynamicFunction('bindTexture$2').WebGLRenderingContext = function(target, texture) {
  return this.bindTexture(target,texture);
 };
$.dynamicFunction('bindFramebuffer$2').WebGLRenderingContext = function(target, framebuffer) {
  return this.bindFramebuffer(target,framebuffer);
 };
$.dynamicFunction('bindBuffer$2').WebGLRenderingContext = function(target, buffer) {
  return this.bindBuffer(target,buffer);
 };
$.dynamicFunction('attachShader$2').WebGLRenderingContext = function(program, shader) {
  return this.attachShader(program,shader);
 };
$.dynamicFunction('activeTexture$1').WebGLRenderingContext = function(texture) {
  return this.activeTexture(texture);
 };
$.dynamicFunction('is$WebGLRenderingContext').WebGLRenderingContext = function() { return true; };
$.dynamicFunction('$dom_addEventListener$3').WebSocket = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').WebSocket = function() {
  return $._lib3_WebSocketEventsImpl$1(this);
 };
$.dynamicFunction('webkitRequestAnimationFrame$1').DOMWindow = function(callback) {
  return this.webkitRequestAnimationFrame($.convertDartClosureToJS(callback));
 };
$.dynamicFunction('$dom_addEventListener$3').DOMWindow = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$window').DOMWindow = function() { return this.window; };
$.dynamicFunction('get$navigator').DOMWindow = function() { return this.navigator; };
$.dynamicFunction('get$length').DOMWindow = function() { return this.length; };
$.dynamicFunction('get$on').DOMWindow = function() {
  return $._lib3_WindowEventsImpl$1(this);
 };
$.dynamicFunction('get$on').Worker = function() {
  return $._lib3_WorkerEventsImpl$1(this);
 };
$.dynamicFunction('$dom_addEventListener$3').WorkerContext = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$navigator').WorkerContext = function() { return this.navigator; };
$.dynamicFunction('get$on').WorkerContext = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._lib3_WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 };
$.dynamicFunction('toString$0').WorkerLocation = function() {
  return this.toString();
 };
$.dynamicFunction('get$userAgent').WorkerNavigator = function() { return this.userAgent; };
$.dynamicFunction('$dom_addEventListener$3').XMLHttpRequest = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').XMLHttpRequest = function() {
  return $._lib3_XMLHttpRequestEventsImpl$1(this);
 };
$.dynamicFunction('toString$0').XMLHttpRequestException = function() {
  return this.toString();
 };
$.dynamicFunction('$dom_addEventListener$3').XMLHttpRequestUpload = function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 };
$.dynamicFunction('get$on').XMLHttpRequestUpload = function() {
  return $._lib3_XMLHttpRequestUploadEventsImpl$1(this);
 };
$.dynamicFunction('toString$0').XPathException = function() {
  return this.toString();
 };
$.dynamicFunction('reset$0').XSLTProcessor = function() {
  return this.reset();
 };
// 286 dynamic classes.
// 349 classes
// 30 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v9/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v10/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v11/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v12/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v13/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v14/*class(_NodeImpl)*/ = [v9/*class(_ElementImpl)*/,v10/*class(_DocumentFragmentImpl)*/,v11/*class(_DocumentImpl)*/,v12/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v15/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v16/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v17/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v17/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', v1/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v1/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['UIEvent', v8/*class(_UIEventImpl)*/],
    ['Blob', 'Blob|File'],
    ['WorkerContext', v13/*class(_WorkerContextImpl)*/],
    ['CSSRule', 'CSSRule|WebKitCSSRegionRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v12/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v11/*class(_DocumentImpl)*/],
    ['DocumentFragment', v10/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v9/*class(_ElementImpl)*/],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v8/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v14/*class(_NodeImpl)*/],
    ['MediaStream', v15/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v16/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v13/*class(_WorkerContextImpl)*/,v14/*class(_NodeImpl)*/,v15/*class(_MediaStreamImpl)*/,v16/*class(_IDBRequestImpl)*/,v17/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']];
$.dynamicSetMetadata(table);
})();

})();
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "(function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      var len = field.length;
      var lastChar = field[len - 1];
      var needsGetter = false;
      var needsSetter = false;
      switch (lastChar) {
        case '?': needsGetter = true; break;
        case '=': needsGetter = true; // Fall-through.
        case '!': needsSetter = true;
      }
      if (needsGetter || needsSetter) field = field.substring(0, len - 1);
      str += field;
      body += "this." + field + " = " + field + ";\n";
      if (needsGetter) {
        var getterString = "return this." + field + ";";
        prototype["get$" + field] = new Function(getterString);
      }
      if (needsSetter) {
        var setterString = "this." + field + " = v;";
        prototype["set$" + field] = new Function("v", setterString);
      }
    }
    str += ") {" + body + "})";
    constructor = eval(str);
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
