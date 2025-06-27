import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useForm } from '@tanstack/react-form';
import * as react from 'react';
import { useState } from 'react';
import * as turf from '@turf/turf';
import axios from 'axios';
import { MapContainer, TileLayer, FeatureGroup, Polygon, CircleMarker, Marker, Popup, useMapEvents } from 'react-leaflet';
import * as leafletDraw from 'leaflet-draw';
import * as leaflet from 'leaflet';
import { toast, ToastContainer } from 'react-toastify';
import { B as BASE_URL } from './appConfig-BoLcRWaq.mjs';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var reactLeafletDraw = {exports: {}};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(leafletDraw);

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(react);

const require$$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(leaflet);

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory(require$$0, require$$1, require$$2);
	})(self, (__WEBPACK_EXTERNAL_MODULE__654__, __WEBPACK_EXTERNAL_MODULE__329__, __WEBPACK_EXTERNAL_MODULE__708__) => {
	return /******/ (() => { // webpackBootstrap
	/******/ 	var __webpack_modules__ = ({

	/***/ 704:
	/***/ ((module) => {
	 // do not edit .js files directly - edit src/index.jst

	module.exports = function equal(a, b) {
	  if (a === b) return true;

	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    if (a.constructor !== b.constructor) return false;
	    var length, i, keys;

	    if (Array.isArray(a)) {
	      length = a.length;
	      if (length != b.length) return false;

	      for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

	      return true;
	    }

	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
	    keys = Object.keys(a);
	    length = keys.length;
	    if (length !== Object.keys(b).length) return false;

	    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

	    for (i = length; i-- !== 0;) {
	      var key = keys[i];
	      if (!equal(a[key], b[key])) return false;
	    }

	    return true;
	  } // true if both NaN, false otherwise


	  return a !== a && b !== b;
	};

	/***/ }),

	/***/ 433:
	/***/ ((module, __unused_webpack_exports, __webpack_require__) => {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */


	var ReactPropTypesSecret = __webpack_require__(642);

	function emptyFunction() {}

	function emptyFunctionWithReset() {}

	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	module.exports = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }

	    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	    err.name = 'Invariant Violation';
	    throw err;
	  }
	  shim.isRequired = shim;

	  function getShim() {
	    return shim;
	  }
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,
	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };
	  ReactPropTypes.PropTypes = ReactPropTypes;
	  return ReactPropTypes;
	};

	/***/ }),

	/***/ 74:
	/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	{
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(433)();
	}

	/***/ }),

	/***/ 642:
	/***/ ((module) => {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */


	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	module.exports = ReactPropTypesSecret;

	/***/ }),

	/***/ 708:
	/***/ ((module) => {
	module.exports = __WEBPACK_EXTERNAL_MODULE__708__;

	/***/ }),

	/***/ 654:
	/***/ ((module) => {
	module.exports = __WEBPACK_EXTERNAL_MODULE__654__;

	/***/ }),

	/***/ 329:
	/***/ ((module) => {
	module.exports = __WEBPACK_EXTERNAL_MODULE__329__;

	/***/ })

	/******/ 	});
	/************************************************************************/
	/******/ 	// The module cache
	/******/ 	var __webpack_module_cache__ = {};
	/******/ 	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/ 		// Check if module is in cache
	/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
	/******/ 		if (cachedModule !== undefined) {
	/******/ 			return cachedModule.exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = __webpack_module_cache__[moduleId] = {
	/******/ 			// no module.id needed
	/******/ 			// no module.loaded needed
	/******/ 			exports: {}
	/******/ 		};
	/******/ 	
	/******/ 		// Execute the module function
	/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
	/******/ 	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/ 	
	/************************************************************************/
	/******/ 	/* webpack/runtime/compat get default export */
	/******/ 	(() => {
	/******/ 		// getDefaultExport function for compatibility with non-harmony modules
	/******/ 		__webpack_require__.n = (module) => {
	/******/ 			var getter = module && module.__esModule ?
	/******/ 				() => (module['default']) :
	/******/ 				() => (module);
	/******/ 			__webpack_require__.d(getter, { a: getter });
	/******/ 			return getter;
	/******/ 		};
	/******/ 	})();
	/******/ 	
	/******/ 	/* webpack/runtime/define property getters */
	/******/ 	(() => {
	/******/ 		// define getter functions for harmony exports
	/******/ 		__webpack_require__.d = (exports, definition) => {
	/******/ 			for(var key in definition) {
	/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
	/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
	/******/ 				}
	/******/ 			}
	/******/ 		};
	/******/ 	})();
	/******/ 	
	/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
	/******/ 	(() => {
	/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
	/******/ 	})();
	/******/ 	
	/******/ 	/* webpack/runtime/make namespace object */
	/******/ 	(() => {
	/******/ 		// define __esModule on exports
	/******/ 		__webpack_require__.r = (exports) => {
	/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 			}
	/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 		};
	/******/ 	})();
	/******/ 	
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be in strict mode.
	(() => {
	// ESM COMPAT FLAG
	__webpack_require__.r(__webpack_exports__);

	// EXPORTS
	__webpack_require__.d(__webpack_exports__, {
	  "EditControl": () => (/* reexport */ src_EditControl)
	});

	// EXTERNAL MODULE: ./node_modules/prop-types/index.js
	var prop_types = __webpack_require__(74);
	// EXTERNAL MODULE: external {"amd":"leaflet-draw","commonjs":"leaflet-draw","commonjs2":"leaflet-draw","root":"L"}
	__webpack_require__(654);
	// EXTERNAL MODULE: ./node_modules/fast-deep-equal/index.js
	var fast_deep_equal = __webpack_require__(704);
	var fast_deep_equal_default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal);
	// EXTERNAL MODULE: external {"amd":"react","commonjs":"react","commonjs2":"react","root":"React"}
	var external_amd_react_commonjs_react_commonjs2_react_root_React_ = __webpack_require__(329);
	var external_amd_react_commonjs_react_commonjs2_react_root_React_default = /*#__PURE__*/__webpack_require__.n(external_amd_react_commonjs_react_commonjs2_react_root_React_);
	const LeafletContext = (0, external_amd_react_commonjs_react_commonjs2_react_root_React_.createContext)(null);
	LeafletContext.Provider;
	function useLeafletContext() {
	  const context = (0, external_amd_react_commonjs_react_commonjs2_react_root_React_.useContext)(LeafletContext);

	  if (context == null) {
	    throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>');
	  }

	  return context;
	}
	// EXTERNAL MODULE: external {"amd":"leaflet","commonjs":"leaflet","commonjs2":"leaflet","root":"L"}
	var external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_ = __webpack_require__(708);
	var external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_default = /*#__PURE__*/__webpack_require__.n(external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_);
	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


	 // eslint-disable-line





	var eventHandlers = {
	  onEdited: 'draw:edited',
	  onDrawStart: 'draw:drawstart',
	  onDrawStop: 'draw:drawstop',
	  onDrawVertex: 'draw:drawvertex',
	  onEditStart: 'draw:editstart',
	  onEditMove: 'draw:editmove',
	  onEditResize: 'draw:editresize',
	  onEditVertex: 'draw:editvertex',
	  onEditStop: 'draw:editstop',
	  onDeleted: 'draw:deleted',
	  onDeleteStart: 'draw:deletestart',
	  onDeleteStop: 'draw:deletestop'
	};

	function EditControl(props) {
	  var context = useLeafletContext();
	  var drawRef = (0, external_amd_react_commonjs_react_commonjs2_react_root_React_.useRef)();
	  var propsRef = (0, external_amd_react_commonjs_react_commonjs2_react_root_React_.useRef)(props);

	  var onDrawCreate = function onDrawCreate(e) {
	    var onCreated = props.onCreated;
	    var container = context.layerContainer || context.map;
	    container.addLayer(e.layer);
	    onCreated && onCreated(e);
	  };

	  external_amd_react_commonjs_react_commonjs2_react_root_React_default().useEffect(function () {
	    var map = context.map;
	    var onMounted = props.onMounted;

	    for (var key in eventHandlers) {
	      map.on(eventHandlers[key], function (evt) {
	        var handlers = Object.keys(eventHandlers).filter(function (handler) {
	          return eventHandlers[handler] === evt.type;
	        });

	        if (handlers.length === 1) {
	          var handler = handlers[0];
	          props[handler] && props[handler](evt);
	        }
	      });
	    }

	    map.on((external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_default()).Draw.Event.CREATED, onDrawCreate);
	    drawRef.current = createDrawElement(props, context);
	    map.addControl(drawRef.current);
	    onMounted && onMounted(drawRef.current);
	    return function () {
	      map.off((external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_default()).Draw.Event.CREATED, onDrawCreate);

	      for (var _key in eventHandlers) {
	        if (props[_key]) {
	          map.off(eventHandlers[_key], props[_key]);
	        }
	      }

	      drawRef.current.remove(map);
	    };
	  }, [props.onCreated, props.onDeleted, props.onEdited]);
	  external_amd_react_commonjs_react_commonjs2_react_root_React_default().useEffect(function () {
	    if (fast_deep_equal_default()(props.draw, propsRef.current.draw) && fast_deep_equal_default()(props.edit, propsRef.current.edit) && props.position === propsRef.current.position) {
	      return;
	    }

	    var map = context.map;
	    drawRef.current.remove(map);
	    drawRef.current = createDrawElement(props, context);
	    drawRef.current.addTo(map);
	    var onMounted = props.onMounted;
	    onMounted && onMounted(drawRef.current);
	    return function () {
	      drawRef.current.remove(map);
	    };
	  }, [props.draw, props.edit, props.position, props.onCreated, props.onDeleted, props.onEdited]);
	  return null;
	}

	function createDrawElement(props, context) {
	  var layerContainer = context.layerContainer;
	  var draw = props.draw,
	      edit = props.edit,
	      position = props.position;
	  var options = {
	    edit: _objectSpread(_objectSpread({}, edit), {}, {
	      featureGroup: layerContainer
	    })
	  };

	  if (draw) {
	    options.draw = _objectSpread({}, draw);
	  }

	  if (position) {
	    options.position = position;
	  }

	  return new external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_.Control.Draw(options);
	}

	EditControl.propTypes = _objectSpread(_objectSpread({}, Object.keys(eventHandlers).reduce(function (acc, val) {
	  acc[val] = prop_types.PropTypes.func;
	  return acc;
	}, {})), {}, {
	  onCreated: prop_types.PropTypes.func,
	  onMounted: prop_types.PropTypes.func,
	  draw: prop_types.PropTypes.shape({
	    polyline: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool]),
	    polygon: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool]),
	    rectangle: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool]),
	    circle: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool]),
	    marker: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool])
	  }),
	  edit: prop_types.PropTypes.shape({
	    edit: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool]),
	    remove: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool]),
	    poly: prop_types.PropTypes.oneOfType([prop_types.PropTypes.object, prop_types.PropTypes.bool]),
	    allowIntersection: prop_types.PropTypes.bool
	  }),
	  position: prop_types.PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
	  leaflet: prop_types.PropTypes.shape({
	    map: prop_types.PropTypes.instanceOf(external_amd_leaflet_commonjs_leaflet_commonjs2_leaflet_root_L_.Map),
	    layerContainer: prop_types.PropTypes.shape({
	      addLayer: prop_types.PropTypes.func.isRequired,
	      removeLayer: prop_types.PropTypes.func.isRequired
	    })
	  })
	});
	/* harmony default export */ const src_EditControl = (EditControl);

	})();

	/******/ 	return __webpack_exports__;
	/******/ })()
	;
	}); 
} (reactLeafletDraw));

