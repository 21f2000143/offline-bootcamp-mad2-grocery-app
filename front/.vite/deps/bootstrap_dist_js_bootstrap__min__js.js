import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-DZZM6G22.js";

// node_modules/@popperjs/core/lib/enums.js
var top, bottom, right, left, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases;
var init_enums = __esm({
  "node_modules/@popperjs/core/lib/enums.js"() {
    top = "top";
    bottom = "bottom";
    right = "right";
    left = "left";
    auto = "auto";
    basePlacements = [top, bottom, right, left];
    start = "start";
    end = "end";
    clippingParents = "clippingParents";
    viewport = "viewport";
    popper = "popper";
    reference = "reference";
    variationPlacements = basePlacements.reduce(function(acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []);
    beforeRead = "beforeRead";
    read = "read";
    afterRead = "afterRead";
    beforeMain = "beforeMain";
    main = "main";
    afterMain = "afterMain";
    beforeWrite = "beforeWrite";
    write = "write";
    afterWrite = "afterWrite";
    modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
var init_getNodeName = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeName.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
var init_getWindow = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindow.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var init_instanceOf = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default;
var init_applyStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/applyStyles.js"() {
    init_getNodeName();
    init_instanceOf();
    applyStyles_default = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect,
      requires: ["computeStyles"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var init_getBasePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getBasePlacement.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/math.js
var max, min, round;
var init_math = __esm({
  "node_modules/@popperjs/core/lib/utils/math.js"() {
    max = Math.max;
    min = Math.min;
    round = Math.round;
  }
});

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
var init_userAgent = __esm({
  "node_modules/@popperjs/core/lib/utils/userAgent.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
var init_isLayoutViewport = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js"() {
    init_userAgent();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
var init_getBoundingClientRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js"() {
    init_instanceOf();
    init_math();
    init_getWindow();
    init_isLayoutViewport();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
var init_getLayoutRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js"() {
    init_getBoundingClientRect();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
var init_contains = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/contains.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
var init_getComputedStyle = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
var init_isTableElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isTableElement.js"() {
    init_getNodeName();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}
var init_getDocumentElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}
var init_getParentNode = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getParentNode.js"() {
    init_getNodeName();
    init_getDocumentElement();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var init_getOffsetParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js"() {
    init_getWindow();
    init_getNodeName();
    init_getComputedStyle();
    init_instanceOf();
    init_isTableElement();
    init_getParentNode();
    init_userAgent();
  }
});

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
var init_getMainAxisFromPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
var init_within = __esm({
  "node_modules/@popperjs/core/lib/utils/within.js"() {
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
var init_getFreshSideObject = __esm({
  "node_modules/@popperjs/core/lib/utils/getFreshSideObject.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
var init_mergePaddingObject = __esm({
  "node_modules/@popperjs/core/lib/utils/mergePaddingObject.js"() {
    init_getFreshSideObject();
  }
});

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var init_expandToHashMap = __esm({
  "node_modules/@popperjs/core/lib/utils/expandToHashMap.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/arrow.js
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var toPaddingObject, arrow_default;
var init_arrow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/arrow.js"() {
    init_getBasePlacement();
    init_getLayoutRect();
    init_contains();
    init_getOffsetParent();
    init_getMainAxisFromPlacement();
    init_within();
    init_mergePaddingObject();
    init_expandToHashMap();
    init_enums();
    toPaddingObject = function toPaddingObject2(padding, state) {
      padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    arrow_default = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect: effect2,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}
var init_getVariation = __esm({
  "node_modules/@popperjs/core/lib/utils/getVariation.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var unsetSides, computeStyles_default;
var init_computeStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/computeStyles.js"() {
    init_enums();
    init_getOffsetParent();
    init_getWindow();
    init_getDocumentElement();
    init_getComputedStyle();
    init_getBasePlacement();
    init_getVariation();
    init_math();
    unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    };
    computeStyles_default = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var passive, eventListeners_default;
var init_eventListeners = __esm({
  "node_modules/@popperjs/core/lib/modifiers/eventListeners.js"() {
    init_getWindow();
    passive = {
      passive: true
    };
    eventListeners_default = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {
      },
      effect: effect3,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}
var hash;
var init_getOppositePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositePlacement.js"() {
    hash = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}
var hash2;
var init_getOppositeVariationPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js"() {
    hash2 = {
      start: "end",
      end: "start"
    };
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
var init_getWindowScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
var init_getWindowScrollBarX = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js"() {
    init_getBoundingClientRect();
    init_getDocumentElement();
    init_getWindowScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
var init_getViewportRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js"() {
    init_getWindow();
    init_getDocumentElement();
    init_getWindowScrollBarX();
    init_isLayoutViewport();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var init_getDocumentRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js"() {
    init_getDocumentElement();
    init_getComputedStyle();
    init_getWindowScrollBarX();
    init_getWindowScroll();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
var init_isScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js"() {
    init_getComputedStyle();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
var init_getScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js"() {
    init_getParentNode();
    init_isScrollParent();
    init_getNodeName();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}
var init_listScrollParents = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js"() {
    init_getScrollParent();
    init_getParentNode();
    init_getWindow();
    init_isScrollParent();
  }
});

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
var init_rectToClientRect = __esm({
  "node_modules/@popperjs/core/lib/utils/rectToClientRect.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
var init_getClippingRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js"() {
    init_enums();
    init_getViewportRect();
    init_getDocumentRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_getDocumentElement();
    init_getComputedStyle();
    init_instanceOf();
    init_getBoundingClientRect();
    init_getParentNode();
    init_contains();
    init_getNodeName();
    init_rectToClientRect();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
var init_computeOffsets = __esm({
  "node_modules/@popperjs/core/lib/utils/computeOffsets.js"() {
    init_getBasePlacement();
    init_getVariation();
    init_getMainAxisFromPlacement();
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
var init_detectOverflow = __esm({
  "node_modules/@popperjs/core/lib/utils/detectOverflow.js"() {
    init_getClippingRect();
    init_getDocumentElement();
    init_getBoundingClientRect();
    init_computeOffsets();
    init_rectToClientRect();
    init_enums();
    init_instanceOf();
    init_mergePaddingObject();
    init_expandToHashMap();
  }
});

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
var init_computeAutoPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js"() {
    init_getVariation();
    init_enums();
    init_detectOverflow();
    init_getBasePlacement();
  }
});

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default;
var init_flip = __esm({
  "node_modules/@popperjs/core/lib/modifiers/flip.js"() {
    init_getOppositePlacement();
    init_getBasePlacement();
    init_getOppositeVariationPlacement();
    init_detectOverflow();
    init_computeAutoPlacement();
    init_enums();
    init_getVariation();
    flip_default = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip,
      requiresIfExists: ["offset"],
      data: {
        _skip: false
      }
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default;
var init_hide = __esm({
  "node_modules/@popperjs/core/lib/modifiers/hide.js"() {
    init_enums();
    init_detectOverflow();
    hide_default = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default;
var init_offset = __esm({
  "node_modules/@popperjs/core/lib/modifiers/offset.js"() {
    init_getBasePlacement();
    init_enums();
    offset_default = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default;
var init_popperOffsets = __esm({
  "node_modules/@popperjs/core/lib/modifiers/popperOffsets.js"() {
    init_computeOffsets();
    popperOffsets_default = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
var init_getAltAxis = __esm({
  "node_modules/@popperjs/core/lib/utils/getAltAxis.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default;
var init_preventOverflow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/preventOverflow.js"() {
    init_enums();
    init_getBasePlacement();
    init_getMainAxisFromPlacement();
    init_getAltAxis();
    init_within();
    init_getLayoutRect();
    init_getOffsetParent();
    init_detectOverflow();
    init_getVariation();
    init_getFreshSideObject();
    init_math();
    preventOverflow_default = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"]
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/index.js
var init_modifiers = __esm({
  "node_modules/@popperjs/core/lib/modifiers/index.js"() {
    init_applyStyles();
    init_arrow();
    init_computeStyles();
    init_eventListeners();
    init_flip();
    init_hide();
    init_offset();
    init_popperOffsets();
    init_preventOverflow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
var init_getHTMLElementScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
var init_getNodeScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js"() {
    init_getWindowScroll();
    init_getWindow();
    init_instanceOf();
    init_getHTMLElementScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
var init_getCompositeRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js"() {
    init_getBoundingClientRect();
    init_getNodeScroll();
    init_getNodeName();
    init_instanceOf();
    init_getWindowScrollBarX();
    init_getDocumentElement();
    init_isScrollParent();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
var init_orderModifiers = __esm({
  "node_modules/@popperjs/core/lib/utils/orderModifiers.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
var init_debounce = __esm({
  "node_modules/@popperjs/core/lib/utils/debounce.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var init_mergeByName = __esm({
  "node_modules/@popperjs/core/lib/utils/mergeByName.js"() {
  }
});

// node_modules/@popperjs/core/lib/createPopper.js
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var DEFAULT_OPTIONS, createPopper;
var init_createPopper = __esm({
  "node_modules/@popperjs/core/lib/createPopper.js"() {
    init_getCompositeRect();
    init_getLayoutRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_orderModifiers();
    init_debounce();
    init_mergeByName();
    init_detectOverflow();
    init_instanceOf();
    DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
    };
    createPopper = popperGenerator();
  }
});

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers, createPopper2;
var init_popper_lite = __esm({
  "node_modules/@popperjs/core/lib/popper-lite.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
    createPopper2 = popperGenerator({
      defaultModifiers
    });
  }
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2, createPopper3;
var init_popper = __esm({
  "node_modules/@popperjs/core/lib/popper.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    init_offset();
    init_flip();
    init_preventOverflow();
    init_arrow();
    init_hide();
    init_popper_lite();
    init_modifiers();
    defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
    createPopper3 = popperGenerator({
      defaultModifiers: defaultModifiers2
    });
  }
});

// node_modules/@popperjs/core/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  afterMain: () => afterMain,
  afterRead: () => afterRead,
  afterWrite: () => afterWrite,
  applyStyles: () => applyStyles_default,
  arrow: () => arrow_default,
  auto: () => auto,
  basePlacements: () => basePlacements,
  beforeMain: () => beforeMain,
  beforeRead: () => beforeRead,
  beforeWrite: () => beforeWrite,
  bottom: () => bottom,
  clippingParents: () => clippingParents,
  computeStyles: () => computeStyles_default,
  createPopper: () => createPopper3,
  createPopperBase: () => createPopper,
  createPopperLite: () => createPopper2,
  detectOverflow: () => detectOverflow,
  end: () => end,
  eventListeners: () => eventListeners_default,
  flip: () => flip_default,
  hide: () => hide_default,
  left: () => left,
  main: () => main,
  modifierPhases: () => modifierPhases,
  offset: () => offset_default,
  placements: () => placements,
  popper: () => popper,
  popperGenerator: () => popperGenerator,
  popperOffsets: () => popperOffsets_default,
  preventOverflow: () => preventOverflow_default,
  read: () => read,
  reference: () => reference,
  right: () => right,
  start: () => start,
  top: () => top,
  variationPlacements: () => variationPlacements,
  viewport: () => viewport,
  write: () => write
});
var init_lib = __esm({
  "node_modules/@popperjs/core/lib/index.js"() {
    init_enums();
    init_modifiers();
    init_createPopper();
    init_popper();
    init_popper_lite();
  }
});

// node_modules/bootstrap/dist/js/bootstrap.min.js
var require_bootstrap_min = __commonJS({
  "node_modules/bootstrap/dist/js/bootstrap.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e((init_lib(), __toCommonJS(lib_exports))) : "function" == typeof define && define.amd ? define(["@popperjs/core"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper);
    }(exports, function(t) {
      "use strict";
      function e(t2) {
        const e2 = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
        if (t2) {
          for (const i2 in t2) if ("default" !== i2) {
            const s2 = Object.getOwnPropertyDescriptor(t2, i2);
            Object.defineProperty(e2, i2, s2.get ? s2 : { enumerable: true, get: () => t2[i2] });
          }
        }
        return e2.default = t2, Object.freeze(e2);
      }
      const i = e(t), s = /* @__PURE__ */ new Map(), n = { set(t2, e2, i2) {
        s.has(t2) || s.set(t2, /* @__PURE__ */ new Map());
        const n2 = s.get(t2);
        n2.has(e2) || 0 === n2.size ? n2.set(e2, i2) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n2.keys())[0]}.`);
      }, get: (t2, e2) => s.has(t2) && s.get(t2).get(e2) || null, remove(t2, e2) {
        if (!s.has(t2)) return;
        const i2 = s.get(t2);
        i2.delete(e2), 0 === i2.size && s.delete(t2);
      } }, o = "transitionend", r = (t2) => (t2 && window.CSS && window.CSS.escape && (t2 = t2.replace(/#([^\s"#']+)/g, (t3, e2) => `#${CSS.escape(e2)}`)), t2), a = (t2) => {
        t2.dispatchEvent(new Event(o));
      }, l = (t2) => !(!t2 || "object" != typeof t2) && (void 0 !== t2.jquery && (t2 = t2[0]), void 0 !== t2.nodeType), c = (t2) => l(t2) ? t2.jquery ? t2[0] : t2 : "string" == typeof t2 && t2.length > 0 ? document.querySelector(r(t2)) : null, h = (t2) => {
        if (!l(t2) || 0 === t2.getClientRects().length) return false;
        const e2 = "visible" === getComputedStyle(t2).getPropertyValue("visibility"), i2 = t2.closest("details:not([open])");
        if (!i2) return e2;
        if (i2 !== t2) {
          const e3 = t2.closest("summary");
          if (e3 && e3.parentNode !== i2) return false;
          if (null === e3) return false;
        }
        return e2;
      }, d = (t2) => !t2 || t2.nodeType !== Node.ELEMENT_NODE || !!t2.classList.contains("disabled") || (void 0 !== t2.disabled ? t2.disabled : t2.hasAttribute("disabled") && "false" !== t2.getAttribute("disabled")), u = (t2) => {
        if (!document.documentElement.attachShadow) return null;
        if ("function" == typeof t2.getRootNode) {
          const e2 = t2.getRootNode();
          return e2 instanceof ShadowRoot ? e2 : null;
        }
        return t2 instanceof ShadowRoot ? t2 : t2.parentNode ? u(t2.parentNode) : null;
      }, _ = () => {
      }, g = (t2) => {
        t2.offsetHeight;
      }, f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, m = [], p = () => "rtl" === document.documentElement.dir, b = (t2) => {
        var e2;
        e2 = () => {
          const e3 = f();
          if (e3) {
            const i2 = t2.NAME, s2 = e3.fn[i2];
            e3.fn[i2] = t2.jQueryInterface, e3.fn[i2].Constructor = t2, e3.fn[i2].noConflict = () => (e3.fn[i2] = s2, t2.jQueryInterface);
          }
        }, "loading" === document.readyState ? (m.length || document.addEventListener("DOMContentLoaded", () => {
          for (const t3 of m) t3();
        }), m.push(e2)) : e2();
      }, v = (t2, e2 = [], i2 = t2) => "function" == typeof t2 ? t2(...e2) : i2, y = (t2, e2, i2 = true) => {
        if (!i2) return void v(t2);
        const s2 = ((t3) => {
          if (!t3) return 0;
          let { transitionDuration: e3, transitionDelay: i3 } = window.getComputedStyle(t3);
          const s3 = Number.parseFloat(e3), n3 = Number.parseFloat(i3);
          return s3 || n3 ? (e3 = e3.split(",")[0], i3 = i3.split(",")[0], 1e3 * (Number.parseFloat(e3) + Number.parseFloat(i3))) : 0;
        })(e2) + 5;
        let n2 = false;
        const r2 = ({ target: i3 }) => {
          i3 === e2 && (n2 = true, e2.removeEventListener(o, r2), v(t2));
        };
        e2.addEventListener(o, r2), setTimeout(() => {
          n2 || a(e2);
        }, s2);
      }, w = (t2, e2, i2, s2) => {
        const n2 = t2.length;
        let o2 = t2.indexOf(e2);
        return -1 === o2 ? !i2 && s2 ? t2[n2 - 1] : t2[0] : (o2 += i2 ? 1 : -1, s2 && (o2 = (o2 + n2) % n2), t2[Math.max(0, Math.min(o2, n2 - 1))]);
      }, A = /[^.]*(?=\..*)\.|.*/, E = /\..*/, C = /::\d+$/, T = {};
      let k = 1;
      const $ = { mouseenter: "mouseover", mouseleave: "mouseout" }, S = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
      function L(t2, e2) {
        return e2 && `${e2}::${k++}` || t2.uidEvent || k++;
      }
      function O(t2) {
        const e2 = L(t2);
        return t2.uidEvent = e2, T[e2] = T[e2] || {}, T[e2];
      }
      function I(t2, e2, i2 = null) {
        return Object.values(t2).find((t3) => t3.callable === e2 && t3.delegationSelector === i2);
      }
      function D(t2, e2, i2) {
        const s2 = "string" == typeof e2, n2 = s2 ? i2 : e2 || i2;
        let o2 = M(t2);
        return S.has(o2) || (o2 = t2), [s2, n2, o2];
      }
      function N(t2, e2, i2, s2, n2) {
        if ("string" != typeof e2 || !t2) return;
        let [o2, r2, a2] = D(e2, i2, s2);
        if (e2 in $) {
          const t3 = (t4) => function(e3) {
            if (!e3.relatedTarget || e3.relatedTarget !== e3.delegateTarget && !e3.delegateTarget.contains(e3.relatedTarget)) return t4.call(this, e3);
          };
          r2 = t3(r2);
        }
        const l2 = O(t2), c2 = l2[a2] || (l2[a2] = {}), h2 = I(c2, r2, o2 ? i2 : null);
        if (h2) return void (h2.oneOff = h2.oneOff && n2);
        const d2 = L(r2, e2.replace(A, "")), u2 = o2 ? /* @__PURE__ */ function(t3, e3, i3) {
          return function s3(n3) {
            const o3 = t3.querySelectorAll(e3);
            for (let { target: r3 } = n3; r3 && r3 !== this; r3 = r3.parentNode) for (const a3 of o3) if (a3 === r3) return F(n3, { delegateTarget: r3 }), s3.oneOff && j.off(t3, n3.type, e3, i3), i3.apply(r3, [n3]);
          };
        }(t2, i2, r2) : /* @__PURE__ */ function(t3, e3) {
          return function i3(s3) {
            return F(s3, { delegateTarget: t3 }), i3.oneOff && j.off(t3, s3.type, e3), e3.apply(t3, [s3]);
          };
        }(t2, r2);
        u2.delegationSelector = o2 ? i2 : null, u2.callable = r2, u2.oneOff = n2, u2.uidEvent = d2, c2[d2] = u2, t2.addEventListener(a2, u2, o2);
      }
      function P(t2, e2, i2, s2, n2) {
        const o2 = I(e2[i2], s2, n2);
        o2 && (t2.removeEventListener(i2, o2, Boolean(n2)), delete e2[i2][o2.uidEvent]);
      }
      function x(t2, e2, i2, s2) {
        const n2 = e2[i2] || {};
        for (const [o2, r2] of Object.entries(n2)) o2.includes(s2) && P(t2, e2, i2, r2.callable, r2.delegationSelector);
      }
      function M(t2) {
        return t2 = t2.replace(E, ""), $[t2] || t2;
      }
      const j = { on(t2, e2, i2, s2) {
        N(t2, e2, i2, s2, false);
      }, one(t2, e2, i2, s2) {
        N(t2, e2, i2, s2, true);
      }, off(t2, e2, i2, s2) {
        if ("string" != typeof e2 || !t2) return;
        const [n2, o2, r2] = D(e2, i2, s2), a2 = r2 !== e2, l2 = O(t2), c2 = l2[r2] || {}, h2 = e2.startsWith(".");
        if (void 0 === o2) {
          if (h2) for (const i3 of Object.keys(l2)) x(t2, l2, i3, e2.slice(1));
          for (const [i3, s3] of Object.entries(c2)) {
            const n3 = i3.replace(C, "");
            a2 && !e2.includes(n3) || P(t2, l2, r2, s3.callable, s3.delegationSelector);
          }
        } else {
          if (!Object.keys(c2).length) return;
          P(t2, l2, r2, o2, n2 ? i2 : null);
        }
      }, trigger(t2, e2, i2) {
        if ("string" != typeof e2 || !t2) return null;
        const s2 = f();
        let n2 = null, o2 = true, r2 = true, a2 = false;
        e2 !== M(e2) && s2 && (n2 = s2.Event(e2, i2), s2(t2).trigger(n2), o2 = !n2.isPropagationStopped(), r2 = !n2.isImmediatePropagationStopped(), a2 = n2.isDefaultPrevented());
        const l2 = F(new Event(e2, { bubbles: o2, cancelable: true }), i2);
        return a2 && l2.preventDefault(), r2 && t2.dispatchEvent(l2), l2.defaultPrevented && n2 && n2.preventDefault(), l2;
      } };
      function F(t2, e2 = {}) {
        for (const [i2, s2] of Object.entries(e2)) try {
          t2[i2] = s2;
        } catch (e3) {
          Object.defineProperty(t2, i2, { configurable: true, get: () => s2 });
        }
        return t2;
      }
      function z(t2) {
        if ("true" === t2) return true;
        if ("false" === t2) return false;
        if (t2 === Number(t2).toString()) return Number(t2);
        if ("" === t2 || "null" === t2) return null;
        if ("string" != typeof t2) return t2;
        try {
          return JSON.parse(decodeURIComponent(t2));
        } catch (e2) {
          return t2;
        }
      }
      function H(t2) {
        return t2.replace(/[A-Z]/g, (t3) => `-${t3.toLowerCase()}`);
      }
      const B = { setDataAttribute(t2, e2, i2) {
        t2.setAttribute(`data-bs-${H(e2)}`, i2);
      }, removeDataAttribute(t2, e2) {
        t2.removeAttribute(`data-bs-${H(e2)}`);
      }, getDataAttributes(t2) {
        if (!t2) return {};
        const e2 = {}, i2 = Object.keys(t2.dataset).filter((t3) => t3.startsWith("bs") && !t3.startsWith("bsConfig"));
        for (const s2 of i2) {
          let i3 = s2.replace(/^bs/, "");
          i3 = i3.charAt(0).toLowerCase() + i3.slice(1, i3.length), e2[i3] = z(t2.dataset[s2]);
        }
        return e2;
      }, getDataAttribute: (t2, e2) => z(t2.getAttribute(`data-bs-${H(e2)}`)) };
      class q {
        static get Default() {
          return {};
        }
        static get DefaultType() {
          return {};
        }
        static get NAME() {
          throw new Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(t2) {
          return t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
        }
        _configAfterMerge(t2) {
          return t2;
        }
        _mergeConfigObj(t2, e2) {
          const i2 = l(e2) ? B.getDataAttribute(e2, "config") : {};
          return { ...this.constructor.Default, ..."object" == typeof i2 ? i2 : {}, ...l(e2) ? B.getDataAttributes(e2) : {}, ..."object" == typeof t2 ? t2 : {} };
        }
        _typeCheckConfig(t2, e2 = this.constructor.DefaultType) {
          for (const [s2, n2] of Object.entries(e2)) {
            const e3 = t2[s2], o2 = l(e3) ? "element" : null == (i2 = e3) ? `${i2}` : Object.prototype.toString.call(i2).match(/\s([a-z]+)/i)[1].toLowerCase();
            if (!new RegExp(n2).test(o2)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s2}" provided type "${o2}" but expected type "${n2}".`);
          }
          var i2;
        }
      }
      class W extends q {
        constructor(t2, e2) {
          super(), (t2 = c(t2)) && (this._element = t2, this._config = this._getConfig(e2), n.set(this._element, this.constructor.DATA_KEY, this));
        }
        dispose() {
          n.remove(this._element, this.constructor.DATA_KEY), j.off(this._element, this.constructor.EVENT_KEY);
          for (const t2 of Object.getOwnPropertyNames(this)) this[t2] = null;
        }
        _queueCallback(t2, e2, i2 = true) {
          y(t2, e2, i2);
        }
        _getConfig(t2) {
          return t2 = this._mergeConfigObj(t2, this._element), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
        }
        static getInstance(t2) {
          return n.get(c(t2), this.DATA_KEY);
        }
        static getOrCreateInstance(t2, e2 = {}) {
          return this.getInstance(t2) || new this(t2, "object" == typeof e2 ? e2 : null);
        }
        static get VERSION() {
          return "5.3.3";
        }
        static get DATA_KEY() {
          return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
          return `.${this.DATA_KEY}`;
        }
        static eventName(t2) {
          return `${t2}${this.EVENT_KEY}`;
        }
      }
      const R = (t2) => {
        let e2 = t2.getAttribute("data-bs-target");
        if (!e2 || "#" === e2) {
          let i2 = t2.getAttribute("href");
          if (!i2 || !i2.includes("#") && !i2.startsWith(".")) return null;
          i2.includes("#") && !i2.startsWith("#") && (i2 = `#${i2.split("#")[1]}`), e2 = i2 && "#" !== i2 ? i2.trim() : null;
        }
        return e2 ? e2.split(",").map((t3) => r(t3)).join(",") : null;
      }, K = { find: (t2, e2 = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e2, t2)), findOne: (t2, e2 = document.documentElement) => Element.prototype.querySelector.call(e2, t2), children: (t2, e2) => [].concat(...t2.children).filter((t3) => t3.matches(e2)), parents(t2, e2) {
        const i2 = [];
        let s2 = t2.parentNode.closest(e2);
        for (; s2; ) i2.push(s2), s2 = s2.parentNode.closest(e2);
        return i2;
      }, prev(t2, e2) {
        let i2 = t2.previousElementSibling;
        for (; i2; ) {
          if (i2.matches(e2)) return [i2];
          i2 = i2.previousElementSibling;
        }
        return [];
      }, next(t2, e2) {
        let i2 = t2.nextElementSibling;
        for (; i2; ) {
          if (i2.matches(e2)) return [i2];
          i2 = i2.nextElementSibling;
        }
        return [];
      }, focusableChildren(t2) {
        const e2 = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t3) => `${t3}:not([tabindex^="-"])`).join(",");
        return this.find(e2, t2).filter((t3) => !d(t3) && h(t3));
      }, getSelectorFromElement(t2) {
        const e2 = R(t2);
        return e2 && K.findOne(e2) ? e2 : null;
      }, getElementFromSelector(t2) {
        const e2 = R(t2);
        return e2 ? K.findOne(e2) : null;
      }, getMultipleElementsFromSelector(t2) {
        const e2 = R(t2);
        return e2 ? K.find(e2) : [];
      } }, V = (t2, e2 = "hide") => {
        const i2 = `click.dismiss${t2.EVENT_KEY}`, s2 = t2.NAME;
        j.on(document, i2, `[data-bs-dismiss="${s2}"]`, function(i3) {
          if (["A", "AREA"].includes(this.tagName) && i3.preventDefault(), d(this)) return;
          const n2 = K.getElementFromSelector(this) || this.closest(`.${s2}`);
          t2.getOrCreateInstance(n2)[e2]();
        });
      }, Q = ".bs.alert", X = `close${Q}`, Y = `closed${Q}`;
      class U extends W {
        static get NAME() {
          return "alert";
        }
        close() {
          if (j.trigger(this._element, X).defaultPrevented) return;
          this._element.classList.remove("show");
          const t2 = this._element.classList.contains("fade");
          this._queueCallback(() => this._destroyElement(), this._element, t2);
        }
        _destroyElement() {
          this._element.remove(), j.trigger(this._element, Y), this.dispose();
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = U.getOrCreateInstance(this);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
              e2[t2](this);
            }
          });
        }
      }
      V(U, "close"), b(U);
      const G = '[data-bs-toggle="button"]';
      class J extends W {
        static get NAME() {
          return "button";
        }
        toggle() {
          this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = J.getOrCreateInstance(this);
            "toggle" === t2 && e2[t2]();
          });
        }
      }
      j.on(document, "click.bs.button.data-api", G, (t2) => {
        t2.preventDefault();
        const e2 = t2.target.closest(G);
        J.getOrCreateInstance(e2).toggle();
      }), b(J);
      const Z = ".bs.swipe", tt = `touchstart${Z}`, et = `touchmove${Z}`, it = `touchend${Z}`, st = `pointerdown${Z}`, nt = `pointerup${Z}`, ot = { endCallback: null, leftCallback: null, rightCallback: null }, rt = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
      class at extends q {
        constructor(t2, e2) {
          super(), this._element = t2, t2 && at.isSupported() && (this._config = this._getConfig(e2), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents());
        }
        static get Default() {
          return ot;
        }
        static get DefaultType() {
          return rt;
        }
        static get NAME() {
          return "swipe";
        }
        dispose() {
          j.off(this._element, Z);
        }
        _start(t2) {
          this._supportPointerEvents ? this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX) : this._deltaX = t2.touches[0].clientX;
        }
        _end(t2) {
          this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX - this._deltaX), this._handleSwipe(), v(this._config.endCallback);
        }
        _move(t2) {
          this._deltaX = t2.touches && t2.touches.length > 1 ? 0 : t2.touches[0].clientX - this._deltaX;
        }
        _handleSwipe() {
          const t2 = Math.abs(this._deltaX);
          if (t2 <= 40) return;
          const e2 = t2 / this._deltaX;
          this._deltaX = 0, e2 && v(e2 > 0 ? this._config.rightCallback : this._config.leftCallback);
        }
        _initEvents() {
          this._supportPointerEvents ? (j.on(this._element, st, (t2) => this._start(t2)), j.on(this._element, nt, (t2) => this._end(t2)), this._element.classList.add("pointer-event")) : (j.on(this._element, tt, (t2) => this._start(t2)), j.on(this._element, et, (t2) => this._move(t2)), j.on(this._element, it, (t2) => this._end(t2)));
        }
        _eventIsPointerPenTouch(t2) {
          return this._supportPointerEvents && ("pen" === t2.pointerType || "touch" === t2.pointerType);
        }
        static isSupported() {
          return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
        }
      }
      const lt = ".bs.carousel", ct = ".data-api", ht = "next", dt = "prev", ut = "left", _t = "right", gt = `slide${lt}`, ft = `slid${lt}`, mt = `keydown${lt}`, pt = `mouseenter${lt}`, bt = `mouseleave${lt}`, vt = `dragstart${lt}`, yt = `load${lt}${ct}`, wt = `click${lt}${ct}`, At = "carousel", Et = "active", Ct = ".active", Tt = ".carousel-item", kt = Ct + Tt, $t = { ArrowLeft: _t, ArrowRight: ut }, St = { interval: 5e3, keyboard: true, pause: "hover", ride: false, touch: true, wrap: true }, Lt = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
      class Ot extends W {
        constructor(t2, e2) {
          super(t2, e2), this._interval = null, this._activeElement = null, this._isSliding = false, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = K.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === At && this.cycle();
        }
        static get Default() {
          return St;
        }
        static get DefaultType() {
          return Lt;
        }
        static get NAME() {
          return "carousel";
        }
        next() {
          this._slide(ht);
        }
        nextWhenVisible() {
          !document.hidden && h(this._element) && this.next();
        }
        prev() {
          this._slide(dt);
        }
        pause() {
          this._isSliding && a(this._element), this._clearInterval();
        }
        cycle() {
          this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
        }
        _maybeEnableCycle() {
          this._config.ride && (this._isSliding ? j.one(this._element, ft, () => this.cycle()) : this.cycle());
        }
        to(t2) {
          const e2 = this._getItems();
          if (t2 > e2.length - 1 || t2 < 0) return;
          if (this._isSliding) return void j.one(this._element, ft, () => this.to(t2));
          const i2 = this._getItemIndex(this._getActive());
          if (i2 === t2) return;
          const s2 = t2 > i2 ? ht : dt;
          this._slide(s2, e2[t2]);
        }
        dispose() {
          this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
        }
        _configAfterMerge(t2) {
          return t2.defaultInterval = t2.interval, t2;
        }
        _addEventListeners() {
          this._config.keyboard && j.on(this._element, mt, (t2) => this._keydown(t2)), "hover" === this._config.pause && (j.on(this._element, pt, () => this.pause()), j.on(this._element, bt, () => this._maybeEnableCycle())), this._config.touch && at.isSupported() && this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
          for (const t3 of K.find(".carousel-item img", this._element)) j.on(t3, vt, (t4) => t4.preventDefault());
          const t2 = { leftCallback: () => this._slide(this._directionToOrder(ut)), rightCallback: () => this._slide(this._directionToOrder(_t)), endCallback: () => {
            "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval));
          } };
          this._swipeHelper = new at(this._element, t2);
        }
        _keydown(t2) {
          if (/input|textarea/i.test(t2.target.tagName)) return;
          const e2 = $t[t2.key];
          e2 && (t2.preventDefault(), this._slide(this._directionToOrder(e2)));
        }
        _getItemIndex(t2) {
          return this._getItems().indexOf(t2);
        }
        _setActiveIndicatorElement(t2) {
          if (!this._indicatorsElement) return;
          const e2 = K.findOne(Ct, this._indicatorsElement);
          e2.classList.remove(Et), e2.removeAttribute("aria-current");
          const i2 = K.findOne(`[data-bs-slide-to="${t2}"]`, this._indicatorsElement);
          i2 && (i2.classList.add(Et), i2.setAttribute("aria-current", "true"));
        }
        _updateInterval() {
          const t2 = this._activeElement || this._getActive();
          if (!t2) return;
          const e2 = Number.parseInt(t2.getAttribute("data-bs-interval"), 10);
          this._config.interval = e2 || this._config.defaultInterval;
        }
        _slide(t2, e2 = null) {
          if (this._isSliding) return;
          const i2 = this._getActive(), s2 = t2 === ht, n2 = e2 || w(this._getItems(), i2, s2, this._config.wrap);
          if (n2 === i2) return;
          const o2 = this._getItemIndex(n2), r2 = (e3) => j.trigger(this._element, e3, { relatedTarget: n2, direction: this._orderToDirection(t2), from: this._getItemIndex(i2), to: o2 });
          if (r2(gt).defaultPrevented) return;
          if (!i2 || !n2) return;
          const a2 = Boolean(this._interval);
          this.pause(), this._isSliding = true, this._setActiveIndicatorElement(o2), this._activeElement = n2;
          const l2 = s2 ? "carousel-item-start" : "carousel-item-end", c2 = s2 ? "carousel-item-next" : "carousel-item-prev";
          n2.classList.add(c2), g(n2), i2.classList.add(l2), n2.classList.add(l2), this._queueCallback(() => {
            n2.classList.remove(l2, c2), n2.classList.add(Et), i2.classList.remove(Et, c2, l2), this._isSliding = false, r2(ft);
          }, i2, this._isAnimated()), a2 && this.cycle();
        }
        _isAnimated() {
          return this._element.classList.contains("slide");
        }
        _getActive() {
          return K.findOne(kt, this._element);
        }
        _getItems() {
          return K.find(Tt, this._element);
        }
        _clearInterval() {
          this._interval && (clearInterval(this._interval), this._interval = null);
        }
        _directionToOrder(t2) {
          return p() ? t2 === ut ? dt : ht : t2 === ut ? ht : dt;
        }
        _orderToDirection(t2) {
          return p() ? t2 === dt ? ut : _t : t2 === dt ? _t : ut;
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = Ot.getOrCreateInstance(this, t2);
            if ("number" != typeof t2) {
              if ("string" == typeof t2) {
                if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
                e2[t2]();
              }
            } else e2.to(t2);
          });
        }
      }
      j.on(document, wt, "[data-bs-slide], [data-bs-slide-to]", function(t2) {
        const e2 = K.getElementFromSelector(this);
        if (!e2 || !e2.classList.contains(At)) return;
        t2.preventDefault();
        const i2 = Ot.getOrCreateInstance(e2), s2 = this.getAttribute("data-bs-slide-to");
        return s2 ? (i2.to(s2), void i2._maybeEnableCycle()) : "next" === B.getDataAttribute(this, "slide") ? (i2.next(), void i2._maybeEnableCycle()) : (i2.prev(), void i2._maybeEnableCycle());
      }), j.on(window, yt, () => {
        const t2 = K.find('[data-bs-ride="carousel"]');
        for (const e2 of t2) Ot.getOrCreateInstance(e2);
      }), b(Ot);
      const It = ".bs.collapse", Dt = `show${It}`, Nt = `shown${It}`, Pt = `hide${It}`, xt = `hidden${It}`, Mt = `click${It}.data-api`, jt = "show", Ft = "collapse", zt = "collapsing", Ht = `:scope .${Ft} .${Ft}`, Bt = '[data-bs-toggle="collapse"]', qt = { parent: null, toggle: true }, Wt = { parent: "(null|element)", toggle: "boolean" };
      class Rt extends W {
        constructor(t2, e2) {
          super(t2, e2), this._isTransitioning = false, this._triggerArray = [];
          const i2 = K.find(Bt);
          for (const t3 of i2) {
            const e3 = K.getSelectorFromElement(t3), i3 = K.find(e3).filter((t4) => t4 === this._element);
            null !== e3 && i3.length && this._triggerArray.push(t3);
          }
          this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
        }
        static get Default() {
          return qt;
        }
        static get DefaultType() {
          return Wt;
        }
        static get NAME() {
          return "collapse";
        }
        toggle() {
          this._isShown() ? this.hide() : this.show();
        }
        show() {
          if (this._isTransitioning || this._isShown()) return;
          let t2 = [];
          if (this._config.parent && (t2 = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t3) => t3 !== this._element).map((t3) => Rt.getOrCreateInstance(t3, { toggle: false }))), t2.length && t2[0]._isTransitioning) return;
          if (j.trigger(this._element, Dt).defaultPrevented) return;
          for (const e3 of t2) e3.hide();
          const e2 = this._getDimension();
          this._element.classList.remove(Ft), this._element.classList.add(zt), this._element.style[e2] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
          const i2 = `scroll${e2[0].toUpperCase() + e2.slice(1)}`;
          this._queueCallback(() => {
            this._isTransitioning = false, this._element.classList.remove(zt), this._element.classList.add(Ft, jt), this._element.style[e2] = "", j.trigger(this._element, Nt);
          }, this._element, true), this._element.style[e2] = `${this._element[i2]}px`;
        }
        hide() {
          if (this._isTransitioning || !this._isShown()) return;
          if (j.trigger(this._element, Pt).defaultPrevented) return;
          const t2 = this._getDimension();
          this._element.style[t2] = `${this._element.getBoundingClientRect()[t2]}px`, g(this._element), this._element.classList.add(zt), this._element.classList.remove(Ft, jt);
          for (const t3 of this._triggerArray) {
            const e2 = K.getElementFromSelector(t3);
            e2 && !this._isShown(e2) && this._addAriaAndCollapsedClass([t3], false);
          }
          this._isTransitioning = true, this._element.style[t2] = "", this._queueCallback(() => {
            this._isTransitioning = false, this._element.classList.remove(zt), this._element.classList.add(Ft), j.trigger(this._element, xt);
          }, this._element, true);
        }
        _isShown(t2 = this._element) {
          return t2.classList.contains(jt);
        }
        _configAfterMerge(t2) {
          return t2.toggle = Boolean(t2.toggle), t2.parent = c(t2.parent), t2;
        }
        _getDimension() {
          return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
        }
        _initializeChildren() {
          if (!this._config.parent) return;
          const t2 = this._getFirstLevelChildren(Bt);
          for (const e2 of t2) {
            const t3 = K.getElementFromSelector(e2);
            t3 && this._addAriaAndCollapsedClass([e2], this._isShown(t3));
          }
        }
        _getFirstLevelChildren(t2) {
          const e2 = K.find(Ht, this._config.parent);
          return K.find(t2, this._config.parent).filter((t3) => !e2.includes(t3));
        }
        _addAriaAndCollapsedClass(t2, e2) {
          if (t2.length) for (const i2 of t2) i2.classList.toggle("collapsed", !e2), i2.setAttribute("aria-expanded", e2);
        }
        static jQueryInterface(t2) {
          const e2 = {};
          return "string" == typeof t2 && /show|hide/.test(t2) && (e2.toggle = false), this.each(function() {
            const i2 = Rt.getOrCreateInstance(this, e2);
            if ("string" == typeof t2) {
              if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
              i2[t2]();
            }
          });
        }
      }
      j.on(document, Mt, Bt, function(t2) {
        ("A" === t2.target.tagName || t2.delegateTarget && "A" === t2.delegateTarget.tagName) && t2.preventDefault();
        for (const t3 of K.getMultipleElementsFromSelector(this)) Rt.getOrCreateInstance(t3, { toggle: false }).toggle();
      }), b(Rt);
      const Kt = "dropdown", Vt = ".bs.dropdown", Qt = ".data-api", Xt = "ArrowUp", Yt = "ArrowDown", Ut = `hide${Vt}`, Gt = `hidden${Vt}`, Jt = `show${Vt}`, Zt = `shown${Vt}`, te = `click${Vt}${Qt}`, ee = `keydown${Vt}${Qt}`, ie = `keyup${Vt}${Qt}`, se = "show", ne = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', oe = `${ne}.${se}`, re = ".dropdown-menu", ae = p() ? "top-end" : "top-start", le = p() ? "top-start" : "top-end", ce = p() ? "bottom-end" : "bottom-start", he = p() ? "bottom-start" : "bottom-end", de = p() ? "left-start" : "right-start", ue = p() ? "right-start" : "left-start", _e = { autoClose: true, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" }, ge = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
      class fe extends W {
        constructor(t2, e2) {
          super(t2, e2), this._popper = null, this._parent = this._element.parentNode, this._menu = K.next(this._element, re)[0] || K.prev(this._element, re)[0] || K.findOne(re, this._parent), this._inNavbar = this._detectNavbar();
        }
        static get Default() {
          return _e;
        }
        static get DefaultType() {
          return ge;
        }
        static get NAME() {
          return Kt;
        }
        toggle() {
          return this._isShown() ? this.hide() : this.show();
        }
        show() {
          if (d(this._element) || this._isShown()) return;
          const t2 = { relatedTarget: this._element };
          if (!j.trigger(this._element, Jt, t2).defaultPrevented) {
            if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav")) for (const t3 of [].concat(...document.body.children)) j.on(t3, "mouseover", _);
            this._element.focus(), this._element.setAttribute("aria-expanded", true), this._menu.classList.add(se), this._element.classList.add(se), j.trigger(this._element, Zt, t2);
          }
        }
        hide() {
          if (d(this._element) || !this._isShown()) return;
          const t2 = { relatedTarget: this._element };
          this._completeHide(t2);
        }
        dispose() {
          this._popper && this._popper.destroy(), super.dispose();
        }
        update() {
          this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
        }
        _completeHide(t2) {
          if (!j.trigger(this._element, Ut, t2).defaultPrevented) {
            if ("ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) j.off(t3, "mouseover", _);
            this._popper && this._popper.destroy(), this._menu.classList.remove(se), this._element.classList.remove(se), this._element.setAttribute("aria-expanded", "false"), B.removeDataAttribute(this._menu, "popper"), j.trigger(this._element, Gt, t2);
          }
        }
        _getConfig(t2) {
          if ("object" == typeof (t2 = super._getConfig(t2)).reference && !l(t2.reference) && "function" != typeof t2.reference.getBoundingClientRect) throw new TypeError(`${Kt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
          return t2;
        }
        _createPopper() {
          if (void 0 === i) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
          let t2 = this._element;
          "parent" === this._config.reference ? t2 = this._parent : l(this._config.reference) ? t2 = c(this._config.reference) : "object" == typeof this._config.reference && (t2 = this._config.reference);
          const e2 = this._getPopperConfig();
          this._popper = i.createPopper(t2, this._menu, e2);
        }
        _isShown() {
          return this._menu.classList.contains(se);
        }
        _getPlacement() {
          const t2 = this._parent;
          if (t2.classList.contains("dropend")) return de;
          if (t2.classList.contains("dropstart")) return ue;
          if (t2.classList.contains("dropup-center")) return "top";
          if (t2.classList.contains("dropdown-center")) return "bottom";
          const e2 = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
          return t2.classList.contains("dropup") ? e2 ? le : ae : e2 ? he : ce;
        }
        _detectNavbar() {
          return null !== this._element.closest(".navbar");
        }
        _getOffset() {
          const { offset: t2 } = this._config;
          return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
        }
        _getPopperConfig() {
          const t2 = { placement: this._getPlacement(), modifiers: [{ name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "offset", options: { offset: this._getOffset() } }] };
          return (this._inNavbar || "static" === this._config.display) && (B.setDataAttribute(this._menu, "popper", "static"), t2.modifiers = [{ name: "applyStyles", enabled: false }]), { ...t2, ...v(this._config.popperConfig, [t2]) };
        }
        _selectMenuItem({ key: t2, target: e2 }) {
          const i2 = K.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t3) => h(t3));
          i2.length && w(i2, e2, t2 === Yt, !i2.includes(e2)).focus();
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = fe.getOrCreateInstance(this, t2);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
              e2[t2]();
            }
          });
        }
        static clearMenus(t2) {
          if (2 === t2.button || "keyup" === t2.type && "Tab" !== t2.key) return;
          const e2 = K.find(oe);
          for (const i2 of e2) {
            const e3 = fe.getInstance(i2);
            if (!e3 || false === e3._config.autoClose) continue;
            const s2 = t2.composedPath(), n2 = s2.includes(e3._menu);
            if (s2.includes(e3._element) || "inside" === e3._config.autoClose && !n2 || "outside" === e3._config.autoClose && n2) continue;
            if (e3._menu.contains(t2.target) && ("keyup" === t2.type && "Tab" === t2.key || /input|select|option|textarea|form/i.test(t2.target.tagName))) continue;
            const o2 = { relatedTarget: e3._element };
            "click" === t2.type && (o2.clickEvent = t2), e3._completeHide(o2);
          }
        }
        static dataApiKeydownHandler(t2) {
          const e2 = /input|textarea/i.test(t2.target.tagName), i2 = "Escape" === t2.key, s2 = [Xt, Yt].includes(t2.key);
          if (!s2 && !i2) return;
          if (e2 && !i2) return;
          t2.preventDefault();
          const n2 = this.matches(ne) ? this : K.prev(this, ne)[0] || K.next(this, ne)[0] || K.findOne(ne, t2.delegateTarget.parentNode), o2 = fe.getOrCreateInstance(n2);
          if (s2) return t2.stopPropagation(), o2.show(), void o2._selectMenuItem(t2);
          o2._isShown() && (t2.stopPropagation(), o2.hide(), n2.focus());
        }
      }
      j.on(document, ee, ne, fe.dataApiKeydownHandler), j.on(document, ee, re, fe.dataApiKeydownHandler), j.on(document, te, fe.clearMenus), j.on(document, ie, fe.clearMenus), j.on(document, te, ne, function(t2) {
        t2.preventDefault(), fe.getOrCreateInstance(this).toggle();
      }), b(fe);
      const me = "backdrop", pe = "show", be = `mousedown.bs.${me}`, ve = { className: "modal-backdrop", clickCallback: null, isAnimated: false, isVisible: true, rootElement: "body" }, ye = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
      class we extends q {
        constructor(t2) {
          super(), this._config = this._getConfig(t2), this._isAppended = false, this._element = null;
        }
        static get Default() {
          return ve;
        }
        static get DefaultType() {
          return ye;
        }
        static get NAME() {
          return me;
        }
        show(t2) {
          if (!this._config.isVisible) return void v(t2);
          this._append();
          const e2 = this._getElement();
          this._config.isAnimated && g(e2), e2.classList.add(pe), this._emulateAnimation(() => {
            v(t2);
          });
        }
        hide(t2) {
          this._config.isVisible ? (this._getElement().classList.remove(pe), this._emulateAnimation(() => {
            this.dispose(), v(t2);
          })) : v(t2);
        }
        dispose() {
          this._isAppended && (j.off(this._element, be), this._element.remove(), this._isAppended = false);
        }
        _getElement() {
          if (!this._element) {
            const t2 = document.createElement("div");
            t2.className = this._config.className, this._config.isAnimated && t2.classList.add("fade"), this._element = t2;
          }
          return this._element;
        }
        _configAfterMerge(t2) {
          return t2.rootElement = c(t2.rootElement), t2;
        }
        _append() {
          if (this._isAppended) return;
          const t2 = this._getElement();
          this._config.rootElement.append(t2), j.on(t2, be, () => {
            v(this._config.clickCallback);
          }), this._isAppended = true;
        }
        _emulateAnimation(t2) {
          y(t2, this._getElement(), this._config.isAnimated);
        }
      }
      const Ae = ".bs.focustrap", Ee = `focusin${Ae}`, Ce = `keydown.tab${Ae}`, Te = "backward", ke = { autofocus: true, trapElement: null }, $e = { autofocus: "boolean", trapElement: "element" };
      class Se extends q {
        constructor(t2) {
          super(), this._config = this._getConfig(t2), this._isActive = false, this._lastTabNavDirection = null;
        }
        static get Default() {
          return ke;
        }
        static get DefaultType() {
          return $e;
        }
        static get NAME() {
          return "focustrap";
        }
        activate() {
          this._isActive || (this._config.autofocus && this._config.trapElement.focus(), j.off(document, Ae), j.on(document, Ee, (t2) => this._handleFocusin(t2)), j.on(document, Ce, (t2) => this._handleKeydown(t2)), this._isActive = true);
        }
        deactivate() {
          this._isActive && (this._isActive = false, j.off(document, Ae));
        }
        _handleFocusin(t2) {
          const { trapElement: e2 } = this._config;
          if (t2.target === document || t2.target === e2 || e2.contains(t2.target)) return;
          const i2 = K.focusableChildren(e2);
          0 === i2.length ? e2.focus() : this._lastTabNavDirection === Te ? i2[i2.length - 1].focus() : i2[0].focus();
        }
        _handleKeydown(t2) {
          "Tab" === t2.key && (this._lastTabNavDirection = t2.shiftKey ? Te : "forward");
        }
      }
      const Le = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Oe = ".sticky-top", Ie = "padding-right", De = "margin-right";
      class Ne {
        constructor() {
          this._element = document.body;
        }
        getWidth() {
          const t2 = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - t2);
        }
        hide() {
          const t2 = this.getWidth();
          this._disableOverFlow(), this._setElementAttributes(this._element, Ie, (e2) => e2 + t2), this._setElementAttributes(Le, Ie, (e2) => e2 + t2), this._setElementAttributes(Oe, De, (e2) => e2 - t2);
        }
        reset() {
          this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Ie), this._resetElementAttributes(Le, Ie), this._resetElementAttributes(Oe, De);
        }
        isOverflowing() {
          return this.getWidth() > 0;
        }
        _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
        }
        _setElementAttributes(t2, e2, i2) {
          const s2 = this.getWidth();
          this._applyManipulationCallback(t2, (t3) => {
            if (t3 !== this._element && window.innerWidth > t3.clientWidth + s2) return;
            this._saveInitialAttribute(t3, e2);
            const n2 = window.getComputedStyle(t3).getPropertyValue(e2);
            t3.style.setProperty(e2, `${i2(Number.parseFloat(n2))}px`);
          });
        }
        _saveInitialAttribute(t2, e2) {
          const i2 = t2.style.getPropertyValue(e2);
          i2 && B.setDataAttribute(t2, e2, i2);
        }
        _resetElementAttributes(t2, e2) {
          this._applyManipulationCallback(t2, (t3) => {
            const i2 = B.getDataAttribute(t3, e2);
            null !== i2 ? (B.removeDataAttribute(t3, e2), t3.style.setProperty(e2, i2)) : t3.style.removeProperty(e2);
          });
        }
        _applyManipulationCallback(t2, e2) {
          if (l(t2)) e2(t2);
          else for (const i2 of K.find(t2, this._element)) e2(i2);
        }
      }
      const Pe = ".bs.modal", xe = `hide${Pe}`, Me = `hidePrevented${Pe}`, je = `hidden${Pe}`, Fe = `show${Pe}`, ze = `shown${Pe}`, He = `resize${Pe}`, Be = `click.dismiss${Pe}`, qe = `mousedown.dismiss${Pe}`, We = `keydown.dismiss${Pe}`, Re = `click${Pe}.data-api`, Ke = "modal-open", Ve = "show", Qe = "modal-static", Xe = { backdrop: true, focus: true, keyboard: true }, Ye = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
      class Ue extends W {
        constructor(t2, e2) {
          super(t2, e2), this._dialog = K.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = false, this._isTransitioning = false, this._scrollBar = new Ne(), this._addEventListeners();
        }
        static get Default() {
          return Xe;
        }
        static get DefaultType() {
          return Ye;
        }
        static get NAME() {
          return "modal";
        }
        toggle(t2) {
          return this._isShown ? this.hide() : this.show(t2);
        }
        show(t2) {
          this._isShown || this._isTransitioning || j.trigger(this._element, Fe, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._isTransitioning = true, this._scrollBar.hide(), document.body.classList.add(Ke), this._adjustDialog(), this._backdrop.show(() => this._showElement(t2)));
        }
        hide() {
          this._isShown && !this._isTransitioning && (j.trigger(this._element, xe).defaultPrevented || (this._isShown = false, this._isTransitioning = true, this._focustrap.deactivate(), this._element.classList.remove(Ve), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
        }
        dispose() {
          j.off(window, Pe), j.off(this._dialog, Pe), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
        }
        handleUpdate() {
          this._adjustDialog();
        }
        _initializeBackDrop() {
          return new we({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
        }
        _initializeFocusTrap() {
          return new Se({ trapElement: this._element });
        }
        _showElement(t2) {
          document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
          const e2 = K.findOne(".modal-body", this._dialog);
          e2 && (e2.scrollTop = 0), g(this._element), this._element.classList.add(Ve), this._queueCallback(() => {
            this._config.focus && this._focustrap.activate(), this._isTransitioning = false, j.trigger(this._element, ze, { relatedTarget: t2 });
          }, this._dialog, this._isAnimated());
        }
        _addEventListeners() {
          j.on(this._element, We, (t2) => {
            "Escape" === t2.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
          }), j.on(window, He, () => {
            this._isShown && !this._isTransitioning && this._adjustDialog();
          }), j.on(this._element, qe, (t2) => {
            j.one(this._element, Be, (e2) => {
              this._element === t2.target && this._element === e2.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition());
            });
          });
        }
        _hideModal() {
          this._element.style.display = "none", this._element.setAttribute("aria-hidden", true), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = false, this._backdrop.hide(() => {
            document.body.classList.remove(Ke), this._resetAdjustments(), this._scrollBar.reset(), j.trigger(this._element, je);
          });
        }
        _isAnimated() {
          return this._element.classList.contains("fade");
        }
        _triggerBackdropTransition() {
          if (j.trigger(this._element, Me).defaultPrevented) return;
          const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._element.style.overflowY;
          "hidden" === e2 || this._element.classList.contains(Qe) || (t2 || (this._element.style.overflowY = "hidden"), this._element.classList.add(Qe), this._queueCallback(() => {
            this._element.classList.remove(Qe), this._queueCallback(() => {
              this._element.style.overflowY = e2;
            }, this._dialog);
          }, this._dialog), this._element.focus());
        }
        _adjustDialog() {
          const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._scrollBar.getWidth(), i2 = e2 > 0;
          if (i2 && !t2) {
            const t3 = p() ? "paddingLeft" : "paddingRight";
            this._element.style[t3] = `${e2}px`;
          }
          if (!i2 && t2) {
            const t3 = p() ? "paddingRight" : "paddingLeft";
            this._element.style[t3] = `${e2}px`;
          }
        }
        _resetAdjustments() {
          this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
        }
        static jQueryInterface(t2, e2) {
          return this.each(function() {
            const i2 = Ue.getOrCreateInstance(this, t2);
            if ("string" == typeof t2) {
              if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
              i2[t2](e2);
            }
          });
        }
      }
      j.on(document, Re, '[data-bs-toggle="modal"]', function(t2) {
        const e2 = K.getElementFromSelector(this);
        ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), j.one(e2, Fe, (t3) => {
          t3.defaultPrevented || j.one(e2, je, () => {
            h(this) && this.focus();
          });
        });
        const i2 = K.findOne(".modal.show");
        i2 && Ue.getInstance(i2).hide(), Ue.getOrCreateInstance(e2).toggle(this);
      }), V(Ue), b(Ue);
      const Ge = ".bs.offcanvas", Je = ".data-api", Ze = `load${Ge}${Je}`, ti = "show", ei = "showing", ii = "hiding", si = ".offcanvas.show", ni = `show${Ge}`, oi = `shown${Ge}`, ri = `hide${Ge}`, ai = `hidePrevented${Ge}`, li = `hidden${Ge}`, ci = `resize${Ge}`, hi = `click${Ge}${Je}`, di = `keydown.dismiss${Ge}`, ui = { backdrop: true, keyboard: true, scroll: false }, _i = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
      class gi extends W {
        constructor(t2, e2) {
          super(t2, e2), this._isShown = false, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
        }
        static get Default() {
          return ui;
        }
        static get DefaultType() {
          return _i;
        }
        static get NAME() {
          return "offcanvas";
        }
        toggle(t2) {
          return this._isShown ? this.hide() : this.show(t2);
        }
        show(t2) {
          this._isShown || j.trigger(this._element, ni, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._backdrop.show(), this._config.scroll || new Ne().hide(), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.classList.add(ei), this._queueCallback(() => {
            this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(ti), this._element.classList.remove(ei), j.trigger(this._element, oi, { relatedTarget: t2 });
          }, this._element, true));
        }
        hide() {
          this._isShown && (j.trigger(this._element, ri).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = false, this._element.classList.add(ii), this._backdrop.hide(), this._queueCallback(() => {
            this._element.classList.remove(ti, ii), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Ne().reset(), j.trigger(this._element, li);
          }, this._element, true)));
        }
        dispose() {
          this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
        }
        _initializeBackDrop() {
          const t2 = Boolean(this._config.backdrop);
          return new we({ className: "offcanvas-backdrop", isVisible: t2, isAnimated: true, rootElement: this._element.parentNode, clickCallback: t2 ? () => {
            "static" !== this._config.backdrop ? this.hide() : j.trigger(this._element, ai);
          } : null });
        }
        _initializeFocusTrap() {
          return new Se({ trapElement: this._element });
        }
        _addEventListeners() {
          j.on(this._element, di, (t2) => {
            "Escape" === t2.key && (this._config.keyboard ? this.hide() : j.trigger(this._element, ai));
          });
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = gi.getOrCreateInstance(this, t2);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
              e2[t2](this);
            }
          });
        }
      }
      j.on(document, hi, '[data-bs-toggle="offcanvas"]', function(t2) {
        const e2 = K.getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName) && t2.preventDefault(), d(this)) return;
        j.one(e2, li, () => {
          h(this) && this.focus();
        });
        const i2 = K.findOne(si);
        i2 && i2 !== e2 && gi.getInstance(i2).hide(), gi.getOrCreateInstance(e2).toggle(this);
      }), j.on(window, Ze, () => {
        for (const t2 of K.find(si)) gi.getOrCreateInstance(t2).show();
      }), j.on(window, ci, () => {
        for (const t2 of K.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t2).position && gi.getOrCreateInstance(t2).hide();
      }), V(gi), b(gi);
      const fi = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], dd: [], div: [], dl: [], dt: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }, mi = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), pi = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, bi = (t2, e2) => {
        const i2 = t2.nodeName.toLowerCase();
        return e2.includes(i2) ? !mi.has(i2) || Boolean(pi.test(t2.nodeValue)) : e2.filter((t3) => t3 instanceof RegExp).some((t3) => t3.test(i2));
      }, vi = { allowList: fi, content: {}, extraClass: "", html: false, sanitize: true, sanitizeFn: null, template: "<div></div>" }, yi = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" }, wi = { entry: "(string|element|function|null)", selector: "(string|element)" };
      class Ai extends q {
        constructor(t2) {
          super(), this._config = this._getConfig(t2);
        }
        static get Default() {
          return vi;
        }
        static get DefaultType() {
          return yi;
        }
        static get NAME() {
          return "TemplateFactory";
        }
        getContent() {
          return Object.values(this._config.content).map((t2) => this._resolvePossibleFunction(t2)).filter(Boolean);
        }
        hasContent() {
          return this.getContent().length > 0;
        }
        changeContent(t2) {
          return this._checkContent(t2), this._config.content = { ...this._config.content, ...t2 }, this;
        }
        toHtml() {
          const t2 = document.createElement("div");
          t2.innerHTML = this._maybeSanitize(this._config.template);
          for (const [e3, i3] of Object.entries(this._config.content)) this._setContent(t2, i3, e3);
          const e2 = t2.children[0], i2 = this._resolvePossibleFunction(this._config.extraClass);
          return i2 && e2.classList.add(...i2.split(" ")), e2;
        }
        _typeCheckConfig(t2) {
          super._typeCheckConfig(t2), this._checkContent(t2.content);
        }
        _checkContent(t2) {
          for (const [e2, i2] of Object.entries(t2)) super._typeCheckConfig({ selector: e2, entry: i2 }, wi);
        }
        _setContent(t2, e2, i2) {
          const s2 = K.findOne(i2, t2);
          s2 && ((e2 = this._resolvePossibleFunction(e2)) ? l(e2) ? this._putElementInTemplate(c(e2), s2) : this._config.html ? s2.innerHTML = this._maybeSanitize(e2) : s2.textContent = e2 : s2.remove());
        }
        _maybeSanitize(t2) {
          return this._config.sanitize ? function(t3, e2, i2) {
            if (!t3.length) return t3;
            if (i2 && "function" == typeof i2) return i2(t3);
            const s2 = new window.DOMParser().parseFromString(t3, "text/html"), n2 = [].concat(...s2.body.querySelectorAll("*"));
            for (const t4 of n2) {
              const i3 = t4.nodeName.toLowerCase();
              if (!Object.keys(e2).includes(i3)) {
                t4.remove();
                continue;
              }
              const s3 = [].concat(...t4.attributes), n3 = [].concat(e2["*"] || [], e2[i3] || []);
              for (const e3 of s3) bi(e3, n3) || t4.removeAttribute(e3.nodeName);
            }
            return s2.body.innerHTML;
          }(t2, this._config.allowList, this._config.sanitizeFn) : t2;
        }
        _resolvePossibleFunction(t2) {
          return v(t2, [this]);
        }
        _putElementInTemplate(t2, e2) {
          if (this._config.html) return e2.innerHTML = "", void e2.append(t2);
          e2.textContent = t2.textContent;
        }
      }
      const Ei = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Ci = "fade", Ti = "show", ki = ".modal", $i = "hide.bs.modal", Si = "hover", Li = "focus", Oi = { AUTO: "auto", TOP: "top", RIGHT: p() ? "left" : "right", BOTTOM: "bottom", LEFT: p() ? "right" : "left" }, Ii = { allowList: fi, animation: true, boundary: "clippingParents", container: false, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: false, offset: [0, 6], placement: "top", popperConfig: null, sanitize: true, sanitizeFn: null, selector: false, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" }, Di = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
      class Ni extends W {
        constructor(t2, e2) {
          if (void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
          super(t2, e2), this._isEnabled = true, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
        }
        static get Default() {
          return Ii;
        }
        static get DefaultType() {
          return Di;
        }
        static get NAME() {
          return "tooltip";
        }
        enable() {
          this._isEnabled = true;
        }
        disable() {
          this._isEnabled = false;
        }
        toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        }
        toggle() {
          this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter());
        }
        dispose() {
          clearTimeout(this._timeout), j.off(this._element.closest(ki), $i, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
        }
        show() {
          if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
          if (!this._isWithContent() || !this._isEnabled) return;
          const t2 = j.trigger(this._element, this.constructor.eventName("show")), e2 = (u(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
          if (t2.defaultPrevented || !e2) return;
          this._disposePopper();
          const i2 = this._getTipElement();
          this._element.setAttribute("aria-describedby", i2.getAttribute("id"));
          const { container: s2 } = this._config;
          if (this._element.ownerDocument.documentElement.contains(this.tip) || (s2.append(i2), j.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i2), i2.classList.add(Ti), "ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) j.on(t3, "mouseover", _);
          this._queueCallback(() => {
            j.trigger(this._element, this.constructor.eventName("shown")), false === this._isHovered && this._leave(), this._isHovered = false;
          }, this.tip, this._isAnimated());
        }
        hide() {
          if (this._isShown() && !j.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
            if (this._getTipElement().classList.remove(Ti), "ontouchstart" in document.documentElement) for (const t2 of [].concat(...document.body.children)) j.off(t2, "mouseover", _);
            this._activeTrigger.click = false, this._activeTrigger[Li] = false, this._activeTrigger[Si] = false, this._isHovered = null, this._queueCallback(() => {
              this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), j.trigger(this._element, this.constructor.eventName("hidden")));
            }, this.tip, this._isAnimated());
          }
        }
        update() {
          this._popper && this._popper.update();
        }
        _isWithContent() {
          return Boolean(this._getTitle());
        }
        _getTipElement() {
          return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
        }
        _createTipElement(t2) {
          const e2 = this._getTemplateFactory(t2).toHtml();
          if (!e2) return null;
          e2.classList.remove(Ci, Ti), e2.classList.add(`bs-${this.constructor.NAME}-auto`);
          const i2 = ((t3) => {
            do {
              t3 += Math.floor(1e6 * Math.random());
            } while (document.getElementById(t3));
            return t3;
          })(this.constructor.NAME).toString();
          return e2.setAttribute("id", i2), this._isAnimated() && e2.classList.add(Ci), e2;
        }
        setContent(t2) {
          this._newContent = t2, this._isShown() && (this._disposePopper(), this.show());
        }
        _getTemplateFactory(t2) {
          return this._templateFactory ? this._templateFactory.changeContent(t2) : this._templateFactory = new Ai({ ...this._config, content: t2, extraClass: this._resolvePossibleFunction(this._config.customClass) }), this._templateFactory;
        }
        _getContentForTemplate() {
          return { ".tooltip-inner": this._getTitle() };
        }
        _getTitle() {
          return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
        }
        _initializeOnDelegatedTarget(t2) {
          return this.constructor.getOrCreateInstance(t2.delegateTarget, this._getDelegateConfig());
        }
        _isAnimated() {
          return this._config.animation || this.tip && this.tip.classList.contains(Ci);
        }
        _isShown() {
          return this.tip && this.tip.classList.contains(Ti);
        }
        _createPopper(t2) {
          const e2 = v(this._config.placement, [this, t2, this._element]), s2 = Oi[e2.toUpperCase()];
          return i.createPopper(this._element, t2, this._getPopperConfig(s2));
        }
        _getOffset() {
          const { offset: t2 } = this._config;
          return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
        }
        _resolvePossibleFunction(t2) {
          return v(t2, [this._element]);
        }
        _getPopperConfig(t2) {
          const e2 = { placement: t2, modifiers: [{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: "offset", options: { offset: this._getOffset() } }, { name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } }, { name: "preSetPlacement", enabled: true, phase: "beforeMain", fn: (t3) => {
            this._getTipElement().setAttribute("data-popper-placement", t3.state.placement);
          } }] };
          return { ...e2, ...v(this._config.popperConfig, [e2]) };
        }
        _setListeners() {
          const t2 = this._config.trigger.split(" ");
          for (const e2 of t2) if ("click" === e2) j.on(this._element, this.constructor.eventName("click"), this._config.selector, (t3) => {
            this._initializeOnDelegatedTarget(t3).toggle();
          });
          else if ("manual" !== e2) {
            const t3 = e2 === Si ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"), i2 = e2 === Si ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
            j.on(this._element, t3, this._config.selector, (t4) => {
              const e3 = this._initializeOnDelegatedTarget(t4);
              e3._activeTrigger["focusin" === t4.type ? Li : Si] = true, e3._enter();
            }), j.on(this._element, i2, this._config.selector, (t4) => {
              const e3 = this._initializeOnDelegatedTarget(t4);
              e3._activeTrigger["focusout" === t4.type ? Li : Si] = e3._element.contains(t4.relatedTarget), e3._leave();
            });
          }
          this._hideModalHandler = () => {
            this._element && this.hide();
          }, j.on(this._element.closest(ki), $i, this._hideModalHandler);
        }
        _fixTitle() {
          const t2 = this._element.getAttribute("title");
          t2 && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t2), this._element.setAttribute("data-bs-original-title", t2), this._element.removeAttribute("title"));
        }
        _enter() {
          this._isShown() || this._isHovered ? this._isHovered = true : (this._isHovered = true, this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
        }
        _leave() {
          this._isWithActiveTrigger() || (this._isHovered = false, this._setTimeout(() => {
            this._isHovered || this.hide();
          }, this._config.delay.hide));
        }
        _setTimeout(t2, e2) {
          clearTimeout(this._timeout), this._timeout = setTimeout(t2, e2);
        }
        _isWithActiveTrigger() {
          return Object.values(this._activeTrigger).includes(true);
        }
        _getConfig(t2) {
          const e2 = B.getDataAttributes(this._element);
          for (const t3 of Object.keys(e2)) Ei.has(t3) && delete e2[t3];
          return t2 = { ...e2, ..."object" == typeof t2 && t2 ? t2 : {} }, t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
        }
        _configAfterMerge(t2) {
          return t2.container = false === t2.container ? document.body : c(t2.container), "number" == typeof t2.delay && (t2.delay = { show: t2.delay, hide: t2.delay }), "number" == typeof t2.title && (t2.title = t2.title.toString()), "number" == typeof t2.content && (t2.content = t2.content.toString()), t2;
        }
        _getDelegateConfig() {
          const t2 = {};
          for (const [e2, i2] of Object.entries(this._config)) this.constructor.Default[e2] !== i2 && (t2[e2] = i2);
          return t2.selector = false, t2.trigger = "manual", t2;
        }
        _disposePopper() {
          this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = Ni.getOrCreateInstance(this, t2);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
              e2[t2]();
            }
          });
        }
      }
      b(Ni);
      const Pi = { ...Ni.Default, content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" }, xi = { ...Ni.DefaultType, content: "(null|string|element|function)" };
      class Mi extends Ni {
        static get Default() {
          return Pi;
        }
        static get DefaultType() {
          return xi;
        }
        static get NAME() {
          return "popover";
        }
        _isWithContent() {
          return this._getTitle() || this._getContent();
        }
        _getContentForTemplate() {
          return { ".popover-header": this._getTitle(), ".popover-body": this._getContent() };
        }
        _getContent() {
          return this._resolvePossibleFunction(this._config.content);
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = Mi.getOrCreateInstance(this, t2);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
              e2[t2]();
            }
          });
        }
      }
      b(Mi);
      const ji = ".bs.scrollspy", Fi = `activate${ji}`, zi = `click${ji}`, Hi = `load${ji}.data-api`, Bi = "active", qi = "[href]", Wi = ".nav-link", Ri = `${Wi}, .nav-item > ${Wi}, .list-group-item`, Ki = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: false, target: null, threshold: [0.1, 0.5, 1] }, Vi = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
      class Qi extends W {
        constructor(t2, e2) {
          super(t2, e2), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh();
        }
        static get Default() {
          return Ki;
        }
        static get DefaultType() {
          return Vi;
        }
        static get NAME() {
          return "scrollspy";
        }
        refresh() {
          this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
          for (const t2 of this._observableSections.values()) this._observer.observe(t2);
        }
        dispose() {
          this._observer.disconnect(), super.dispose();
        }
        _configAfterMerge(t2) {
          return t2.target = c(t2.target) || document.body, t2.rootMargin = t2.offset ? `${t2.offset}px 0px -30%` : t2.rootMargin, "string" == typeof t2.threshold && (t2.threshold = t2.threshold.split(",").map((t3) => Number.parseFloat(t3))), t2;
        }
        _maybeEnableSmoothScroll() {
          this._config.smoothScroll && (j.off(this._config.target, zi), j.on(this._config.target, zi, qi, (t2) => {
            const e2 = this._observableSections.get(t2.target.hash);
            if (e2) {
              t2.preventDefault();
              const i2 = this._rootElement || window, s2 = e2.offsetTop - this._element.offsetTop;
              if (i2.scrollTo) return void i2.scrollTo({ top: s2, behavior: "smooth" });
              i2.scrollTop = s2;
            }
          }));
        }
        _getNewObserver() {
          const t2 = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
          return new IntersectionObserver((t3) => this._observerCallback(t3), t2);
        }
        _observerCallback(t2) {
          const e2 = (t3) => this._targetLinks.get(`#${t3.target.id}`), i2 = (t3) => {
            this._previousScrollData.visibleEntryTop = t3.target.offsetTop, this._process(e2(t3));
          }, s2 = (this._rootElement || document.documentElement).scrollTop, n2 = s2 >= this._previousScrollData.parentScrollTop;
          this._previousScrollData.parentScrollTop = s2;
          for (const o2 of t2) {
            if (!o2.isIntersecting) {
              this._activeTarget = null, this._clearActiveClass(e2(o2));
              continue;
            }
            const t3 = o2.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (n2 && t3) {
              if (i2(o2), !s2) return;
            } else n2 || t3 || i2(o2);
          }
        }
        _initializeTargetsAndObservables() {
          this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
          const t2 = K.find(qi, this._config.target);
          for (const e2 of t2) {
            if (!e2.hash || d(e2)) continue;
            const t3 = K.findOne(decodeURI(e2.hash), this._element);
            h(t3) && (this._targetLinks.set(decodeURI(e2.hash), e2), this._observableSections.set(e2.hash, t3));
          }
        }
        _process(t2) {
          this._activeTarget !== t2 && (this._clearActiveClass(this._config.target), this._activeTarget = t2, t2.classList.add(Bi), this._activateParents(t2), j.trigger(this._element, Fi, { relatedTarget: t2 }));
        }
        _activateParents(t2) {
          if (t2.classList.contains("dropdown-item")) K.findOne(".dropdown-toggle", t2.closest(".dropdown")).classList.add(Bi);
          else for (const e2 of K.parents(t2, ".nav, .list-group")) for (const t3 of K.prev(e2, Ri)) t3.classList.add(Bi);
        }
        _clearActiveClass(t2) {
          t2.classList.remove(Bi);
          const e2 = K.find(`${qi}.${Bi}`, t2);
          for (const t3 of e2) t3.classList.remove(Bi);
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = Qi.getOrCreateInstance(this, t2);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
              e2[t2]();
            }
          });
        }
      }
      j.on(window, Hi, () => {
        for (const t2 of K.find('[data-bs-spy="scroll"]')) Qi.getOrCreateInstance(t2);
      }), b(Qi);
      const Xi = ".bs.tab", Yi = `hide${Xi}`, Ui = `hidden${Xi}`, Gi = `show${Xi}`, Ji = `shown${Xi}`, Zi = `click${Xi}`, ts = `keydown${Xi}`, es = `load${Xi}`, is = "ArrowLeft", ss = "ArrowRight", ns = "ArrowUp", os = "ArrowDown", rs = "Home", as = "End", ls = "active", cs = "fade", hs = "show", ds = ".dropdown-toggle", us = `:not(${ds})`, _s = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', gs = `.nav-link${us}, .list-group-item${us}, [role="tab"]${us}, ${_s}`, fs = `.${ls}[data-bs-toggle="tab"], .${ls}[data-bs-toggle="pill"], .${ls}[data-bs-toggle="list"]`;
      class ms extends W {
        constructor(t2) {
          super(t2), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), j.on(this._element, ts, (t3) => this._keydown(t3)));
        }
        static get NAME() {
          return "tab";
        }
        show() {
          const t2 = this._element;
          if (this._elemIsActive(t2)) return;
          const e2 = this._getActiveElem(), i2 = e2 ? j.trigger(e2, Yi, { relatedTarget: t2 }) : null;
          j.trigger(t2, Gi, { relatedTarget: e2 }).defaultPrevented || i2 && i2.defaultPrevented || (this._deactivate(e2, t2), this._activate(t2, e2));
        }
        _activate(t2, e2) {
          t2 && (t2.classList.add(ls), this._activate(K.getElementFromSelector(t2)), this._queueCallback(() => {
            "tab" === t2.getAttribute("role") ? (t2.removeAttribute("tabindex"), t2.setAttribute("aria-selected", true), this._toggleDropDown(t2, true), j.trigger(t2, Ji, { relatedTarget: e2 })) : t2.classList.add(hs);
          }, t2, t2.classList.contains(cs)));
        }
        _deactivate(t2, e2) {
          t2 && (t2.classList.remove(ls), t2.blur(), this._deactivate(K.getElementFromSelector(t2)), this._queueCallback(() => {
            "tab" === t2.getAttribute("role") ? (t2.setAttribute("aria-selected", false), t2.setAttribute("tabindex", "-1"), this._toggleDropDown(t2, false), j.trigger(t2, Ui, { relatedTarget: e2 })) : t2.classList.remove(hs);
          }, t2, t2.classList.contains(cs)));
        }
        _keydown(t2) {
          if (![is, ss, ns, os, rs, as].includes(t2.key)) return;
          t2.stopPropagation(), t2.preventDefault();
          const e2 = this._getChildren().filter((t3) => !d(t3));
          let i2;
          if ([rs, as].includes(t2.key)) i2 = e2[t2.key === rs ? 0 : e2.length - 1];
          else {
            const s2 = [ss, os].includes(t2.key);
            i2 = w(e2, t2.target, s2, true);
          }
          i2 && (i2.focus({ preventScroll: true }), ms.getOrCreateInstance(i2).show());
        }
        _getChildren() {
          return K.find(gs, this._parent);
        }
        _getActiveElem() {
          return this._getChildren().find((t2) => this._elemIsActive(t2)) || null;
        }
        _setInitialAttributes(t2, e2) {
          this._setAttributeIfNotExists(t2, "role", "tablist");
          for (const t3 of e2) this._setInitialAttributesOnChild(t3);
        }
        _setInitialAttributesOnChild(t2) {
          t2 = this._getInnerElement(t2);
          const e2 = this._elemIsActive(t2), i2 = this._getOuterElement(t2);
          t2.setAttribute("aria-selected", e2), i2 !== t2 && this._setAttributeIfNotExists(i2, "role", "presentation"), e2 || t2.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t2, "role", "tab"), this._setInitialAttributesOnTargetPanel(t2);
        }
        _setInitialAttributesOnTargetPanel(t2) {
          const e2 = K.getElementFromSelector(t2);
          e2 && (this._setAttributeIfNotExists(e2, "role", "tabpanel"), t2.id && this._setAttributeIfNotExists(e2, "aria-labelledby", `${t2.id}`));
        }
        _toggleDropDown(t2, e2) {
          const i2 = this._getOuterElement(t2);
          if (!i2.classList.contains("dropdown")) return;
          const s2 = (t3, s3) => {
            const n2 = K.findOne(t3, i2);
            n2 && n2.classList.toggle(s3, e2);
          };
          s2(ds, ls), s2(".dropdown-menu", hs), i2.setAttribute("aria-expanded", e2);
        }
        _setAttributeIfNotExists(t2, e2, i2) {
          t2.hasAttribute(e2) || t2.setAttribute(e2, i2);
        }
        _elemIsActive(t2) {
          return t2.classList.contains(ls);
        }
        _getInnerElement(t2) {
          return t2.matches(gs) ? t2 : K.findOne(gs, t2);
        }
        _getOuterElement(t2) {
          return t2.closest(".nav-item, .list-group-item") || t2;
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = ms.getOrCreateInstance(this);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
              e2[t2]();
            }
          });
        }
      }
      j.on(document, Zi, _s, function(t2) {
        ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), d(this) || ms.getOrCreateInstance(this).show();
      }), j.on(window, es, () => {
        for (const t2 of K.find(fs)) ms.getOrCreateInstance(t2);
      }), b(ms);
      const ps = ".bs.toast", bs = `mouseover${ps}`, vs = `mouseout${ps}`, ys = `focusin${ps}`, ws = `focusout${ps}`, As = `hide${ps}`, Es = `hidden${ps}`, Cs = `show${ps}`, Ts = `shown${ps}`, ks = "hide", $s = "show", Ss = "showing", Ls = { animation: "boolean", autohide: "boolean", delay: "number" }, Os = { animation: true, autohide: true, delay: 5e3 };
      class Is extends W {
        constructor(t2, e2) {
          super(t2, e2), this._timeout = null, this._hasMouseInteraction = false, this._hasKeyboardInteraction = false, this._setListeners();
        }
        static get Default() {
          return Os;
        }
        static get DefaultType() {
          return Ls;
        }
        static get NAME() {
          return "toast";
        }
        show() {
          j.trigger(this._element, Cs).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(ks), g(this._element), this._element.classList.add($s, Ss), this._queueCallback(() => {
            this._element.classList.remove(Ss), j.trigger(this._element, Ts), this._maybeScheduleHide();
          }, this._element, this._config.animation));
        }
        hide() {
          this.isShown() && (j.trigger(this._element, As).defaultPrevented || (this._element.classList.add(Ss), this._queueCallback(() => {
            this._element.classList.add(ks), this._element.classList.remove(Ss, $s), j.trigger(this._element, Es);
          }, this._element, this._config.animation)));
        }
        dispose() {
          this._clearTimeout(), this.isShown() && this._element.classList.remove($s), super.dispose();
        }
        isShown() {
          return this._element.classList.contains($s);
        }
        _maybeScheduleHide() {
          this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
        }
        _onInteraction(t2, e2) {
          switch (t2.type) {
            case "mouseover":
            case "mouseout":
              this._hasMouseInteraction = e2;
              break;
            case "focusin":
            case "focusout":
              this._hasKeyboardInteraction = e2;
          }
          if (e2) return void this._clearTimeout();
          const i2 = t2.relatedTarget;
          this._element === i2 || this._element.contains(i2) || this._maybeScheduleHide();
        }
        _setListeners() {
          j.on(this._element, bs, (t2) => this._onInteraction(t2, true)), j.on(this._element, vs, (t2) => this._onInteraction(t2, false)), j.on(this._element, ys, (t2) => this._onInteraction(t2, true)), j.on(this._element, ws, (t2) => this._onInteraction(t2, false));
        }
        _clearTimeout() {
          clearTimeout(this._timeout), this._timeout = null;
        }
        static jQueryInterface(t2) {
          return this.each(function() {
            const e2 = Is.getOrCreateInstance(this, t2);
            if ("string" == typeof t2) {
              if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
              e2[t2](this);
            }
          });
        }
      }
      return V(Is), b(Is), { Alert: U, Button: J, Carousel: Ot, Collapse: Rt, Dropdown: fe, Modal: Ue, Offcanvas: gi, Popover: Mi, ScrollSpy: Qi, Tab: ms, Toast: Is, Tooltip: Ni };
    });
  }
});
export default require_bootstrap_min();
/*! Bundled license information:

bootstrap/dist/js/bootstrap.min.js:
  (*!
    * Bootstrap v5.3.3 (https://getbootstrap.com/)
    * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)
*/
//# sourceMappingURL=bootstrap_dist_js_bootstrap__min__js.js.map
