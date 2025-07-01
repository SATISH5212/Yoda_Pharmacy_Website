import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { B as BASE_URL, G as GOOGLE_MAP_API_KEY } from './appConfig-CuRu-lXg.mjs';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';
import { Eye, Trash2 } from 'lucide-react';
import { LoadScript, GoogleMap, Polygon, Marker, DrawingManager } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useForm } from '@tanstack/react-form';
import { toast } from 'react-toastify';

async function getFieldsData() {
  const response = await fetch(`${BASE_URL}/fieldmappings?`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  });
  const data = await response.json();
  console.log(data);
  return data.data;
}
function FieldsTable() {
  var _a;
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getFieldsData()
  });
  const columns = [
    {
      header: "S No",
      accessorKey: "id",
      cell: (value) => {
        return value.row.index + 1;
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
      accessorKey: "action",
      cell: (info) => {
        info.row.original;
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: `/devices`,
            className: " flex justify-center hover:text-blue-700",
            title: "View Details",
            children: /* @__PURE__ */ jsx(Eye, { size: 12 })
          }
        );
      }
    }
  ];
  const table = useReactTable({
    data: (_a = data == null ? void 0 : data.records) != null ? _a : [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsx("div", { className: "rounded", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
    /* @__PURE__ */ jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx("th", { className: "border p-0.5 bg-gray-100 text-xs text-center", children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }, headerGroup.id)) }),
    /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "border p-1 text-center text-xs", style: { backgroundColor: "#ffff" }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
  ] }) });
}
const containerStyle = {
  width: "100%",
  height: "100vh"
};
const center = { lat: 17.385, lng: 78.4867 };
const DrawTools = ({
  setFormCoordinates,
  setFieldAccessPoint,
  // setRobotHome,
  setLocationInfo,
  mode,
  setMode
}) => {
  const [polygonPath, setPolygonPath] = useState([]);
  const [accessPoint, setAccessPoint] = useState();
  const [googleInstance, setGoogleInstance] = useState(null);
  const drawnShapeRef = useRef(null);
  const handlePolygonComplete = async (overlay) => {
    var _a, _b;
    let path = [];
    if (overlay instanceof google.maps.Polygon) {
      const pathArray = overlay.getPath().getArray();
      if (pathArray.length < 3) return;
      path = pathArray.map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng()
      }));
    }
    setPolygonPath(path);
    setFormCoordinates(path);
    drawnShapeRef.current = overlay;
    const coordinates = [
      ...path.map((p) => [p.lng, p.lat]),
      [path[0].lng, path[0].lat]
    ];
    if (coordinates.length < 4) return;
    const turfPoly = turf.polygon([coordinates]);
    const area = turf.area(turfPoly) / 4046.86;
    const [lngC, latC] = turf.centroid(turfPoly).geometry.coordinates;
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latC},${lngC}&key=${GOOGLE_MAP_API_KEY}`
    );
    setLocationInfo({
      location: ((_b = (_a = res.data.results) == null ? void 0 : _a[0]) == null ? void 0 : _b.formatted_address) || "Unknown",
      area: area.toFixed(2)
    });
    overlay.setMap(null);
  };
  const handleMapClick = (e) => {
    if (!e.latLng)
      return;
    const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    if (mode === "field_access_point") {
      setAccessPoint(point);
      setFieldAccessPoint(point);
      setMode("idle");
    }
  };
  const handleDelete = () => {
    setPolygonPath([]);
    setFormCoordinates([]);
    setAccessPoint(void 0);
    setFieldAccessPoint(null);
    setLocationInfo(null);
    if (drawnShapeRef.current) {
      drawnShapeRef.current.setMap(null);
      drawnShapeRef.current = null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative ", children: [
    /* @__PURE__ */ jsx(
      LoadScript,
      {
        googleMapsApiKey: GOOGLE_MAP_API_KEY,
        libraries: ["drawing", "places", "geocoding"],
        onLoad: () => setGoogleInstance(window.google),
        children: /* @__PURE__ */ jsxs(
          GoogleMap,
          {
            mapContainerStyle: containerStyle,
            center,
            zoom: 13,
            onClick: handleMapClick,
            mapTypeId: "satellite",
            children: [
              polygonPath.length > 0 && /* @__PURE__ */ jsx(
                Polygon,
                {
                  path: polygonPath,
                  options: {
                    fillColor: "rgba(144, 222, 144, 0.5)",
                    fillOpacity: 0.5,
                    strokeColor: "white",
                    strokeWeight: 1
                  }
                }
              ),
              accessPoint && /* @__PURE__ */ jsx(Marker, { position: accessPoint, label: { text: "Field Access Point", color: "white", fontSize: "10px" } }),
              googleInstance && /* @__PURE__ */ jsx(
                DrawingManager,
                {
                  onPolygonComplete: handlePolygonComplete,
                  onRectangleComplete: handlePolygonComplete,
                  options: {
                    drawingControl: true,
                    drawingControlOptions: {
                      position: googleInstance.maps.ControlPosition.TOP_LEFT,
                      drawingModes: [
                        googleInstance.maps.drawing.OverlayType.POLYGON,
                        googleInstance.maps.drawing.OverlayType.RECTANGLE
                      ]
                    },
                    polygonOptions: {
                      fillColor: "#90ee90",
                      strokeColor: "#006400",
                      strokeWeight: 2,
                      clickable: false,
                      editable: false,
                      draggable: false
                    },
                    rectangleOptions: {
                      fillColor: "#90ee90",
                      strokeColor: "#006400",
                      strokeWeight: 2,
                      clickable: false,
                      editable: false,
                      draggable: false
                    }
                  }
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleDelete,
        className: "absolute top-1.5 left-23 bg-white text-black rounded-[2px] shadow px-2 py-1 text-xs cursor-pointer hover:bg-gray-300",
        children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
      }
    )
  ] });
};
function MapForm({ setField }) {
  const [formCoordinates, setFormCoordinates] = useState([]);
  const [fieldAccessPoint, setFieldAccessPoint] = useState(null);
  const [mode, setMode] = useState("idle");
  const [locationInfo, setLocationInfo] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 w-full h-screen", children: /* @__PURE__ */ jsx(
      DrawTools,
      {
        setFormCoordinates,
        setFieldAccessPoint,
        mode,
        setMode,
        setLocationInfo
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute z-10 top-1 right-1 bg-white shadow-2xl rounded-2xl", children: /* @__PURE__ */ jsx(
      FieldForm,
      {
        setField,
        formCoordinates,
        fieldAccessPoint,
        setMode,
        locationInfo
      }
    ) })
  ] });
}
function FieldForm({
  setField,
  formCoordinates,
  fieldAccessPoint,
  // robotHome,
  setMode,
  locationInfo
}) {
  const form = useForm({
    defaultValues: {
      field_name: ""
    },
    onSubmit: async ({ value }) => {
      const fullData = {
        field_name: value.field_name,
        field_boundary: formCoordinates,
        location: (locationInfo == null ? void 0 : locationInfo.location) || "",
        field_area: (locationInfo == null ? void 0 : locationInfo.area) || "",
        field_access_point: fieldAccessPoint
        // robot_home: robotHome,
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
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        form.handleSubmit(e);
        e.preventDefault();
        e.stopPropagation();
      },
      className: "h-132 w-78",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-2 gap-2", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-sm font-semibold text-center mb-4", children: "Register Field" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px]", children: "Field Name" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx(
              form.Field,
              {
                name: "field_name",
                children: (field) => /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: field.state.value,
                    onChange: (e) => field.handleChange(e.target.value),
                    className: " bg-gray-100 rounded w-74 p-1.5 text-xs",
                    required: true
                  }
                )
              }
            )
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
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                style: { cursor: "pointer" },
                className: "rounded px-2 pt-1 pb-1 text-xs bg-green-200",
                onClick: () => {
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
                },
                children: "+ Add"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-5 right-3 flex gap-3 ", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setField(false),
              className: "border-1  rounded pl-2 pr-2 text-sm cursor-pointer ",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "rounded pl-3 pr-3 text-sm bg-green-400 cursor-pointer",
              children: "Save"
            }
          )
        ] })
      ]
    }
  );
}
const SplitComponent = function Field() {
  const [field, setField] = useState(false);
  return /* @__PURE__ */ jsx(Fragment, { children: !field ? /* @__PURE__ */ jsxs("div", { className: "ml-1", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gray-200 rounded p-1 mb-2 h-8 w-full", children: /* @__PURE__ */ jsx("button", { type: "button", className: "rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right", onClick: () => setField(true), children: " + New Field" }) }),
    /* @__PURE__ */ jsx(FieldsTable, {})
  ] }) : /* @__PURE__ */ jsx(MapForm, { setField }) });
};

export { SplitComponent as component };
//# sourceMappingURL=field-DrT3hgcV.mjs.map