var reactLeafletDrawExports = reactLeafletDraw.exports;

const DrawTools = ({
  setFormCoordinates,
  setFieldAccessPoint,
  setRobotHome,
  mode,
  setMode,
  setLocationInfo
}) => {
  const [polyCoordinates, setPolyCoordinates] = useState([]);
  const [accessPoint, setAccessPoint] = useState();
  const [robotPoint, setRobotPoint] = useState();
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      return response.data.display_name;
    } catch (error) {
      console.error("Reverse geocode error:", error);
      return null;
    }
  };
  const handleCreated = async (e) => {
    const { layerType, layer } = e;
    console.log("layerType:", layerType);
    if (layerType === "polygon" || layerType === "rectangle") {
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map((latlng) => ({ lat: latlng.lat, lng: latlng.lng }));
      setFormCoordinates(coords);
      setPolyCoordinates(coords);
      console.log(coords);
      const boundary = [...coords, coords[0]];
      const polygon = turf.polygon([boundary.map((p) => [p.lng, p.lat])]);
      const areaSqMeters = turf.area(polygon);
      const areaAcres = areaSqMeters / 4046.86;
      const centroid = turf.centroid(polygon);
      const [lng, lat] = centroid.geometry.coordinates;
      const location = await reverseGeocode(lat, lng);
      setLocationInfo({
        location,
        area: areaAcres.toFixed(2)
      });
      console.log(coords);
    }
  };
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (mode === "field_access_point") {
          const point = { lat, lng };
          setAccessPoint(point);
          setFieldAccessPoint(point);
          setMode("idle");
        } else if (mode === "robot_home") {
          const point = { lat, lng };
          setRobotPoint(point);
          setRobotHome(point);
          setMode("idle");
        }
      }
    });
    return null;
  };
  return /* @__PURE__ */ jsx("div", { className: "h-[600px] w-full", children: /* @__PURE__ */ jsxs(
    MapContainer,
    {
      center: [17.385, 78.4867],
      zoom: 13,
      style: { height: "100%", width: "100%" },
      children: [
        /* @__PURE__ */ jsx(TileLayer, { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" }),
        /* @__PURE__ */ jsx(MapClickHandler, {}),
        /* @__PURE__ */ jsxs(FeatureGroup, { children: [
          /* @__PURE__ */ jsx(
            reactLeafletDrawExports.EditControl,
            {
              position: "topleft",
              onCreated: handleCreated,
              onDeleted: () => {
                setPolyCoordinates([]);
                setFormCoordinates([]);
                setAccessPoint(void 0);
                setRobotPoint(void 0);
                setFieldAccessPoint(null);
                setRobotHome(null);
                setLocationInfo(null);
              },
              draw: {
                rectangle: true,
                circle: false,
                circlemarker: false,
                polygon: true,
                marker: false,
                polyline: false
              }
            }
          ),
          polyCoordinates.length > 0 && /* @__PURE__ */ jsx(
            Polygon,
            {
              positions: polyCoordinates,
              pathOptions: { color: "white", weight: 1, fillColor: "rgba(144, 222, 144, 0.5)", fillOpacity: 0.5 }
            }
          ),
          polyCoordinates.map((point, index) => /* @__PURE__ */ jsx(
            CircleMarker,
            {
              center: [point.lat, point.lng],
              radius: 4,
              pathOptions: { color: "green", fillColor: "green", fillOpacity: 1 }
            },
            index
          ))
        ] }),
        accessPoint && /* @__PURE__ */ jsx(Marker, { position: [accessPoint.lat, accessPoint.lng], children: /* @__PURE__ */ jsx(Popup, { children: "Field Access Point" }) }),
        robotPoint && /* @__PURE__ */ jsx(Marker, { position: [robotPoint.lat, robotPoint.lng], children: /* @__PURE__ */ jsx(Popup, { children: "Robot Home" }) })
      ]
    }
  ) });
};
function FieldsTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/fieldmappings`, {
        headers: new Headers({
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        })
      });
      const data2 = await res.json();
      return data2.data.records;
    }
  });
  console.log(data);
  const columns = [
    {
      header: "S NO",
      accessorKey: "id",
      cell: (value) => {
        m;
      }
    },
    {
      header: "Field Name",
      accessorKey: "field_name"
    },
    {
      header: "Geographical Area",
      accessorKey: "field_area"
    },
    {
      header: "Created on",
      accessorKey: "created_at",
      cell: (value) => {
        const dateString = value.cell.getValue();
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
      }
    },
    {
      header: "Status",
      accessorKey: "field_status"
    },
    {
      header: "Action",
      accessorKey: "action"
    }
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
    /* @__PURE__ */ jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx("th", { className: "border p-0.5 bg-gray-100 text-xs text-center", children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }, headerGroup.id)) }),
    /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "border p-1 text-center text-xs", style: { backgroundColor: "#ffff" }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
  ] }) });
}
function App({
  setField
}) {
  const [formCoordinates, setFormCoordinates] = useState([]);
  const [fieldAccessPoint, setFieldAccessPoint] = useState(null);
  const [robotHome, setRobotHome] = useState(null);
  const [mode, setMode] = useState("idle");
  const [locationInfo, setLocationInfo] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsx(DrawTools, { setFormCoordinates, setFieldAccessPoint, setRobotHome, mode, setMode, setLocationInfo }),
    /* @__PURE__ */ jsx(SampleForm, { setField, formCoordinates, fieldAccessPoint, robotHome, setMode, locationInfo })
  ] });
}
function SampleForm({
  setField,
  formCoordinates,
  fieldAccessPoint,
  robotHome,
  setMode,
  locationInfo
}) {
  const form = useForm({
    defaultValues: {
      type: "",
      field_name: "",
      farm: ""
    },
    onSubmit: async ({
      value
    }) => {
      const fullData = {
        field_name: value.field_name,
        field_boundary: formCoordinates,
        location: (locationInfo == null ? void 0 : locationInfo.location) || "",
        field_area: (locationInfo == null ? void 0 : locationInfo.area) || "",
        field_access_point: fieldAccessPoint,
        robot_home: robotHome
      };
      await fetch("https://demetercloud.onrender.com/v1.0/fieldmapping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(fullData)
      });
      console.log(fullData);
    }
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("form", { onSubmit: (e) => {
      form.handleSubmit(e);
      e.preventDefault();
      e.stopPropagation();
    }, className: "h-125 w-78 shadow-2xl rounded-xl float-right", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-2 gap-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-sm font-semibold text-center mb-4", children: "Register Field" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px]", children: "Field Name" }),
        " ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(form.Field, { name: "field_name", children: (field) => /* @__PURE__ */ jsx("input", { value: field.state.value, onChange: (e) => field.handleChange(e.target.value), className: " bg-gray-100 rounded w-74 p-1.5 text-xs", required: true }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[12px] mt-3 font-semibold", children: [
        /* @__PURE__ */ jsx("span", { children: "Geographical Area" }),
        /* @__PURE__ */ jsxs("span", { className: "rounded pl-2 pr-2 text-xs text-red-400 bg-red-200", children: [
          (locationInfo == null ? void 0 : locationInfo.area) || 0,
          /* @__PURE__ */ jsx("span", { className: "text-black", children: " Hectars" })
        ] })
      ] }),
      " ",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px]", children: "Field Access point" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("button", { type: "button", style: {
          cursor: "pointer"
        }, className: "rounded px-2 pt-1 pb-1 text-xs bg-green-200", onClick: () => {
          setMode("field_access_point");
          toast.info("Click on the map to place Field Access Point", {
            position: "top-right",
            autoClose: 2e3,
            style: {
              fontSize: "12px",
              color: "#065f46",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }
          });
        }, children: "+ Add" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px]", children: "Robot Home" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("button", { type: "button", style: {
          cursor: "pointer"
        }, className: "rounded px-2 pt-1 pb-1 text-xs bg-green-200", onClick: () => {
          setMode("robot_home");
        }, children: "+ Add" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex ", children: [
        /* @__PURE__ */ jsx("div", { className: "border-1 rounded pl-2 pr-2 text-sm  ", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setField(false), style: {
          cursor: "pointer"
        }, children: "Cancel" }) }),
        /* @__PURE__ */ jsx("div", { className: "rounded pl-3 pr-3 text-sm bg-green-400", children: /* @__PURE__ */ jsx("button", { type: "submit", style: {
          cursor: "pointer"
        }, children: "Save" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
}
const SplitComponent = function Field() {
  const [field, setField] = useState(false);
  return /* @__PURE__ */ jsx("div", { children: !field ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { className: "rounded px-2 mt-0.5 mb-1 py-1 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right", onClick: () => {
      setField(true);
    }, children: "+ Add Field" }),
    /* @__PURE__ */ jsx(FieldsTable, {})
  ] }) : /* @__PURE__ */ jsx(App, { setField }) });
};

export { SplitComponent as component };
//# sourceMappingURL=field-DSY92Jgq.mjs.map
