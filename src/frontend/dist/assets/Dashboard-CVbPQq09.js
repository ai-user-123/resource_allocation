import { c as createLucideIcon, R as React2, a as clsx, r as reactExports, j as jsxRuntimeExports, u as useQueryClient, S as Skeleton, C as Cpu, A as Activity } from "./index-B6KDdV9-.js";
import { g as getMetrics, a as getResults, b as getSchedulingDecision, o as overridePolicy, c as clearData, B as Badge, d as Button } from "./api-DS5_eO34.js";
import { u as ue } from "./index-B6VuHpqp.js";
import { A as AlertBadge, g as getAlertSeverity } from "./AlertBadge-c2EvalJ8.js";
import { T as TrendingUp, Z as Zap } from "./zap-BVqVJSOS.js";
import { u as useQuery, R as RefreshCw } from "./refresh-cw-BWO3MCwL.js";
import { i as isFunction, D as Dot, f as findAllByType, E as ErrorBar, L as Layer, a as filterProps, C as Curve, A as Animate, b as interpolateNumber, c as isEqual, d as isNil, h as hasClipDot, e as LabelList, g as getValueByDataKey, u as uniqueId, G as Global, j as getCateCoordinateOfLine, m as max, k as isNumber, l as isNan, S as Shape, n as Symbols, o as adaptEventsOfChild, p as getLinearRegression, q as Cell, r as generateCategoricalChart, X as XAxis, Y as YAxis, s as formatAxisMap, B as Bar, t as AdaptiveOverrideMonitor, v as SimulationEngine, w as Square, R as ResponsiveContainer, x as CartesianGrid, T as Tooltip, y as Legend } from "./simulation-pFUAvvNh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M6 19v-3", key: "1nvgqn" }],
  ["path", { d: "M10 19v-3", key: "iu8nkm" }],
  ["path", { d: "M14 19v-3", key: "kcehxu" }],
  ["path", { d: "M18 19v-3", key: "1vh91z" }],
  ["path", { d: "M8 11V9", key: "63erz4" }],
  ["path", { d: "M16 11V9", key: "fru6f3" }],
  ["path", { d: "M12 11V9", key: "ha00sb" }],
  ["path", { d: "M2 15h20", key: "16ne18" }],
  [
    "path",
    {
      d: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z",
      key: "lhddv3"
    }
  ]
];
const MemoryStick = createLucideIcon("memory-stick", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
const Network = createLucideIcon("network", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
var _excluded$2 = ["type", "layout", "connectNulls", "ref"], _excluded2$1 = ["key"];
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function _objectWithoutProperties$2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$3(descriptor.key), descriptor);
  }
}
function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$3(t, o, e) {
  return o = _getPrototypeOf$3(o), _possibleConstructorReturn$3(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf$3(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$3(self, call) {
  if (call && (_typeof$3(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$3(self);
}
function _assertThisInitialized$3(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$3() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$3(o) {
  _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$3(o);
}
function _inherits$3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$3(subClass, superClass);
}
function _setPrototypeOf$3(o, p) {
  _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$3(o, p);
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Line = /* @__PURE__ */ function(_PureComponent) {
  function Line2() {
    var _this;
    _classCallCheck$3(this, Line2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$3(this, Line2, [].concat(args));
    _defineProperty$3(_this, "state", {
      isAnimationFinished: true,
      totalLength: 0
    });
    _defineProperty$3(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
      return "".concat(length, "px ").concat(totalLength - length, "px");
    });
    _defineProperty$3(_this, "getStrokeDasharray", function(length, totalLength, lines) {
      var lineLength = lines.reduce(function(pre, next) {
        return pre + next;
      });
      if (!lineLength) {
        return _this.generateSimpleStrokeDasharray(totalLength, length);
      }
      var count = Math.floor(length / lineLength);
      var remainLength = length % lineLength;
      var restLength = totalLength - length;
      var remainLines = [];
      for (var i = 0, sum = 0; i < lines.length; sum += lines[i], ++i) {
        if (sum + lines[i] > remainLength) {
          remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
          break;
        }
      }
      var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
      return [].concat(_toConsumableArray(Line2.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function(line) {
        return "".concat(line, "px");
      }).join(", ");
    });
    _defineProperty$3(_this, "id", uniqueId("recharts-line-"));
    _defineProperty$3(_this, "pathRef", function(node) {
      _this.mainCurve = node;
    });
    _defineProperty$3(_this, "handleAnimationEnd", function() {
      _this.setState({
        isAnimationFinished: true
      });
      if (_this.props.onAnimationEnd) {
        _this.props.onAnimationEnd();
      }
    });
    _defineProperty$3(_this, "handleAnimationStart", function() {
      _this.setState({
        isAnimationFinished: false
      });
      if (_this.props.onAnimationStart) {
        _this.props.onAnimationStart();
      }
    });
    return _this;
  }
  _inherits$3(Line2, _PureComponent);
  return _createClass$3(Line2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      this.setState({
        totalLength
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      if (totalLength !== this.state.totalLength) {
        this.setState({
          totalLength
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function getTotalLength() {
      var curveDom = this.mainCurve;
      try {
        return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
      } catch (err) {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar(needClip, clipPathId) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, points = _this$props.points, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, layout = _this$props.layout, children = _this$props.children;
      var errorBarItems = findAllByType(children, ErrorBar);
      if (!errorBarItems) {
        return null;
      }
      var dataPointFormatter = function dataPointFormatter2(dataPoint, dataKey) {
        return {
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          errorVal: getValueByDataKey(dataPoint.payload, dataKey)
        };
      };
      var errorBarProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React2.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
        return /* @__PURE__ */ React2.cloneElement(item, {
          key: "bar-".concat(item.props.dataKey),
          data: points,
          xAxis,
          yAxis,
          layout,
          dataPointFormatter
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props2 = this.props, dot = _this$props2.dot, points = _this$props2.points, dataKey = _this$props2.dataKey;
      var lineProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread$2(_objectSpread$2(_objectSpread$2({
          key: "dot-".concat(i),
          r: 3
        }, lineProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          value: entry.value,
          dataKey,
          payload: entry.payload,
          points
        });
        return Line2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React2.createElement(Layer, _extends$3({
        className: "recharts-line-dots",
        key: "dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderCurveStatically",
    value: function renderCurveStatically(points, needClip, clipPathId, props) {
      var _this$props3 = this.props, type = _this$props3.type, layout = _this$props3.layout, connectNulls = _this$props3.connectNulls;
      _this$props3.ref;
      var others = _objectWithoutProperties$2(_this$props3, _excluded$2);
      var curveProps = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, filterProps(others, true)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
        points
      }, props), {}, {
        type,
        layout,
        connectNulls
      });
      return /* @__PURE__ */ React2.createElement(Curve, _extends$3({}, curveProps, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function renderCurveWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props4 = this.props, points = _this$props4.points, strokeDasharray = _this$props4.strokeDasharray, isAnimationActive = _this$props4.isAnimationActive, animationBegin = _this$props4.animationBegin, animationDuration = _this$props4.animationDuration, animationEasing = _this$props4.animationEasing, animationId = _this$props4.animationId, animateNewValues = _this$props4.animateNewValues, width = _this$props4.width, height = _this$props4.height;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, totalLength = _this$state.totalLength;
      return /* @__PURE__ */ React2.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepData = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread$2(_objectSpread$2({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            if (animateNewValues) {
              var _interpolatorX = interpolateNumber(width * 2, entry.x);
              var _interpolatorY = interpolateNumber(height / 2, entry.y);
              return _objectSpread$2(_objectSpread$2({}, entry), {}, {
                x: _interpolatorX(t),
                y: _interpolatorY(t)
              });
            }
            return _objectSpread$2(_objectSpread$2({}, entry), {}, {
              x: entry.x,
              y: entry.y
            });
          });
          return _this2.renderCurveStatically(stepData, needClip, clipPathId);
        }
        var interpolator = interpolateNumber(0, totalLength);
        var curLength = interpolator(t);
        var currentStrokeDasharray;
        if (strokeDasharray) {
          var lines = "".concat(strokeDasharray).split(/[,\s]+/gim).map(function(num) {
            return parseFloat(num);
          });
          currentStrokeDasharray = _this2.getStrokeDasharray(curLength, totalLength, lines);
        } else {
          currentStrokeDasharray = _this2.generateSimpleStrokeDasharray(totalLength, curLength);
        }
        return _this2.renderCurveStatically(points, needClip, clipPathId, {
          strokeDasharray: currentStrokeDasharray
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function renderCurve(needClip, clipPathId) {
      var _this$props5 = this.props, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points))) {
        return this.renderCurveWithAnimation(needClip, clipPathId);
      }
      return this.renderCurveStatically(points, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props6 = this.props, hide = _this$props6.hide, dot = _this$props6.dot, points = _this$props6.points, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, top = _this$props6.top, left = _this$props6.left, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, id = _this$props6.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-line", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React2.createElement("defs", null, /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(needClip, clipPathId), (hasSinglePoint || dot) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "repeat",
    value: function repeat(lines, count) {
      var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
      var result = [];
      for (var i = 0; i < count; ++i) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
      }
      return result;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;
      if (/* @__PURE__ */ React2.isValidElement(option)) {
        dotItem = /* @__PURE__ */ React2.cloneElement(option, props);
      } else if (isFunction(option)) {
        dotItem = option(props);
      } else {
        var key = props.key, dotProps = _objectWithoutProperties$2(props, _excluded2$1);
        var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
        dotItem = /* @__PURE__ */ React2.createElement(Dot, _extends$3({
          key
        }, dotProps, {
          className
        }));
      }
      return dotItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$3(Line, "displayName", "Line");
_defineProperty$3(Line, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !Global.isSsr,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: false,
  label: false
});
_defineProperty$3(Line, "getComposedData", function(_ref4) {
  var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var points = displayedData.map(function(entry, index) {
    var value = getValueByDataKey(entry, dataKey);
    if (layout === "horizontal") {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isNil(value) ? null : yAxis.scale(value),
        value,
        payload: entry
      };
    }
    return {
      x: isNil(value) ? null : xAxis.scale(value),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  return _objectSpread$2({
    points,
    layout
  }, offset);
});
var _excluded$1 = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], _excluded2 = ["key"];
var _Area;
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$2(t, o, e) {
  return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$2() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$2(o, p);
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Area = /* @__PURE__ */ function(_PureComponent) {
  function Area2() {
    var _this;
    _classCallCheck$2(this, Area2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$2(this, Area2, [].concat(args));
    _defineProperty$2(_this, "state", {
      isAnimationFinished: true
    });
    _defineProperty$2(_this, "id", uniqueId("recharts-area-"));
    _defineProperty$2(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty$2(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    return _this;
  }
  _inherits$2(Area2, _PureComponent);
  return _createClass$2(Area2, [{
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (isAnimationActive && !isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, dot = _this$props.dot, points = _this$props.points, dataKey = _this$props.dataKey;
      var areaProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
          key: "dot-".concat(i),
          r: 3
        }, areaProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          dataKey,
          value: entry.value,
          payload: entry.payload,
          points
        });
        return Area2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React2.createElement(Layer, _extends$2({
        className: "recharts-area-dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderHorizontalRect",
    value: function renderHorizontalRect(alpha) {
      var _this$props2 = this.props, baseLine = _this$props2.baseLine, points = _this$props2.points, strokeWidth = _this$props2.strokeWidth;
      var startX = points[0].x;
      var endX = points[points.length - 1].x;
      var width = alpha * Math.abs(startX - endX);
      var maxY = max(points.map(function(entry) {
        return entry.y || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxY = Math.max(baseLine, maxY);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(max(baseLine.map(function(entry) {
          return entry.y || 0;
        })), maxY);
      }
      if (isNumber(maxY)) {
        return /* @__PURE__ */ React2.createElement("rect", {
          x: startX < endX ? startX : startX - width,
          y: 0,
          width,
          height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
        });
      }
      return null;
    }
  }, {
    key: "renderVerticalRect",
    value: function renderVerticalRect(alpha) {
      var _this$props3 = this.props, baseLine = _this$props3.baseLine, points = _this$props3.points, strokeWidth = _this$props3.strokeWidth;
      var startY = points[0].y;
      var endY = points[points.length - 1].y;
      var height = alpha * Math.abs(startY - endY);
      var maxX = max(points.map(function(entry) {
        return entry.x || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxX = Math.max(baseLine, maxX);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(max(baseLine.map(function(entry) {
          return entry.x || 0;
        })), maxX);
      }
      if (isNumber(maxX)) {
        return /* @__PURE__ */ React2.createElement("rect", {
          x: 0,
          y: startY < endY ? startY : startY - height,
          width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
          height: Math.floor(height)
        });
      }
      return null;
    }
  }, {
    key: "renderClipRect",
    value: function renderClipRect(alpha) {
      var layout = this.props.layout;
      if (layout === "vertical") {
        return this.renderVerticalRect(alpha);
      }
      return this.renderHorizontalRect(alpha);
    }
  }, {
    key: "renderAreaStatically",
    value: function renderAreaStatically(points, baseLine, needClip, clipPathId) {
      var _this$props4 = this.props, layout = _this$props4.layout, type = _this$props4.type, stroke = _this$props4.stroke, connectNulls = _this$props4.connectNulls, isRange = _this$props4.isRange;
      _this$props4.ref;
      var others = _objectWithoutProperties$1(_this$props4, _excluded$1);
      return /* @__PURE__ */ React2.createElement(Layer, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, /* @__PURE__ */ React2.createElement(Curve, _extends$2({}, filterProps(others, true), {
        points,
        connectNulls,
        type,
        baseLine,
        layout,
        stroke: "none",
        className: "recharts-area-area"
      })), stroke !== "none" && /* @__PURE__ */ React2.createElement(Curve, _extends$2({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points
      })), stroke !== "none" && isRange && /* @__PURE__ */ React2.createElement(Curve, _extends$2({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points: baseLine
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function renderAreaWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props5 = this.props, points = _this$props5.points, baseLine = _this$props5.baseLine, isAnimationActive = _this$props5.isAnimationActive, animationBegin = _this$props5.animationBegin, animationDuration = _this$props5.animationDuration, animationEasing = _this$props5.animationEasing, animationId = _this$props5.animationId;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, prevBaseLine = _this$state.prevBaseLine;
      return /* @__PURE__ */ React2.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepPoints = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread$1(_objectSpread$1({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            return entry;
          });
          var stepBaseLine;
          if (isNumber(baseLine) && typeof baseLine === "number") {
            var interpolator = interpolateNumber(prevBaseLine, baseLine);
            stepBaseLine = interpolator(t);
          } else if (isNil(baseLine) || isNan(baseLine)) {
            var _interpolator = interpolateNumber(prevBaseLine, 0);
            stepBaseLine = _interpolator(t);
          } else {
            stepBaseLine = baseLine.map(function(entry, index) {
              var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
              if (prevBaseLine[prevPointIndex]) {
                var prev = prevBaseLine[prevPointIndex];
                var interpolatorX = interpolateNumber(prev.x, entry.x);
                var interpolatorY = interpolateNumber(prev.y, entry.y);
                return _objectSpread$1(_objectSpread$1({}, entry), {}, {
                  x: interpolatorX(t),
                  y: interpolatorY(t)
                });
              }
              return entry;
            });
          }
          return _this2.renderAreaStatically(stepPoints, stepBaseLine, needClip, clipPathId);
        }
        return /* @__PURE__ */ React2.createElement(Layer, null, /* @__PURE__ */ React2.createElement("defs", null, /* @__PURE__ */ React2.createElement("clipPath", {
          id: "animationClipPath-".concat(clipPathId)
        }, _this2.renderClipRect(t))), /* @__PURE__ */ React2.createElement(Layer, {
          clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
        }, _this2.renderAreaStatically(points, baseLine, needClip, clipPathId)));
      });
    }
  }, {
    key: "renderArea",
    value: function renderArea(needClip, clipPathId) {
      var _this$props6 = this.props, points = _this$props6.points, baseLine = _this$props6.baseLine, isAnimationActive = _this$props6.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, prevBaseLine = _this$state2.prevBaseLine, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points) || !isEqual(prevBaseLine, baseLine))) {
        return this.renderAreaWithAnimation(needClip, clipPathId);
      }
      return this.renderAreaStatically(points, baseLine, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props7 = this.props, hide = _this$props7.hide, dot = _this$props7.dot, points = _this$props7.points, className = _this$props7.className, top = _this$props7.top, left = _this$props7.left, xAxis = _this$props7.xAxis, yAxis = _this$props7.yAxis, width = _this$props7.width, height = _this$props7.height, isAnimationActive = _this$props7.isAnimationActive, id = _this$props7.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-area", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React2.createElement("defs", null, /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint ? this.renderArea(needClip, clipPathId) : null, (dot || hasSinglePoint) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine,
          prevPoints: prevState.curPoints,
          prevBaseLine: prevState.curBaseLine
        };
      }
      if (nextProps.points !== prevState.curPoints || nextProps.baseLine !== prevState.curBaseLine) {
        return {
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_Area = Area;
_defineProperty$2(Area, "displayName", "Area");
_defineProperty$2(Area, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: false,
  // points of area
  points: [],
  dot: false,
  activeDot: true,
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_defineProperty$2(Area, "getBaseValue", function(props, item, xAxis, yAxis) {
  var layout = props.layout, chartBaseValue = props.baseValue;
  var itemBaseValue = item.props.baseValue;
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue) && typeof baseValue === "number") {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
});
_defineProperty$2(Area, "getComposedData", function(_ref4) {
  var props = _ref4.props, item = _ref4.item, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, bandSize = _ref4.bandSize, dataKey = _ref4.dataKey, stackedData = _ref4.stackedData, dataStartIndex = _ref4.dataStartIndex, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var hasStack = stackedData && stackedData.length;
  var baseValue = _Area.getBaseValue(props, item, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map(function(entry, index) {
    var value;
    if (hasStack) {
      value = stackedData[dataStartIndex + index];
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      } else {
        isRange = true;
      }
    }
    var isBreakPoint = value[1] == null || hasStack && getValueByDataKey(entry, dataKey) == null;
    if (isHorizontalLayout) {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : yAxis.scale(value[1]),
        value,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : xAxis.scale(value[1]),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map(function(entry) {
      var x = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        return {
          x: entry.x,
          y: x != null && entry.y != null ? yAxis.scale(x) : null
        };
      }
      return {
        x: x != null ? xAxis.scale(x) : null,
        y: entry.y
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
  }
  return _objectSpread$1({
    points,
    baseLine,
    layout,
    isRange
  }, offset);
});
_defineProperty$2(Area, "renderDotItem", function(option, props) {
  var dotItem;
  if (/* @__PURE__ */ React2.isValidElement(option)) {
    dotItem = /* @__PURE__ */ React2.cloneElement(option, props);
  } else if (isFunction(option)) {
    dotItem = option(props);
  } else {
    var className = clsx("recharts-area-dot", typeof option !== "boolean" ? option.className : "");
    var key = props.key, rest = _objectWithoutProperties$1(props, _excluded2);
    dotItem = /* @__PURE__ */ React2.createElement(Dot, _extends$2({}, rest, {
      key,
      className
    }));
  }
  return dotItem;
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$1(t, o, e) {
  return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var ZAxis = /* @__PURE__ */ function(_React$Component) {
  function ZAxis2() {
    _classCallCheck$1(this, ZAxis2);
    return _callSuper$1(this, ZAxis2, arguments);
  }
  _inherits$1(ZAxis2, _React$Component);
  return _createClass$1(ZAxis2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
}(reactExports.Component);
_defineProperty$1(ZAxis, "displayName", "ZAxis");
_defineProperty$1(ZAxis, "defaultProps", {
  zAxisId: 0,
  range: [64, 64],
  scale: "auto",
  type: "number"
});
var _excluded = ["option", "isActive"];
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function ScatterSymbol(_ref) {
  var option = _ref.option, isActive = _ref.isActive, props = _objectWithoutProperties(_ref, _excluded);
  if (typeof option === "string") {
    return /* @__PURE__ */ reactExports.createElement(Shape, _extends$1({
      option: /* @__PURE__ */ reactExports.createElement(Symbols, _extends$1({
        type: option
      }, props)),
      isActive,
      shapeType: "symbols"
    }, props));
  }
  return /* @__PURE__ */ reactExports.createElement(Shape, _extends$1({
    option,
    isActive,
    shapeType: "symbols"
  }, props));
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Scatter = /* @__PURE__ */ function(_PureComponent) {
  function Scatter2() {
    var _this;
    _classCallCheck(this, Scatter2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Scatter2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: false
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      _this.setState({
        isAnimationFinished: true
      });
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      _this.setState({
        isAnimationFinished: false
      });
    });
    _defineProperty(_this, "id", uniqueId("recharts-scatter-"));
    return _this;
  }
  _inherits(Scatter2, _PureComponent);
  return _createClass(Scatter2, [{
    key: "renderSymbolsStatically",
    value: function renderSymbolsStatically(points) {
      var _this2 = this;
      var _this$props = this.props, shape = _this$props.shape, activeShape = _this$props.activeShape, activeIndex = _this$props.activeIndex;
      var baseProps = filterProps(this.props, false);
      return points.map(function(entry, i) {
        var isActive = activeIndex === i;
        var option = isActive ? activeShape : shape;
        var props = _objectSpread(_objectSpread({}, baseProps), entry);
        return /* @__PURE__ */ React2.createElement(Layer, _extends({
          className: "recharts-scatter-symbol",
          key: "symbol-".concat(entry === null || entry === void 0 ? void 0 : entry.cx, "-").concat(entry === null || entry === void 0 ? void 0 : entry.cy, "-").concat(entry === null || entry === void 0 ? void 0 : entry.size, "-").concat(i)
        }, adaptEventsOfChild(_this2.props, entry, i), {
          role: "img"
        }), /* @__PURE__ */ React2.createElement(ScatterSymbol, _extends({
          option,
          isActive,
          key: "symbol-".concat(i)
        }, props)));
      });
    }
  }, {
    key: "renderSymbolsWithAnimation",
    value: function renderSymbolsWithAnimation() {
      var _this3 = this;
      var _this$props2 = this.props, points = _this$props2.points, isAnimationActive = _this$props2.isAnimationActive, animationBegin = _this$props2.animationBegin, animationDuration = _this$props2.animationDuration, animationEasing = _this$props2.animationEasing, animationId = _this$props2.animationId;
      var prevPoints = this.state.prevPoints;
      return /* @__PURE__ */ React2.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        var stepData = points.map(function(entry, index) {
          var prev = prevPoints && prevPoints[index];
          if (prev) {
            var interpolatorCx = interpolateNumber(prev.cx, entry.cx);
            var interpolatorCy = interpolateNumber(prev.cy, entry.cy);
            var interpolatorSize = interpolateNumber(prev.size, entry.size);
            return _objectSpread(_objectSpread({}, entry), {}, {
              cx: interpolatorCx(t),
              cy: interpolatorCy(t),
              size: interpolatorSize(t)
            });
          }
          var interpolator = interpolateNumber(0, entry.size);
          return _objectSpread(_objectSpread({}, entry), {}, {
            size: interpolator(t)
          });
        });
        return /* @__PURE__ */ React2.createElement(Layer, null, _this3.renderSymbolsStatically(stepData));
      });
    }
  }, {
    key: "renderSymbols",
    value: function renderSymbols() {
      var _this$props3 = this.props, points = _this$props3.points, isAnimationActive = _this$props3.isAnimationActive;
      var prevPoints = this.state.prevPoints;
      if (isAnimationActive && points && points.length && (!prevPoints || !isEqual(prevPoints, points))) {
        return this.renderSymbolsWithAnimation();
      }
      return this.renderSymbolsStatically(points);
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar() {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props4 = this.props, points = _this$props4.points, xAxis = _this$props4.xAxis, yAxis = _this$props4.yAxis, children = _this$props4.children;
      var errorBarItems = findAllByType(children, ErrorBar);
      if (!errorBarItems) {
        return null;
      }
      return errorBarItems.map(function(item, i) {
        var _item$props = item.props, direction = _item$props.direction, errorDataKey = _item$props.dataKey;
        return /* @__PURE__ */ React2.cloneElement(item, {
          key: "".concat(direction, "-").concat(errorDataKey, "-").concat(points[i]),
          data: points,
          xAxis,
          yAxis,
          layout: direction === "x" ? "vertical" : "horizontal",
          dataPointFormatter: function dataPointFormatter(dataPoint, dataKey) {
            return {
              x: dataPoint.cx,
              y: dataPoint.cy,
              value: direction === "x" ? +dataPoint.node.x : +dataPoint.node.y,
              errorVal: getValueByDataKey(dataPoint, dataKey)
            };
          }
        });
      });
    }
  }, {
    key: "renderLine",
    value: function renderLine() {
      var _this$props5 = this.props, points = _this$props5.points, line = _this$props5.line, lineType = _this$props5.lineType, lineJointType = _this$props5.lineJointType;
      var scatterProps = filterProps(this.props, false);
      var customLineProps = filterProps(line, false);
      var linePoints, lineItem;
      if (lineType === "joint") {
        linePoints = points.map(function(entry) {
          return {
            x: entry.cx,
            y: entry.cy
          };
        });
      } else if (lineType === "fitting") {
        var _getLinearRegression = getLinearRegression(points), xmin = _getLinearRegression.xmin, xmax = _getLinearRegression.xmax, a = _getLinearRegression.a, b = _getLinearRegression.b;
        var linearExp = function linearExp2(x) {
          return a * x + b;
        };
        linePoints = [{
          x: xmin,
          y: linearExp(xmin)
        }, {
          x: xmax,
          y: linearExp(xmax)
        }];
      }
      var lineProps = _objectSpread(_objectSpread(_objectSpread({}, scatterProps), {}, {
        fill: "none",
        stroke: scatterProps && scatterProps.fill
      }, customLineProps), {}, {
        points: linePoints
      });
      if (/* @__PURE__ */ React2.isValidElement(line)) {
        lineItem = /* @__PURE__ */ React2.cloneElement(line, lineProps);
      } else if (isFunction(line)) {
        lineItem = line(lineProps);
      } else {
        lineItem = /* @__PURE__ */ React2.createElement(Curve, _extends({}, lineProps, {
          type: lineJointType
        }));
      }
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: "recharts-scatter-line",
        key: "recharts-scatter-line"
      }, lineItem);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props, hide = _this$props6.hide, points = _this$props6.points, line = _this$props6.line, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, left = _this$props6.left, top = _this$props6.top, width = _this$props6.width, height = _this$props6.height, id = _this$props6.id, isAnimationActive = _this$props6.isAnimationActive;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = clsx("recharts-scatter", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: layerClass,
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, needClipX || needClipY ? /* @__PURE__ */ React2.createElement("defs", null, /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      }))) : null, line && this.renderLine(), this.renderErrorBar(), /* @__PURE__ */ React2.createElement(Layer, {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(Scatter, "displayName", "Scatter");
_defineProperty(Scatter, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: "circle",
  lineType: "joint",
  lineJointType: "linear",
  data: [],
  shape: "circle",
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "linear"
});
_defineProperty(Scatter, "getComposedData", function(_ref2) {
  var xAxis = _ref2.xAxis, yAxis = _ref2.yAxis, zAxis = _ref2.zAxis, item = _ref2.item, displayedData = _ref2.displayedData, xAxisTicks = _ref2.xAxisTicks, yAxisTicks = _ref2.yAxisTicks, offset = _ref2.offset;
  var tooltipType = item.props.tooltipType;
  var cells = findAllByType(item.props.children, Cell);
  var xAxisDataKey = isNil(xAxis.dataKey) ? item.props.dataKey : xAxis.dataKey;
  var yAxisDataKey = isNil(yAxis.dataKey) ? item.props.dataKey : yAxis.dataKey;
  var zAxisDataKey = zAxis && zAxis.dataKey;
  var defaultRangeZ = zAxis ? zAxis.range : ZAxis.defaultProps.range;
  var defaultZ = defaultRangeZ && defaultRangeZ[0];
  var xBandSize = xAxis.scale.bandwidth ? xAxis.scale.bandwidth() : 0;
  var yBandSize = yAxis.scale.bandwidth ? yAxis.scale.bandwidth() : 0;
  var points = displayedData.map(function(entry, index) {
    var x = getValueByDataKey(entry, xAxisDataKey);
    var y = getValueByDataKey(entry, yAxisDataKey);
    var z = !isNil(zAxisDataKey) && getValueByDataKey(entry, zAxisDataKey) || "-";
    var tooltipPayload = [{
      name: isNil(xAxis.dataKey) ? item.props.name : xAxis.name || xAxis.dataKey,
      unit: xAxis.unit || "",
      value: x,
      payload: entry,
      dataKey: xAxisDataKey,
      type: tooltipType
    }, {
      name: isNil(yAxis.dataKey) ? item.props.name : yAxis.name || yAxis.dataKey,
      unit: yAxis.unit || "",
      value: y,
      payload: entry,
      dataKey: yAxisDataKey,
      type: tooltipType
    }];
    if (z !== "-") {
      tooltipPayload.push({
        name: zAxis.name || zAxis.dataKey,
        unit: zAxis.unit || "",
        value: z,
        payload: entry,
        dataKey: zAxisDataKey,
        type: tooltipType
      });
    }
    var cx = getCateCoordinateOfLine({
      axis: xAxis,
      ticks: xAxisTicks,
      bandSize: xBandSize,
      entry,
      index,
      dataKey: xAxisDataKey
    });
    var cy = getCateCoordinateOfLine({
      axis: yAxis,
      ticks: yAxisTicks,
      bandSize: yBandSize,
      entry,
      index,
      dataKey: yAxisDataKey
    });
    var size = z !== "-" ? zAxis.scale(z) : defaultZ;
    var radius = Math.sqrt(Math.max(size, 0) / Math.PI);
    return _objectSpread(_objectSpread({}, entry), {}, {
      cx,
      cy,
      x: cx - radius,
      y: cy - radius,
      xAxis,
      yAxis,
      zAxis,
      width: 2 * radius,
      height: 2 * radius,
      size,
      node: {
        x,
        y,
        z
      },
      tooltipPayload,
      tooltipPosition: {
        x: cx,
        y: cy
      },
      payload: entry
    }, cells && cells[index] && cells[index].props);
  });
  return _objectSpread({
    points
  }, offset);
});
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
var ComposedChart = generateCategoricalChart({
  chartName: "ComposedChart",
  GraphicalChild: [Line, Area, Bar, Scatter],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }, {
    axisType: "zAxis",
    AxisComp: ZAxis
  }],
  formatAxisMap
});
function TrendIcon({
  value,
  prevValue
}) {
  if (prevValue === void 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5 text-muted-foreground" });
  if (value > prevValue)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-green-400" });
  if (value < prevValue)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-red-400" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5 text-muted-foreground" });
}
function MetricCard({
  label,
  value,
  unit,
  target,
  comparison,
  prevValue,
  isLoading,
  icon,
  "data-ocid": dataOcid
}) {
  const numericValue = typeof value === "number" ? value : Number.parseFloat(String(value));
  let severity = "ok";
  if (target !== void 0 && comparison && !Number.isNaN(numericValue)) {
    severity = getAlertSeverity(numericValue, target, comparison);
  }
  const accentClass = severity === "ok" ? "border-green-900/50" : severity === "warning" ? "border-amber-900/50" : "border-red-900/50";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border ${accentClass} rounded p-4 flex flex-col gap-2 shadow-elevation-1 relative overflow-hidden`,
      "data-ocid": dataOcid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider truncate min-w-0", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0 ml-2", children: [
            target !== void 0 && comparison && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBadge, { severity }),
            icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-24 bg-muted/50 rounded animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-2xl font-bold text-foreground leading-none tracking-tight", children: typeof value === "number" ? value.toFixed(value < 10 ? 2 : 1) : value }),
          unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mb-0.5 font-mono", children: unit }),
          typeof prevValue === "number" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-0.5 ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { value: numericValue, prevValue }) })
        ] }),
        target !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground font-mono", children: [
          "Target: ",
          comparison === "gte" ? "≥" : "≤",
          " ",
          target,
          unit
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute bottom-0 left-0 h-0.5 w-full ${severity === "ok" ? "bg-green-500/40" : severity === "warning" ? "bg-amber-500/40" : "bg-red-500/40"}`
          }
        )
      ]
    }
  );
}
function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: getMetrics,
    refetchInterval: 1e3,
    staleTime: 500
  });
}
function useResults() {
  return useQuery({
    queryKey: ["results"],
    queryFn: getResults,
    refetchInterval: 2e3,
    staleTime: 1e3
  });
}
function useSchedulingDecision() {
  return useQuery({
    queryKey: ["scheduling-decision"],
    queryFn: getSchedulingDecision,
    refetchInterval: 2e3,
    staleTime: 1e3
  });
}
const POLICY_COLORS = {
  round_robin: "#06b6d4",
  sjf: "#22c55e",
  priority: "#f97316"
};
const POLICY_LABELS = {
  round_robin: "Round Robin",
  sjf: "SJF",
  priority: "Priority"
};
const POLICY_BADGE_CLASS = {
  round_robin: "border-cyan-500/50 text-cyan-400 bg-cyan-950/40",
  sjf: "border-green-500/50 text-green-400 bg-green-950/40",
  priority: "border-orange-500/50 text-orange-400 bg-orange-950/40"
};
function GanttChart({ entries }) {
  if (entries.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-48 text-muted-foreground text-sm",
        "data-ocid": "gantt.empty_state",
        children: "No process data yet — start simulation to populate."
      }
    );
  }
  const byPid = {};
  for (const e of entries) {
    if (!byPid[e.pid]) byPid[e.pid] = [];
    byPid[e.pid].push(e);
  }
  const pidList = Object.keys(byPid).slice(0, 10).map(Number);
  const allTimes = entries.flatMap((e) => [e.start_time, e.end_time]);
  const minT = Math.min(...allTimes);
  const maxT = Math.max(...allTimes);
  const range = maxT - minT || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 overflow-hidden", "data-ocid": "gantt.chart", children: [
    pidList.map((pid, idx) => {
      var _a, _b;
      const bars = (byPid[pid] ?? []).map((e) => ({
        ...e,
        left: (e.start_time - minT) / range * 100,
        width: Math.max(1.5, (e.end_time - e.start_time) / range * 100)
      }));
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2",
          "data-ocid": `gantt.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 text-[11px] font-mono text-muted-foreground truncate shrink-0", children: ((_b = (_a = byPid[pid]) == null ? void 0 : _a[0]) == null ? void 0 : _b.name) ?? `P-${pid}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-5 bg-muted/20 rounded relative overflow-hidden", children: bars.map((bar, bi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0.5 h-4 rounded-sm opacity-85 transition-all duration-200",
                style: {
                  left: `${bar.left}%`,
                  width: `${bar.width}%`,
                  backgroundColor: POLICY_COLORS[bar.policy]
                },
                title: `${bar.name} | ${POLICY_LABELS[bar.policy]}`
              },
              `${bar.pid}-${bi}`
            )) })
          ]
        },
        pid
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex justify-between text-[10px] font-mono text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0ms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(range / 2),
          "ms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(range),
          "ms"
        ] })
      ] })
    ] })
  ] });
}
const TOOLTIP_STYLE = {
  background: "oklch(0.15 0 0)",
  border: "1px solid oklch(0.25 0 0)",
  borderRadius: "4px",
  fontSize: "11px",
  fontFamily: "var(--font-mono)",
  color: "oklch(0.85 0 0)"
};
const AXIS_TICK = {
  fontSize: 10,
  fill: "oklch(0.5 0 0)",
  fontFamily: "var(--font-mono)"
};
const GRID_STYLE = { stroke: "oklch(0.25 0 0)", strokeOpacity: 0.5 };
function DashboardPage() {
  const queryClient = useQueryClient();
  const { data: metrics, isLoading: metricsLoading } = useMetrics();
  const { data: decision } = useSchedulingDecision();
  const { data: results } = useResults();
  const [chartData, setChartData] = reactExports.useState([]);
  const [ganttEntries, setGanttEntries] = reactExports.useState([]);
  const [simRunning, setSimRunning] = reactExports.useState(false);
  const [policyOverride, setPolicyOverride] = reactExports.useState(false);
  const [lastUpdated, setLastUpdated] = reactExports.useState(null);
  const [decisionLog, setDecisionLog] = reactExports.useState([]);
  const simRef = reactExports.useRef(null);
  const monitorRef = reactExports.useRef(null);
  const currentThroughputRef = reactExports.useRef(0);
  const recentMetricsRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    if (!metrics) return;
    setLastUpdated(/* @__PURE__ */ new Date());
    const cpu = Math.round(metrics.cpu_usage * 10) / 10;
    const memory = Math.round(metrics.memory_usage * 10) / 10;
    recentMetricsRef.current = [
      ...recentMetricsRef.current.slice(-4),
      { cpu, memory }
    ];
    const point = {
      time: new Date(metrics.timestamp).toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }),
      cpu,
      memory,
      io: Math.round(metrics.io_bandwidth),
      processes: metrics.active_processes
    };
    setChartData((prev) => [...prev.slice(-29), point]);
  }, [metrics]);
  reactExports.useEffect(() => {
    if (!decision) return;
    const recent = recentMetricsRef.current;
    const cpuAvg = recent.length > 0 ? recent.reduce((s, r) => s + r.cpu, 0) / recent.length : 0;
    const memAvg = recent.length > 0 ? recent.reduce((s, r) => s + r.memory, 0) / recent.length : 0;
    setDecisionLog((prev) => [
      {
        ts: decision.timestamp,
        policy: decision.policy,
        confidence: decision.confidence,
        cpu_avg: Math.round(cpuAvg * 10) / 10,
        mem_avg: Math.round(memAvg * 10) / 10,
        reason: decision.reasoning
      },
      ...prev.slice(0, 19)
    ]);
  }, [decision]);
  reactExports.useEffect(() => {
    monitorRef.current = new AdaptiveOverrideMonitor(
      () => currentThroughputRef.current,
      (active) => {
        setPolicyOverride(active);
        void overridePolicy(active);
        if (active) {
          ue.warning("Adaptive Override Triggered", {
            description: "Throughput < 70% target — forcing Round Robin"
          });
        }
        queryClient.invalidateQueries({ queryKey: ["scheduling-decision"] });
      }
    );
    monitorRef.current.start();
    return () => {
      var _a;
      return (_a = monitorRef.current) == null ? void 0 : _a.stop();
    };
  }, [queryClient]);
  const handleStartSim = reactExports.useCallback(
    (count) => {
      simRef.current = new SimulationEngine((tick) => {
        setGanttEntries([...tick.ganttEntries]);
        currentThroughputRef.current = tick.throughput;
        queryClient.invalidateQueries({ queryKey: ["metrics"] });
        queryClient.invalidateQueries({ queryKey: ["results"] });
      });
      simRef.current.start(count);
      setSimRunning(true);
      ue.success(`Simulation started with ${count} processes`);
    },
    [queryClient]
  );
  const handleStopSim = reactExports.useCallback(() => {
    var _a;
    (_a = simRef.current) == null ? void 0 : _a.stop();
    setSimRunning(false);
    ue.info("Simulation stopped");
  }, []);
  const handleClearData = reactExports.useCallback(async () => {
    var _a;
    (_a = simRef.current) == null ? void 0 : _a.clear();
    setSimRunning(false);
    setGanttEntries([]);
    setChartData([]);
    setDecisionLog([]);
    recentMetricsRef.current = [];
    await clearData();
    queryClient.invalidateQueries();
    ue.success("Data cleared");
  }, [queryClient]);
  const handlePolicyOverride = reactExports.useCallback(async () => {
    const next = !policyOverride;
    setPolicyOverride(next);
    await overridePolicy(next);
    queryClient.invalidateQueries({ queryKey: ["scheduling-decision"] });
    ue(next ? "Override active: Round Robin forced" : "Override released", {
      description: next ? void 0 : "ML inference resumed"
    });
  }, [policyOverride, queryClient]);
  const currentMetrics = metrics;
  const stats = results;
  const cpuCritical = ((currentMetrics == null ? void 0 : currentMetrics.cpu_usage) ?? 0) > 90;
  const memWarning = ((currentMetrics == null ? void 0 : currentMetrics.memory_usage) ?? 0) > 85;
  const throughputLow = ((stats == null ? void 0 : stats.throughput) ?? 0) < 198 && !!stats;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center justify-between gap-3",
        "data-ocid": "dashboard.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold font-display text-foreground tracking-tight", children: "ResourceFlow" }),
            decision && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `font-mono text-[11px] ${POLICY_BADGE_CLASS[decision.policy]}`,
                "data-ocid": "dashboard.policy_badge",
                children: POLICY_LABELS[decision.policy]
              }
            ),
            decision && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] font-mono text-muted-foreground hidden sm:inline",
                "data-ocid": "dashboard.confidence",
                children: [
                  decision.confidence.toFixed(1),
                  "% conf"
                ]
              }
            ),
            policyOverride && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBadge, { severity: "warning", label: "Override Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            lastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground hidden md:inline", children: [
              "Updated ",
              lastUpdated.toLocaleTimeString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: handlePolicyOverride,
                "data-ocid": "dashboard.policy_override_button",
                className: policyOverride ? "border-amber-500/60 text-amber-400 bg-amber-950/20 hover:bg-amber-950/30" : "border-border hover:border-cyan-500/40 hover:text-accent",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 mr-1.5" }),
                  policyOverride ? "Release Override" : "Force Round Robin"
                ]
              }
            ),
            simRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                size: "sm",
                onClick: handleStopSim,
                "data-ocid": "dashboard.stop_sim_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Stop Sim"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => handleStartSim(100),
                  "data-ocid": "dashboard.start_sim_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 mr-1.5" }),
                    "Sim 100"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: () => handleStartSim(500),
                  "data-ocid": "dashboard.start_sim_large_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 mr-1.5" }),
                    "Sim 500"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: handleClearData,
                "data-ocid": "dashboard.clear_button",
                "aria-label": "Clear data",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ]
      }
    ),
    (cpuCritical || memWarning || throughputLow || policyOverride) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", "data-ocid": "dashboard.alerts_row", children: [
      cpuCritical && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertBadge,
        {
          severity: "critical",
          label: `CPU ${currentMetrics == null ? void 0 : currentMetrics.cpu_usage.toFixed(1)}% > 90%`
        }
      ),
      memWarning && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertBadge,
        {
          severity: "warning",
          label: `Memory ${currentMetrics == null ? void 0 : currentMetrics.memory_usage.toFixed(1)}% > 85%`
        }
      ),
      throughputLow && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertBadge,
        {
          severity: "warning",
          label: `Throughput ${stats == null ? void 0 : stats.throughput.toFixed(0)} < 198/s`
        }
      ),
      policyOverride && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBadge, { severity: "warning", label: "Policy Override Active" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3",
        "data-ocid": "dashboard.kpi_section",
        children: metricsLoading && !stats ? Array.from({ length: 5 }, (_, i) => `kpi-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-24",
            "data-ocid": "dashboard.kpi_loading_state"
          },
          k
        )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "CPU Utilization",
              value: (stats == null ? void 0 : stats.cpu_utilization) ?? (currentMetrics == null ? void 0 : currentMetrics.cpu_usage) ?? 0,
              unit: "%",
              target: 89,
              comparison: "gte",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-3.5 h-3.5" }),
              "data-ocid": "dashboard.cpu_card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Avg Waiting Time",
              value: (stats == null ? void 0 : stats.avg_waiting_time) ?? 0,
              unit: "ms",
              target: 21,
              comparison: "lte",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5" }),
              "data-ocid": "dashboard.waiting_card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Throughput",
              value: (stats == null ? void 0 : stats.throughput) ?? 0,
              unit: "/s",
              target: 198,
              comparison: "gte",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
              "data-ocid": "dashboard.throughput_card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Memory Efficiency",
              value: (stats == null ? void 0 : stats.memory_efficiency) ?? (currentMetrics == null ? void 0 : currentMetrics.memory_usage) ?? 0,
              unit: "%",
              target: 88,
              comparison: "gte",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryStick, { className: "w-3.5 h-3.5" }),
              "data-ocid": "dashboard.memory_card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Decision Latency",
              value: (stats == null ? void 0 : stats.decision_latency) ?? 0,
              unit: "ms",
              target: 3,
              comparison: "lte",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "w-3.5 h-3.5" }),
              "data-ocid": "dashboard.latency_card"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded p-4",
          "data-ocid": "dashboard.cpu_chart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold font-display", children: "CPU & Memory Usage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: "last 30s" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              LineChart,
              {
                data: chartData,
                margin: { top: 4, right: 32, left: -20, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      stroke: GRID_STYLE.stroke,
                      strokeOpacity: GRID_STYLE.strokeOpacity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "time", tick: AXIS_TICK, tickLine: false }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      yAxisId: "left",
                      domain: [0, 100],
                      tick: AXIS_TICK,
                      tickLine: false,
                      label: {
                        value: "%",
                        angle: -90,
                        position: "insideLeft",
                        style: { ...AXIS_TICK, fontSize: 9 }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      yAxisId: "right",
                      orientation: "right",
                      domain: [0, 100],
                      tick: AXIS_TICK,
                      tickLine: false,
                      label: {
                        value: "%",
                        angle: 90,
                        position: "insideRight",
                        style: { ...AXIS_TICK, fontSize: 9 }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: TOOLTIP_STYLE,
                      labelStyle: { color: "oklch(0.7 0 0)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Legend,
                    {
                      wrapperStyle: {
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      yAxisId: "left",
                      type: "monotone",
                      dataKey: "cpu",
                      stroke: "#06b6d4",
                      strokeWidth: 1.5,
                      dot: false,
                      name: "CPU %"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      yAxisId: "right",
                      type: "monotone",
                      dataKey: "memory",
                      stroke: "#f59e0b",
                      strokeWidth: 1.5,
                      dot: false,
                      name: "Memory %"
                    }
                  )
                ]
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded p-4",
          "data-ocid": "dashboard.io_chart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold font-display", children: "Active Processes & I/O Bandwidth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: "last 30s" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              ComposedChart,
              {
                data: chartData,
                margin: { top: 4, right: 32, left: -20, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      stroke: GRID_STYLE.stroke,
                      strokeOpacity: GRID_STYLE.strokeOpacity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "time", tick: AXIS_TICK, tickLine: false }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      yAxisId: "left",
                      tick: AXIS_TICK,
                      tickLine: false,
                      label: {
                        value: "procs",
                        angle: -90,
                        position: "insideLeft",
                        style: { ...AXIS_TICK, fontSize: 9 }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      yAxisId: "right",
                      orientation: "right",
                      tick: AXIS_TICK,
                      tickLine: false,
                      label: {
                        value: "MB/s",
                        angle: 90,
                        position: "insideRight",
                        style: { ...AXIS_TICK, fontSize: 9 }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: TOOLTIP_STYLE,
                      labelStyle: { color: "oklch(0.7 0 0)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Legend,
                    {
                      wrapperStyle: {
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Bar,
                    {
                      yAxisId: "left",
                      dataKey: "processes",
                      name: "Active Processes",
                      radius: [2, 2, 0, 0],
                      maxBarSize: 18,
                      children: chartData.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Cell,
                        {
                          fill: "#3b82f6",
                          fillOpacity: 0.75
                        },
                        `cell-${point.time}`
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      yAxisId: "right",
                      type: "monotone",
                      dataKey: "io",
                      stroke: "#22c55e",
                      strokeWidth: 1.5,
                      dot: false,
                      name: "I/O MB/s"
                    }
                  )
                ]
              }
            ) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded p-4",
          "data-ocid": "dashboard.gantt_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold font-display", children: "Process Execution Timeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: Object.entries(POLICY_LABELS).map(
                ([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-2.5 h-2.5 rounded-full",
                      style: { backgroundColor: POLICY_COLORS[key] }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: label })
                ] }, key)
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GanttChart, { entries: ganttEntries.slice(-10 * 8) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded p-4 flex flex-col",
          "data-ocid": "dashboard.decision_log",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold font-display", children: "Scheduling Decision Log" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: handlePolicyOverride,
                  "data-ocid": "dashboard.accept_override_button",
                  className: `text-[11px] h-7 px-2.5 ${policyOverride ? "border-amber-500/50 text-amber-400" : ""}`,
                  children: policyOverride ? "Release Override" : "Accept Override"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto flex-1 max-h-64 rounded border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-[11px] font-mono border-collapse min-w-[480px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-muted/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2 text-muted-foreground font-medium border-b border-border/60", children: "Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2 text-muted-foreground font-medium border-b border-border/60", children: "Policy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2 text-muted-foreground font-medium border-b border-border/60", children: "Conf %" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2 text-muted-foreground font-medium border-b border-border/60", children: "CPU avg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-2 text-muted-foreground font-medium border-b border-border/60", children: "Mem avg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-2 text-muted-foreground font-medium border-b border-border/60 hidden md:table-cell", children: "Reason" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: decisionLog.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 6,
                  className: "py-8 text-center text-muted-foreground",
                  "data-ocid": "dashboard.log_empty_state",
                  children: "No decisions logged yet."
                }
              ) }) : decisionLog.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/30 hover:bg-muted/20 transition-colors",
                  "data-ocid": `dashboard.log_item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2 text-muted-foreground whitespace-nowrap", children: new Date(entry.ts).toLocaleTimeString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                        style: {
                          color: POLICY_COLORS[entry.policy],
                          background: `${POLICY_COLORS[entry.policy]}1a`,
                          border: `1px solid ${POLICY_COLORS[entry.policy]}44`
                        },
                        children: POLICY_LABELS[entry.policy]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        className: `py-1.5 px-2 text-right tabular-nums ${entry.confidence >= 75 ? "text-green-400" : entry.confidence >= 65 ? "text-amber-400" : "text-red-400"}`,
                        children: [
                          entry.confidence.toFixed(1),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 px-2 text-right text-foreground/70 tabular-nums", children: [
                      entry.cpu_avg.toFixed(1),
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1.5 px-2 text-right text-foreground/70 tabular-nums", children: [
                      entry.mem_avg.toFixed(1),
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-2 text-muted-foreground truncate max-w-[180px] hidden md:table-cell", children: entry.reason.length > 60 ? `${entry.reason.slice(0, 57)}…` : entry.reason })
                  ]
                },
                entry.ts
              )) })
            ] }) })
          ]
        }
      )
    ] })
  ] });
}
export {
  DashboardPage as default
};
