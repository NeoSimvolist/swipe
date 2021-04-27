/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@neosimvolist/swipe/dist/esm2015.bundle.js
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*! For license information please see esm2015.bundle.js.LICENSE.txt */
var e = {
  732: function _(e, t, i) {
    i.d(t, {
      Z: function Z() {
        return n;
      }
    });
    var r = i(645),
        s = i.n(r)()(function (e) {
      return e[1];
    });
    s.push([e.id, ":host{display:flex;position:relative;overflow:hidden}:host ::slotted(.swipe-item){flex-grow:1;touch-action:none;min-width:0}:host ::slotted(.swipe-item--virtual){position:absolute;z-index:0;top:0;left:0;width:100%;height:100%}:host ::slotted(.swipe-item--active){position:relative;z-index:1}:host ::slotted(.swipe-item--hide){display:none !important}", ""]);
    var n = s;
  },
  645: function _(e) {
    e.exports = function (e) {
      var t = [];
      return t.toString = function () {
        return this.map(function (t) {
          var i = e(t);
          return t[2] ? "@media ".concat(t[2], " {").concat(i, "}") : i;
        }).join("");
      }, t.i = function (e, i, r) {
        "string" == typeof e && (e = [[null, e, ""]]);
        var s = {};
        if (r) for (var n = 0; n < this.length; n++) {
          var a = this[n][0];
          null != a && (s[a] = !0);
        }

        for (var o = 0; o < e.length; o++) {
          var h = [].concat(e[o]);
          r && s[h[0]] || (i && (h[2] ? h[2] = "".concat(i, " and ").concat(h[2]) : h[2] = i), t.push(h));
        }
      }, t;
    };
  }
},
    t = {};

function i(r) {
  var s = t[r];
  if (void 0 !== s) return s.exports;
  var n = t[r] = {
    id: r,
    exports: {}
  };
  return e[r](n, n.exports, i), n.exports;
}

i.n = function (e) {
  var t = e && e.__esModule ? function () {
    return e.default;
  } : function () {
    return e;
  };
  return i.d(t, {
    a: t
  }), t;
}, i.d = function (e, t) {
  for (var r in t) {
    i.o(t, r) && !i.o(e, r) && Object.defineProperty(e, r, {
      enumerable: !0,
      get: t[r]
    });
  }
}, i.o = function (e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
};
var r = {};

(function () {
  i.d(r, {
    Mj: function Mj() {
      return de;
    },
    Vd: function Vd() {
      return pe;
    },
    Ql: function Ql() {
      return se;
    }
  });

  var e = i(732),
      t = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
      s = function s(e, t) {
    for (var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null; t !== i;) {
      var r = t.nextSibling;
      e.removeChild(t), t = r;
    }
  },
      n = "{{lit-".concat(String(Math.random()).slice(2), "}}"),
      a = "\x3c!--".concat(n, "--\x3e"),
      o = new RegExp("".concat(n, "|").concat(a)),
      h = "$lit$";

  var l = function l(e, t) {
    _classCallCheck(this, l);

    this.parts = [], this.element = t;

    for (var i = [], r = [], s = document.createTreeWalker(t.content, 133, null, !1), a = 0, _l = -1, u = 0, m = e.strings, v = e.values.length; u < v;) {
      var f = s.nextNode();

      if (null !== f) {
        if (_l++, 1 === f.nodeType) {
          if (f.hasAttributes()) {
            for (var g = f.attributes, y = g.length, _ = 0, w = 0; w < y; w++) {
              d(g[w].name, h) && _++;
            }

            for (; _-- > 0;) {
              var S = m[u],
                  b = p.exec(S)[2],
                  I = b.toLowerCase() + h,
                  x = f.getAttribute(I);
              f.removeAttribute(I);
              var P = x.split(o);
              this.parts.push({
                type: "attribute",
                index: _l,
                name: b,
                strings: P
              }), u += P.length - 1;
            }
          }

          "TEMPLATE" === f.tagName && (r.push(f), s.currentNode = f.content);
        } else if (3 === f.nodeType) {
          var E = f.data;

          if (E.indexOf(n) >= 0) {
            for (var C = f.parentNode, V = E.split(o), N = V.length - 1, T = 0; T < N; T++) {
              var O = void 0,
                  A = V[T];
              if ("" === A) O = c();else {
                var L = p.exec(A);
                null !== L && d(L[2], h) && (A = A.slice(0, L.index) + L[1] + L[2].slice(0, -h.length) + L[3]), O = document.createTextNode(A);
              }
              C.insertBefore(O, f), this.parts.push({
                type: "node",
                index: ++_l
              });
            }

            "" === V[N] ? (C.insertBefore(c(), f), i.push(f)) : f.data = V[N], u += N;
          }
        } else if (8 === f.nodeType) if (f.data === n) {
          var j = f.parentNode;
          null !== f.previousSibling && _l !== a || (_l++, j.insertBefore(c(), f)), a = _l, this.parts.push({
            type: "node",
            index: _l
          }), null === f.nextSibling ? f.data = "" : (i.push(f), _l--), u++;
        } else for (var M = -1; -1 !== (M = f.data.indexOf(n, M + 1));) {
          this.parts.push({
            type: "node",
            index: -1
          }), u++;
        }
      } else s.currentNode = r.pop();
    }

    for (var _i2 = 0, _i = i; _i2 < _i.length; _i2++) {
      var k = _i[_i2];
      k.parentNode.removeChild(k);
    }
  };

  var d = function d(e, t) {
    var i = e.length - t.length;
    return i >= 0 && e.slice(i) === t;
  },
      u = function u(e) {
    return -1 !== e.index;
  },
      c = function c() {
    return document.createComment("");
  },
      p = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,
      m = 133;

  function v(e, t) {
    for (var i = e.element.content, r = e.parts, s = document.createTreeWalker(i, m, null, !1), n = g(r), a = r[n], o = -1, h = 0, l = [], d = null; s.nextNode();) {
      o++;
      var u = s.currentNode;

      for (u.previousSibling === d && (d = null), t.has(u) && (l.push(u), null === d && (d = u)), null !== d && h++; void 0 !== a && a.index === o;) {
        a.index = null !== d ? -1 : a.index - h, a = r[n = g(r, n)];
      }
    }

    l.forEach(function (e) {
      return e.parentNode.removeChild(e);
    });
  }

  var f = function f(e) {
    for (var t = 11 === e.nodeType ? 0 : 1, i = document.createTreeWalker(e, m, null, !1); i.nextNode();) {
      t++;
    }

    return t;
  },
      g = function g(e) {
    for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, i = t + 1; i < e.length; i++) {
      var r = e[i];
      if (u(r)) return i;
    }

    return -1;
  },
      y = new WeakMap(),
      _ = function _(e) {
    return "function" == typeof e && y.has(e);
  },
      w = {},
      S = {};

  var b = /*#__PURE__*/function () {
    function b(e, t, i) {
      _classCallCheck(this, b);

      this.__parts = [], this.template = e, this.processor = t, this.options = i;
    }

    _createClass(b, [{
      key: "update",
      value: function update(e) {
        var t = 0;

        var _iterator = _createForOfIteratorHelper(this.__parts),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var i = _step.value;
            void 0 !== i && i.setValue(e[t]), t++;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper(this.__parts),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var r = _step2.value;
            void 0 !== r && r.commit();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }, {
      key: "_clone",
      value: function _clone() {
        for (var e, i = t ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0), r = [], s = this.template.parts, n = document.createTreeWalker(i, 133, null, !1), a = 0, o = 0, h = n.nextNode(); a < s.length;) {
          if (e = s[a], u(e)) {
            var _this$__parts;

            for (; o < e.index;) {
              o++, "TEMPLATE" === h.nodeName && (r.push(h), n.currentNode = h.content), null === (h = n.nextNode()) && (n.currentNode = r.pop(), h = n.nextNode());
            }

            if ("node" === e.type) {
              var l = this.processor.handleTextExpression(this.options);
              l.insertAfterNode(h.previousSibling), this.__parts.push(l);
            } else (_this$__parts = this.__parts).push.apply(_this$__parts, _toConsumableArray(this.processor.handleAttributeExpressions(h, e.name, e.strings, this.options)));

            a++;
          } else this.__parts.push(void 0), a++;
        }

        return t && (document.adoptNode(i), customElements.upgrade(i)), i;
      }
    }]);

    return b;
  }();

  var I = window.trustedTypes && trustedTypes.createPolicy("lit-html", {
    createHTML: function createHTML(e) {
      return e;
    }
  }),
      x = " ".concat(n, " ");

  var P = /*#__PURE__*/function () {
    function P(e, t, i, r) {
      _classCallCheck(this, P);

      this.strings = e, this.values = t, this.type = i, this.processor = r;
    }

    _createClass(P, [{
      key: "getHTML",
      value: function getHTML() {
        for (var e = this.strings.length - 1, t = "", i = !1, r = 0; r < e; r++) {
          var s = this.strings[r],
              o = s.lastIndexOf("\x3c!--");
          i = (o > -1 || i) && -1 === s.indexOf("--\x3e", o + 1);
          var l = p.exec(s);
          t += null === l ? s + (i ? x : a) : s.substr(0, l.index) + l[1] + l[2] + h + l[3] + n;
        }

        return t + this.strings[e];
      }
    }, {
      key: "getTemplateElement",
      value: function getTemplateElement() {
        var e = document.createElement("template"),
            t = this.getHTML();
        return void 0 !== I && (t = I.createHTML(t)), e.innerHTML = t, e;
      }
    }]);

    return P;
  }();

  var E = function E(e) {
    return null === e || !("object" == _typeof(e) || "function" == typeof e);
  },
      C = function C(e) {
    return Array.isArray(e) || !(!e || !e[Symbol.iterator]);
  };

  var V = /*#__PURE__*/function () {
    function V(e, t, i) {
      _classCallCheck(this, V);

      this.dirty = !0, this.element = e, this.name = t, this.strings = i, this.parts = [];

      for (var r = 0; r < i.length - 1; r++) {
        this.parts[r] = this._createPart();
      }
    }

    _createClass(V, [{
      key: "_createPart",
      value: function _createPart() {
        return new N(this);
      }
    }, {
      key: "_getValue",
      value: function _getValue() {
        var e = this.strings,
            t = e.length - 1,
            i = this.parts;

        if (1 === t && "" === e[0] && "" === e[1]) {
          var r = i[0].value;
          if ("symbol" == _typeof(r)) return String(r);
          if ("string" == typeof r || !C(r)) return r;
        }

        for (var s = "", n = 0; n < t; n++) {
          s += e[n];
          var a = i[n];

          if (void 0 !== a) {
            var o = a.value;
            if (E(o) || !C(o)) s += "string" == typeof o ? o : String(o);else {
              var _iterator3 = _createForOfIteratorHelper(o),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var h = _step3.value;
                  s += "string" == typeof h ? h : String(h);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }
        }

        return s + e[t];
      }
    }, {
      key: "commit",
      value: function commit() {
        this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
      }
    }]);

    return V;
  }();

  var N = /*#__PURE__*/function () {
    function N(e) {
      _classCallCheck(this, N);

      this.value = void 0, this.committer = e;
    }

    _createClass(N, [{
      key: "setValue",
      value: function setValue(e) {
        e === w || E(e) && e === this.value || (this.value = e, _(e) || (this.committer.dirty = !0));
      }
    }, {
      key: "commit",
      value: function commit() {
        for (; _(this.value);) {
          var e = this.value;
          this.value = w, e(this);
        }

        this.value !== w && this.committer.commit();
      }
    }]);

    return N;
  }();

  var T = /*#__PURE__*/function () {
    function T(e) {
      _classCallCheck(this, T);

      this.value = void 0, this.__pendingValue = void 0, this.options = e;
    }

    _createClass(T, [{
      key: "appendInto",
      value: function appendInto(e) {
        this.startNode = e.appendChild(c()), this.endNode = e.appendChild(c());
      }
    }, {
      key: "insertAfterNode",
      value: function insertAfterNode(e) {
        this.startNode = e, this.endNode = e.nextSibling;
      }
    }, {
      key: "appendIntoPart",
      value: function appendIntoPart(e) {
        e.__insert(this.startNode = c()), e.__insert(this.endNode = c());
      }
    }, {
      key: "insertAfterPart",
      value: function insertAfterPart(e) {
        e.__insert(this.startNode = c()), this.endNode = e.endNode, e.endNode = this.startNode;
      }
    }, {
      key: "setValue",
      value: function setValue(e) {
        this.__pendingValue = e;
      }
    }, {
      key: "commit",
      value: function commit() {
        if (null !== this.startNode.parentNode) {
          for (; _(this.__pendingValue);) {
            var e = this.__pendingValue;
            this.__pendingValue = w, e(this);
          }

          var t = this.__pendingValue;
          t !== w && (E(t) ? t !== this.value && this.__commitText(t) : t instanceof P ? this.__commitTemplateResult(t) : t instanceof Node ? this.__commitNode(t) : C(t) ? this.__commitIterable(t) : t === S ? (this.value = S, this.clear()) : this.__commitText(t));
        }
      }
    }, {
      key: "__insert",
      value: function __insert(e) {
        this.endNode.parentNode.insertBefore(e, this.endNode);
      }
    }, {
      key: "__commitNode",
      value: function __commitNode(e) {
        this.value !== e && (this.clear(), this.__insert(e), this.value = e);
      }
    }, {
      key: "__commitText",
      value: function __commitText(e) {
        var t = this.startNode.nextSibling,
            i = "string" == typeof (e = null == e ? "" : e) ? e : String(e);
        t === this.endNode.previousSibling && 3 === t.nodeType ? t.data = i : this.__commitNode(document.createTextNode(i)), this.value = e;
      }
    }, {
      key: "__commitTemplateResult",
      value: function __commitTemplateResult(e) {
        var t = this.options.templateFactory(e);
        if (this.value instanceof b && this.value.template === t) this.value.update(e.values);else {
          var i = new b(t, e.processor, this.options),
              r = i._clone();

          i.update(e.values), this.__commitNode(r), this.value = i;
        }
      }
    }, {
      key: "__commitIterable",
      value: function __commitIterable(e) {
        Array.isArray(this.value) || (this.value = [], this.clear());
        var t,
            i = this.value,
            r = 0;

        var _iterator4 = _createForOfIteratorHelper(e),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var s = _step4.value;
            void 0 === (t = i[r]) && (t = new T(this.options), i.push(t), 0 === r ? t.appendIntoPart(this) : t.insertAfterPart(i[r - 1])), t.setValue(s), t.commit(), r++;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        r < i.length && (i.length = r, this.clear(t && t.endNode));
      }
    }, {
      key: "clear",
      value: function clear() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.startNode;
        s(this.startNode.parentNode, e.nextSibling, this.endNode);
      }
    }]);

    return T;
  }();

  var O = /*#__PURE__*/function () {
    function O(e, t, i) {
      _classCallCheck(this, O);

      if (this.value = void 0, this.__pendingValue = void 0, 2 !== i.length || "" !== i[0] || "" !== i[1]) throw new Error("Boolean attributes can only contain a single expression");
      this.element = e, this.name = t, this.strings = i;
    }

    _createClass(O, [{
      key: "setValue",
      value: function setValue(e) {
        this.__pendingValue = e;
      }
    }, {
      key: "commit",
      value: function commit() {
        for (; _(this.__pendingValue);) {
          var e = this.__pendingValue;
          this.__pendingValue = w, e(this);
        }

        if (this.__pendingValue !== w) {
          var t = !!this.__pendingValue;
          this.value !== t && (t ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = t), this.__pendingValue = w;
        }
      }
    }]);

    return O;
  }();

  var A = /*#__PURE__*/function (_V) {
    _inherits(A, _V);

    var _super = _createSuper(A);

    function A(e, t, i) {
      var _this;

      _classCallCheck(this, A);

      _this = _super.call(this, e, t, i), _this.single = 2 === i.length && "" === i[0] && "" === i[1];
      return _this;
    }

    _createClass(A, [{
      key: "_createPart",
      value: function _createPart() {
        return new L(this);
      }
    }, {
      key: "_getValue",
      value: function _getValue() {
        return this.single ? this.parts[0].value : _get(_getPrototypeOf(A.prototype), "_getValue", this).call(this);
      }
    }, {
      key: "commit",
      value: function commit() {
        this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
      }
    }]);

    return A;
  }(V);

  var L = /*#__PURE__*/function (_N) {
    _inherits(L, _N);

    var _super2 = _createSuper(L);

    function L() {
      _classCallCheck(this, L);

      return _super2.apply(this, arguments);
    }

    return L;
  }(N);

  var j = !1;

  (function () {
    try {
      var e = {
        get capture() {
          return j = !0, !1;
        }

      };
      window.addEventListener("test", e, e), window.removeEventListener("test", e, e);
    } catch (e) {}
  })();

  var M = /*#__PURE__*/function () {
    function M(e, t, i) {
      var _this2 = this;

      _classCallCheck(this, M);

      this.value = void 0, this.__pendingValue = void 0, this.element = e, this.eventName = t, this.eventContext = i, this.__boundHandleEvent = function (e) {
        return _this2.handleEvent(e);
      };
    }

    _createClass(M, [{
      key: "setValue",
      value: function setValue(e) {
        this.__pendingValue = e;
      }
    }, {
      key: "commit",
      value: function commit() {
        for (; _(this.__pendingValue);) {
          var e = this.__pendingValue;
          this.__pendingValue = w, e(this);
        }

        if (this.__pendingValue !== w) {
          var t = this.__pendingValue,
              i = this.value,
              r = null == t || null != i && (t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive),
              s = null != t && (null == i || r);
          r && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), s && (this.__options = k(t), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = t, this.__pendingValue = w;
        }
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(e) {
        "function" == typeof this.value ? this.value.call(this.eventContext || this.element, e) : this.value.handleEvent(e);
      }
    }]);

    return M;
  }();

  var k = function k(e) {
    return e && (j ? {
      capture: e.capture,
      passive: e.passive,
      once: e.once
    } : e.capture);
  };

  function U(e) {
    var t = R.get(e.type);
    void 0 === t && (t = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    }, R.set(e.type, t));
    var i = t.stringsArray.get(e.strings);
    if (void 0 !== i) return i;
    var r = e.strings.join(n);
    return void 0 === (i = t.keyString.get(r)) && (i = new l(e, e.getTemplateElement()), t.keyString.set(r, i)), t.stringsArray.set(e.strings, i), i;
  }

  var R = new Map(),
      W = new WeakMap(),
      q = new ( /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "handleAttributeExpressions",
      value: function handleAttributeExpressions(e, t, i, r) {
        var s = t[0];
        return "." === s ? new A(e, t.slice(1), i).parts : "@" === s ? [new M(e, t.slice(1), r.eventContext)] : "?" === s ? [new O(e, t.slice(1), i)] : new V(e, t, i).parts;
      }
    }, {
      key: "handleTextExpression",
      value: function handleTextExpression(e) {
        return new T(e);
      }
    }]);

    return _class;
  }())();
  "undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.3.0");

  var H = function H(e, t) {
    return "".concat(e, "--").concat(t);
  },
      z = !0;

  void 0 === window.ShadyCSS ? z = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), z = !1);

  var G = function G(e) {
    return function (t) {
      var i = H(t.type, e),
          r = R.get(i);
      void 0 === r && (r = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      }, R.set(i, r));
      var s = r.stringsArray.get(t.strings);
      if (void 0 !== s) return s;
      var a = t.strings.join(n);

      if (void 0 === (s = r.keyString.get(a))) {
        var o = t.getTemplateElement();
        z && window.ShadyCSS.prepareTemplateDom(o, e), s = new l(t, o), r.keyString.set(a, s);
      }

      return r.stringsArray.set(t.strings, s), s;
    };
  },
      D = ["html", "svg"],
      F = new Set();

  function B(e, t, i, r, s, n, a) {
    try {
      var o = e[n](a),
          h = o.value;
    } catch (e) {
      return void i(e);
    }

    o.done ? t(h) : Promise.resolve(h).then(r, s);
  }

  window.JSCompiler_renameProperty = function (e, t) {
    return e;
  };

  var X = {
    toAttribute: function toAttribute(e, t) {
      switch (t) {
        case Boolean:
          return e ? "" : null;

        case Object:
        case Array:
          return null == e ? e : JSON.stringify(e);
      }

      return e;
    },
    fromAttribute: function fromAttribute(e, t) {
      switch (t) {
        case Boolean:
          return null !== e;

        case Number:
          return null === e ? null : Number(e);

        case Object:
        case Array:
          return JSON.parse(e);
      }

      return e;
    }
  },
      J = function J(e, t) {
    return t !== e && (t == t || e == e);
  },
      $ = {
    attribute: !0,
    type: String,
    converter: X,
    reflect: !1,
    hasChanged: J
  };

  var Q = /*#__PURE__*/function (_HTMLElement) {
    _inherits(Q, _HTMLElement);

    var _super3 = _createSuper(Q);

    function Q() {
      var _this3;

      _classCallCheck(this, Q);

      _this3 = _super3.call(this), _this3.initialize();
      return _this3;
    }

    _createClass(Q, [{
      key: "initialize",
      value: function initialize() {
        var _this4 = this;

        this._updateState = 0, this._updatePromise = new Promise(function (e) {
          return _this4._enableUpdatingResolver = e;
        }), this._changedProperties = new Map(), this._saveInstanceProperties(), this.requestUpdateInternal();
      }
    }, {
      key: "_saveInstanceProperties",
      value: function _saveInstanceProperties() {
        var _this5 = this;

        this.constructor._classProperties.forEach(function (e, t) {
          if (_this5.hasOwnProperty(t)) {
            var i = _this5[t];
            delete _this5[t], _this5._instanceProperties || (_this5._instanceProperties = new Map()), _this5._instanceProperties.set(t, i);
          }
        });
      }
    }, {
      key: "_applyInstanceProperties",
      value: function _applyInstanceProperties() {
        var _this6 = this;

        this._instanceProperties.forEach(function (e, t) {
          return _this6[t] = e;
        }), this._instanceProperties = void 0;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.enableUpdating();
      }
    }, {
      key: "enableUpdating",
      value: function enableUpdating() {
        void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {}
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(e, t, i) {
        t !== i && this._attributeToProperty(e, i);
      }
    }, {
      key: "_propertyToAttribute",
      value: function _propertyToAttribute(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : $,
            r = this.constructor,
            s = r._attributeNameForProperty(e, i);

        if (void 0 !== s) {
          var n = r._propertyValueToAttribute(t, i);

          if (void 0 === n) return;
          this._updateState = 8 | this._updateState, null == n ? this.removeAttribute(s) : this.setAttribute(s, n), this._updateState = -9 & this._updateState;
        }
      }
    }, {
      key: "_attributeToProperty",
      value: function _attributeToProperty(e, t) {
        if (!(8 & this._updateState)) {
          var i = this.constructor,
              r = i._attributeToPropertyMap.get(e);

          if (void 0 !== r) {
            var s = i.getPropertyOptions(r);
            this._updateState = 16 | this._updateState, this[r] = i._propertyValueFromAttribute(t, s), this._updateState = -17 & this._updateState;
          }
        }
      }
    }, {
      key: "requestUpdateInternal",
      value: function requestUpdateInternal(e, t, i) {
        var r = !0;

        if (void 0 !== e) {
          var s = this.constructor;
          i = i || s.getPropertyOptions(e), s._valueHasChanged(this[e], t, i.hasChanged) ? (this._changedProperties.has(e) || this._changedProperties.set(e, t), !0 !== i.reflect || 16 & this._updateState || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(e, i))) : r = !1;
        }

        !this._hasRequestedUpdate && r && (this._updatePromise = this._enqueueUpdate());
      }
    }, {
      key: "requestUpdate",
      value: function requestUpdate(e, t) {
        return this.requestUpdateInternal(e, t), this.updateComplete;
      }
    }, {
      key: "_enqueueUpdate",
      value: function _enqueueUpdate() {
        var e,
            t = this;
        return (e = /*#__PURE__*/regeneratorRuntime.mark(function e() {
          var e;
          return regeneratorRuntime.wrap(function e$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  t._updateState = 4 | t._updateState;
                  _context.prev = 1;
                  _context.next = 4;
                  return t._updatePromise;

                case 4:
                  _context.next = 8;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](1);

                case 8:
                  e = t.performUpdate();
                  _context.t1 = null != e;

                  if (!_context.t1) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 13;
                  return e;

                case 13:
                  return _context.abrupt("return", !t._hasRequestedUpdate);

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, e, null, [[1, 6]]);
        }), function () {
          var t = this,
              i = arguments;
          return new Promise(function (r, s) {
            var n = e.apply(t, i);

            function a(e) {
              B(n, r, s, a, o, "next", e);
            }

            function o(e) {
              B(n, r, s, a, o, "throw", e);
            }

            a(void 0);
          });
        })();
      }
    }, {
      key: "_hasRequestedUpdate",
      get: function get() {
        return 4 & this._updateState;
      }
    }, {
      key: "hasUpdated",
      get: function get() {
        return 1 & this._updateState;
      }
    }, {
      key: "performUpdate",
      value: function performUpdate() {
        if (this._hasRequestedUpdate) {
          this._instanceProperties && this._applyInstanceProperties();
          var e = !1,
              t = this._changedProperties;

          try {
            (e = this.shouldUpdate(t)) ? this.update(t) : this._markUpdated();
          } catch (t) {
            throw e = !1, this._markUpdated(), t;
          }

          e && (1 & this._updateState || (this._updateState = 1 | this._updateState, this.firstUpdated(t)), this.updated(t));
        }
      }
    }, {
      key: "_markUpdated",
      value: function _markUpdated() {
        this._changedProperties = new Map(), this._updateState = -5 & this._updateState;
      }
    }, {
      key: "updateComplete",
      get: function get() {
        return this._getUpdateComplete();
      }
    }, {
      key: "_getUpdateComplete",
      value: function _getUpdateComplete() {
        return this._updatePromise;
      }
    }, {
      key: "shouldUpdate",
      value: function shouldUpdate(e) {
        return !0;
      }
    }, {
      key: "update",
      value: function update(e) {
        var _this7 = this;

        void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach(function (e, t) {
          return _this7._propertyToAttribute(t, _this7[t], e);
        }), this._reflectingProperties = void 0), this._markUpdated();
      }
    }, {
      key: "updated",
      value: function updated(e) {}
    }, {
      key: "firstUpdated",
      value: function firstUpdated(e) {}
    }], [{
      key: "observedAttributes",
      get: function get() {
        var _this8 = this;

        this.finalize();
        var e = [];
        return this._classProperties.forEach(function (t, i) {
          var r = _this8._attributeNameForProperty(i, t);

          void 0 !== r && (_this8._attributeToPropertyMap.set(r, i), e.push(r));
        }), e;
      }
    }, {
      key: "_ensureClassProperties",
      value: function _ensureClassProperties() {
        var _this9 = this;

        if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
          this._classProperties = new Map();

          var e = Object.getPrototypeOf(this)._classProperties;

          void 0 !== e && e.forEach(function (e, t) {
            return _this9._classProperties.set(t, e);
          });
        }
      }
    }, {
      key: "createProperty",
      value: function createProperty(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : $;

        if (this._ensureClassProperties(), this._classProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
          var i = "symbol" == _typeof(e) ? Symbol() : "__".concat(e),
              r = this.getPropertyDescriptor(e, i, t);
          void 0 !== r && Object.defineProperty(this.prototype, e, r);
        }
      }
    }, {
      key: "getPropertyDescriptor",
      value: function getPropertyDescriptor(e, t, i) {
        return {
          get: function get() {
            return this[t];
          },
          set: function set(r) {
            var s = this[e];
            this[t] = r, this.requestUpdateInternal(e, s, i);
          },
          configurable: !0,
          enumerable: !0
        };
      }
    }, {
      key: "getPropertyOptions",
      value: function getPropertyOptions(e) {
        return this._classProperties && this._classProperties.get(e) || $;
      }
    }, {
      key: "finalize",
      value: function finalize() {
        var e = Object.getPrototypeOf(this);

        if (e.hasOwnProperty("finalized") || e.finalize(), this.finalized = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
          var t = this.properties,
              i = [].concat(_toConsumableArray(Object.getOwnPropertyNames(t)), _toConsumableArray("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : []));

          var _iterator5 = _createForOfIteratorHelper(i),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var r = _step5.value;
              this.createProperty(r, t[r]);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }
    }, {
      key: "_attributeNameForProperty",
      value: function _attributeNameForProperty(e, t) {
        var i = t.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof e ? e.toLowerCase() : void 0;
      }
    }, {
      key: "_valueHasChanged",
      value: function _valueHasChanged(e, t) {
        return (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : J)(e, t);
      }
    }, {
      key: "_propertyValueFromAttribute",
      value: function _propertyValueFromAttribute(e, t) {
        var i = t.type,
            r = t.converter || X,
            s = "function" == typeof r ? r : r.fromAttribute;
        return s ? s(e, i) : e;
      }
    }, {
      key: "_propertyValueToAttribute",
      value: function _propertyValueToAttribute(e, t) {
        if (void 0 !== t.reflect) {
          var i = t.type,
              r = t.converter;
          return (r && r.toAttribute || X.toAttribute)(e, i);
        }
      }
    }]);

    return Q;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  Q.finalized = !0;
  var Y = Element.prototype;
  Y.msMatchesSelector || Y.webkitMatchesSelector;
  var Z = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
      K = Symbol();

  var ee = /*#__PURE__*/function () {
    function ee(e, t) {
      _classCallCheck(this, ee);

      if (t !== K) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = e;
    }

    _createClass(ee, [{
      key: "styleSheet",
      get: function get() {
        return void 0 === this._styleSheet && (Z ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.cssText;
      }
    }]);

    return ee;
  }();

  var te = function te(e) {
    return new ee(String(e), K);
  };

  (window.litElementVersions || (window.litElementVersions = [])).push("2.4.0");
  var ie,
      re,
      se,
      ne = {};

  var ae = /*#__PURE__*/function (_Q) {
    _inherits(ae, _Q);

    var _super4 = _createSuper(ae);

    function ae() {
      _classCallCheck(this, ae);

      return _super4.apply(this, arguments);
    }

    _createClass(ae, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(ae.prototype), "initialize", this).call(this), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
      }
    }, {
      key: "createRenderRoot",
      value: function createRenderRoot() {
        return this.attachShadow({
          mode: "open"
        });
      }
    }, {
      key: "adoptStyles",
      value: function adoptStyles() {
        var e = this.constructor._styles;
        0 !== e.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? Z ? this.renderRoot.adoptedStyleSheets = e.map(function (e) {
          return e instanceof CSSStyleSheet ? e : e.styleSheet;
        }) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(function (e) {
          return e.cssText;
        }), this.localName));
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(_getPrototypeOf(ae.prototype), "connectedCallback", this).call(this), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
      }
    }, {
      key: "update",
      value: function update(e) {
        var _this10 = this;

        var t = this.render();
        _get(_getPrototypeOf(ae.prototype), "update", this).call(this, e), t !== ne && this.constructor.render(t, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(function (e) {
          var t = document.createElement("style");
          t.textContent = e.cssText, _this10.renderRoot.appendChild(t);
        }));
      }
    }, {
      key: "render",
      value: function render() {
        return ne;
      }
    }], [{
      key: "getStyles",
      value: function getStyles() {
        return this.styles;
      }
    }, {
      key: "_getUniqueStyles",
      value: function _getUniqueStyles() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) {
          var e = this.getStyles();

          if (Array.isArray(e)) {
            var t = function t(e, i) {
              return e.reduceRight(function (e, i) {
                return Array.isArray(i) ? t(i, e) : (e.add(i), e);
              }, i);
            },
                i = t(e, new Set()),
                r = [];

            i.forEach(function (e) {
              return r.unshift(e);
            }), this._styles = r;
          } else this._styles = void 0 === e ? [] : [e];

          this._styles = this._styles.map(function (e) {
            if (e instanceof CSSStyleSheet && !Z) {
              var t = Array.prototype.slice.call(e.cssRules).reduce(function (e, t) {
                return e + t.cssText;
              }, "");
              return te(t);
            }

            return e;
          });
        }
      }
    }]);

    return ae;
  }(Q);

  function oe(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, r);
    }

    return i;
  }

  function he(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function le(e) {
    return e.targetTouches ? {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    } : {
      x: e.clientX,
      y: e.clientY
    };
  }

  ae.finalized = !0, ae.render = function (e, t, i) {
    if (!i || "object" != _typeof(i) || !i.scopeName) throw new Error("The `scopeName` option is required.");
    var r = i.scopeName,
        n = W.has(t),
        a = z && 11 === t.nodeType && !!t.host,
        o = a && !F.has(r),
        h = o ? document.createDocumentFragment() : t;

    if (function (e, t, i) {
      var r = W.get(t);
      void 0 === r && (s(t, t.firstChild), W.set(t, r = new T(Object.assign({
        templateFactory: U
      }, i))), r.appendInto(t)), r.setValue(e), r.commit();
    }(e, h, Object.assign({
      templateFactory: G(r)
    }, i)), o) {
      var l = W.get(h);
      W.delete(h), function (e, t, i) {
        F.add(e);
        var r = i ? i.element : document.createElement("template"),
            s = t.querySelectorAll("style"),
            n = s.length;

        if (0 !== n) {
          for (var a = document.createElement("style"), o = 0; o < n; o++) {
            var h = s[o];
            h.parentNode.removeChild(h), a.textContent += h.textContent;
          }

          (function (e) {
            D.forEach(function (t) {
              var i = R.get(H(t, e));
              void 0 !== i && i.keyString.forEach(function (e) {
                var t = e.element.content,
                    i = new Set();
                Array.from(t.querySelectorAll("style")).forEach(function (e) {
                  i.add(e);
                }), v(e, i);
              });
            });
          })(e);

          var l = r.content;
          i ? function (e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.element.content,
                s = e.parts;
            if (null != i) for (var n = document.createTreeWalker(r, m, null, !1), a = g(s), o = 0, h = -1; n.nextNode();) {
              for (h++, n.currentNode === i && (o = f(t), i.parentNode.insertBefore(t, i)); -1 !== a && s[a].index === h;) {
                if (o > 0) {
                  for (; -1 !== a;) {
                    s[a].index += o, a = g(s, a);
                  }

                  return;
                }

                a = g(s, a);
              }
            } else r.appendChild(t);
          }(i, a, l.firstChild) : l.insertBefore(a, l.firstChild), window.ShadyCSS.prepareTemplateStyles(r, e);
          var d = l.querySelector("style");
          if (window.ShadyCSS.nativeShadow && null !== d) t.insertBefore(d.cloneNode(!0), t.firstChild);else if (i) {
            l.insertBefore(a, l.firstChild);
            var u = new Set();
            u.add(a), v(i, u);
          }
        } else window.ShadyCSS.prepareTemplateStyles(r, e);
      }(r, h, l.value instanceof b ? l.value.template : void 0), s(t, t.firstChild), t.appendChild(h), W.set(t, l);
    }

    !n && a && window.ShadyCSS.styleElement(t.host);
  }, function (e) {
    e.SwipeItemShow = "SwipeItemShow", e.SwipeItemHide = "SwipeItemHide";
  }(se || (se = {}));

  var de = /*#__PURE__*/function () {
    function de(e) {
      var _this11 = this;

      _classCallCheck(this, de);

      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      this.containerElement = e, he(this, "initialPoint", void 0), he(this, "currentPoint", void 0), he(this, "renderPending", void 0), he(this, "currentItemIndex", void 0), he(this, "currentItem", void 0), he(this, "gestureEndedOnIndex", void 0), he(this, "leftVirtualItem", void 0), he(this, "rightVirtualItem", void 0), he(this, "options", void 0), he(this, "mutationObserver", void 0), he(this, "updateItems", function () {
        console.log("update"), _this11.setDefaultItemIfNecessaryAndPossible(), _this11.updateItemsClasses();
      }), he(this, "handleGestureStart", function (e) {
        e.preventDefault(), e.touches && e.touches.length > 1 || (e.target.setPointerCapture(e.pointerId), _this11.initialPoint = le(e), _this11.options.debug && console.log("SWIPE: start"));
      }), he(this, "handleGestureMove", function (e) {
        e.preventDefault(), _this11.initialPoint && (_this11.currentPoint = le(e), _this11.showVirtualItems(), _this11.renderPending || (_this11.renderPending = !0, requestAnimationFrame(_this11.render)));
      }), he(this, "handleGestureEnd", function (e) {
        if (e.preventDefault(), !(e.touches && e.touches.length > 0)) {
          if (_this11.renderPending = !1, e.target.releasePointerCapture(e.pointerId), _this11.currentPoint) {
            var t = _this11.getIndexOffset();

            _this11.gestureEndedOnIndex = _this11.currentItemIndex + t;
            var i = -t * _this11.containerElement.offsetWidth;
            _this11.currentItem.style.transform = "translateX(".concat(i, "px)"), _this11.currentItem.style.transition = _this11.options.cssTransition, _this11.leftVirtualItem && (_this11.leftVirtualItem.style.transform = "translateX(".concat(i - _this11.containerElement.offsetWidth, "px)"), _this11.leftVirtualItem.style.transition = _this11.options.cssTransition), _this11.rightVirtualItem && (_this11.rightVirtualItem.style.transition = _this11.options.cssTransition, _this11.rightVirtualItem.style.transform = "translateX(".concat(i + _this11.containerElement.offsetWidth, "px)"));
          }

          _this11.initialPoint = null, _this11.currentPoint = null, _this11.options.debug && console.log("SWIPE: end");
        }
      }), he(this, "handleGestureTransitionEnd", function (e) {
        var t = [_this11.leftVirtualItem, _this11.rightVirtualItem, _this11.currentItem];
        _this11.hideVirtualItems(), _this11.currentItem.style.transition = null, _this11.currentItem.style.transform = null, _this11.setCurrentItem(_this11.gestureEndedOnIndex), t.forEach(function (e) {
          e && ![_this11.leftVirtualItem, _this11.rightVirtualItem, _this11.currentItem].includes(e) && e.dispatchEvent(new CustomEvent(se.SwipeItemHide, {
            bubbles: !0,
            composed: !0
          }));
        });
      }), he(this, "render", function () {
        if (_this11.renderPending) {
          var e = _this11.currentPoint.x - _this11.initialPoint.x;
          _this11.currentItem.style.transform = "translateX(".concat(e, "px)"), _this11.leftVirtualItem && (_this11.leftVirtualItem.style.transform = "translateX(".concat(e - _this11.containerElement.offsetWidth, "px)")), _this11.rightVirtualItem && (_this11.rightVirtualItem.style.transform = "translateX(".concat(e + _this11.containerElement.offsetWidth, "px)")), _this11.renderPending = !1;
        }
      }), this.containerElement.classList.add("swipe-container"), this.options = function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = null != arguments[t] ? arguments[t] : {};
          t % 2 ? oe(Object(i), !0).forEach(function (t) {
            he(e, t, i[t]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : oe(Object(i)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
          });
        }

        return e;
      }({
        cssTransition: "all 150ms ease-out",
        currentItemIndex: 0,
        debug: !1
      }, t), this.updateItems(), this.mutationObserver = new MutationObserver(this.updateItems), this.mutationObserver.observe(this.containerElement, {
        childList: !0
      });
    }

    _createClass(de, [{
      key: "items",
      get: function get() {
        return Array.from(this.containerElement.children);
      }
    }, {
      key: "addItem",
      value: function addItem(e) {
        var t = document.createElement("div");

        if (e) {
          var i = document.createTextNode(e);
          t.appendChild(i);
        }

        return this.containerElement.appendChild(t), t;
      }
    }, {
      key: "removeItem",
      value: function removeItem(e) {
        if (!(e > this.items.length - 1)) return this.currentItemIndex === e ? (this.currentItem.dispatchEvent(new CustomEvent(se.SwipeItemHide, {
          bubbles: !0,
          composed: !0
        })), this.unsetCurrentItem(), void this.items[e].remove()) : void this.items[e].remove();
      }
    }, {
      key: "setCurrentItem",
      value: function setCurrentItem(e) {
        this.currentItemIndex !== e && (e > this.items.length - 1 || (this.removeContainerListeners(), this.addContainerListeners(), this.currentItem && this.removeCurrentItemListeners(), this.currentItem = this.items[e], this.currentItemIndex = e, this.updateItemsClasses(), this.addCurrentItemListeners(), this.options.debug && console.log("SWIPE: set ".concat(e, " item"))));
      }
    }, {
      key: "clear",
      value: function clear() {
        for (; this.items.length;) {
          this.removeItem(0);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.mutationObserver.disconnect(), this.removeContainerListeners();
      }
    }, {
      key: "addContainerListeners",
      value: function addContainerListeners() {
        this.containerElement.addEventListener("pointerdown", this.handleGestureStart, !0), this.containerElement.addEventListener("pointermove", this.handleGestureMove, !0), this.containerElement.addEventListener("pointerup", this.handleGestureEnd, !0), this.containerElement.addEventListener("pointercancel", this.handleGestureEnd, !0);
      }
    }, {
      key: "removeContainerListeners",
      value: function removeContainerListeners() {
        this.containerElement.removeEventListener("pointerdown", this.handleGestureStart, !0), this.containerElement.removeEventListener("pointermove", this.handleGestureMove, !0), this.containerElement.removeEventListener("pointerup", this.handleGestureEnd, !0), this.containerElement.removeEventListener("pointercancel", this.handleGestureEnd, !0);
      }
    }, {
      key: "unsetCurrentItem",
      value: function unsetCurrentItem() {
        this.removeContainerListeners(), this.removeCurrentItemListeners(), this.currentItem = void 0, this.currentItemIndex = void 0;
      }
    }, {
      key: "updateItemsClasses",
      value: function updateItemsClasses() {
        var _this12 = this;

        this.items.forEach(function (e, t) {
          if (e.classList.add("swipe-item"), t === _this12.currentItemIndex) return e.classList.add("swipe-item--active"), e.classList.remove("swipe-item--virtual"), void e.classList.remove("swipe-item--hide");
          e.classList.remove("swipe-item--active"), e.classList.add("swipe-item--virtual"), e.classList.add("swipe-item--hide");
        });
      }
    }, {
      key: "getIndexOffset",
      value: function getIndexOffset() {
        var e = this.currentPoint.x - this.initialPoint.x;
        if (0 === e) return 0;
        var t,
            i = this.currentItem.offsetWidth,
            r = e < 0 ? i * (1 / 4) : i * (3 / 4),
            s = (t = Math.floor((e + r) / i)) > 0 ? 1 : t < 0 ? -1 : 0;
        return s > 0 && this.currentItemIndex > 0 ? -1 : s < 0 && this.currentItemIndex < this.items.length - 1 ? 1 : 0;
      }
    }, {
      key: "addCurrentItemListeners",
      value: function addCurrentItemListeners() {
        this.currentItem.addEventListener("transitionend", this.handleGestureTransitionEnd, !0), this.currentItem.addEventListener("transitioncancel", this.handleGestureTransitionEnd, !0);
      }
    }, {
      key: "removeCurrentItemListeners",
      value: function removeCurrentItemListeners() {
        this.currentItem.removeEventListener("transitionend", this.handleGestureTransitionEnd, !0), this.currentItem.removeEventListener("transitioncancel", this.handleGestureTransitionEnd, !0);
      }
    }, {
      key: "showVirtualItems",
      value: function showVirtualItems() {
        this.leftVirtualItem || (this.leftVirtualItem = 0 === this.currentItemIndex ? null : this.items[this.currentItemIndex - 1], this.leftVirtualItem && (this.leftVirtualItem.classList.remove("swipe-item--hide"), this.leftVirtualItem.dispatchEvent(new CustomEvent(se.SwipeItemShow, {
          bubbles: !0,
          composed: !0
        })))), this.rightVirtualItem || (this.rightVirtualItem = this.currentItemIndex === this.items.length - 1 ? null : this.items[this.currentItemIndex + 1], this.rightVirtualItem && (this.rightVirtualItem.classList.remove("swipe-item--hide"), this.rightVirtualItem.dispatchEvent(new CustomEvent(se.SwipeItemShow, {
          bubbles: !0,
          composed: !0
        }))));
      }
    }, {
      key: "hideVirtualItems",
      value: function hideVirtualItems() {
        this.leftVirtualItem && (this.hideVirtualItem(this.leftVirtualItem), this.leftVirtualItem = null), this.rightVirtualItem && (this.hideVirtualItem(this.rightVirtualItem), this.rightVirtualItem = null);
      }
    }, {
      key: "hideVirtualItem",
      value: function hideVirtualItem(e) {
        e.style.transition = null, e.style.transform = null, e.classList.add("swipe-item--hide");
      }
    }, {
      key: "setDefaultItemIfNecessaryAndPossible",
      value: function setDefaultItemIfNecessaryAndPossible() {
        this.currentItem || this.options.currentItemIndex >= this.items.length || (this.setCurrentItem(this.options.currentItemIndex), this.currentItem.dispatchEvent(new CustomEvent(se.SwipeItemShow, {
          bubbles: !0,
          composed: !0
        })));
      }
    }]);

    return de;
  }();

  var ue,
      ce,
      pe = ("ns-swipe-container", ("function" == typeof (ue = ie = /*#__PURE__*/function (_ae) {
    _inherits(ie, _ae);

    var _super5 = _createSuper(ie);

    function ie() {
      var _this13;

      _classCallCheck(this, ie);

      _this13 = _super5.apply(this, arguments), he(_assertThisInitialized(_this13), "swipeContainer", void 0);
      return _this13;
    }

    _createClass(ie, [{
      key: "render",
      value: function render() {
        return function (e) {
          for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
            i[r - 1] = arguments[r];
          }

          return new P(e, i, "html", q);
        }(re || (e = ["<slot></slot>"], t || (t = e.slice(0)), re = Object.freeze(Object.defineProperties(e, {
          raw: {
            value: Object.freeze(t)
          }
        }))));
        var e, t;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(_getPrototypeOf(ie.prototype), "connectedCallback", this).call(this), this.swipeContainer = new de(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.swipeContainer.destroy(), _get(_getPrototypeOf(ie.prototype), "disconnectedCallback", this).call(this);
      }
    }], [{
      key: "styles",
      get: function get() {
        return te(e.Z);
      }
    }]);

    return ie;
  }(ae)) ? (ce = ue, window.customElements.define("ns-swipe-container", ce), ce) : function (e, t) {
    var i = t.kind,
        r = t.elements;
    return {
      kind: i,
      elements: r,
      finisher: function finisher(e) {
        window.customElements.define("ns-swipe-container", e);
      }
    };
  }(0, ue)) || ie);
})();

var s = r.Mj,
    n = r.Vd,
    a = r.Ql;

;// CONCATENATED MODULE: ./index.js
// import '@neosimvolist/swipe';

console.log(s);
/******/ })()
;