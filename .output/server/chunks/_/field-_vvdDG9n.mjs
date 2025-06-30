import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { B as BASE_URL } from './appConfig-BoLcRWaq.mjs';
import { useQuery } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Eye } from 'lucide-react';
import * as turf from '@turf/turf';
import axios from 'axios';
import { MapContainer, TileLayer, FeatureGroup, Polygon, CircleMarker, Marker, Popup, useMapEvents } from 'react-leaflet';
import { r as reactLeafletDrawExports } from './react-leaflet-draw.mjs';
import { useForm } from '@tanstack/react-form';
import { toast } from 'react-toastify';
import 'leaflet-draw';
import 'leaflet';

async function getFieldsData(page, page_size) {
  const response = await fetch(`${BASE_URL}/fieldmappings?page=${page}&page_size=${page_size}`, {
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
  var _a2;
  var _a, _b;
  const [page, setPage] = useState(1);
  const [page_size, setPageSize] = useState(5);
  const { data } = useQuery({
    queryKey: ["users", page, page_size],
    queryFn: () => getFieldsData(page, page_size)
  });
  const total = [];
  if (data) {
    for (let i = 1; i <= Math.ceil(((_a = data == null ? void 0 : data.pagination_info) == null ? void 0 : _a.total_records) / page_size); i++) {
      total.push(i);
    }
  }
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
    data: (_a2 = data == null ? void 0 : data.records) != null ? _a2 : [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx("th", { className: "border p-0.5 bg-gray-100 text-xs text-center", children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "border p-1 text-center text-xs", style: { backgroundColor: "#ffff" }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full fixed bottom-0 left-0 right-0 rounded shadow-2xl border bg-white border-gray-300 ", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-0.5  text-xs ", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { children: "Result per page " }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "border rounded p-0.5",
            value: page_size,
            onChange: (e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            },
            children: [
              /* @__PURE__ */ jsx("option", { value: "5", children: "5 records" }),
              /* @__PURE__ */ jsx("option", { value: "10", children: "10 records" }),
              /* @__PURE__ */ jsx("option", { value: "15", children: "15 records" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: page === 1,
            onClick: () => setPage((prev) => prev - 1),
            className: "px-2 py-1  text-xs rounded disabled:opacity-50 cursor-pointer bg-gray-200",
            children: "Previous"
          }
        ),
        total.map((pageNumber) => /* @__PURE__ */ jsx(
          "button",
          {
            className: `text-xs px-2 m-0.5 py-1 border rounded-2xl cursor-pointer ${page === pageNumber ? "bg-black text-white" : "hover:bg-gray-300"}`,
            onClick: () => {
              setPage(pageNumber);
            },
            children: pageNumber
          }
        )),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: page === ((_b = data == null ? void 0 : data.pagination_info) == null ? void 0 : _b.total_pages),
            onClick: () => setPage((prev) => prev + 1),
            className: "px-4 py-1 mr-1 text-xs rounded disabled:opacity-50 cursor-pointer bg-gray-200",
            children: "Next"
          }
        )
      ] })
    ] }) })
  ] });
}
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
  return /* @__PURE__ */ jsx("div", { className: "w-full h-screen", children: /* @__PURE__ */ jsxs(
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
function MapForm({ setField }) {
  const [formCoordinates, setFormCoordinates] = useState([]);
  const [fieldAccessPoint, setFieldAccessPoint] = useState(null);
  const [robotHome, setRobotHome] = useState(null);
  const [mode, setMode] = useState("idle");
  const [locationInfo, setLocationInfo] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 w-full h-screen", children: /* @__PURE__ */ jsx(
      DrawTools,
      {
        setFormCoordinates,
        setFieldAccessPoint,
        setRobotHome,
        mode,
        setMode,
        setLocationInfo
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute z-10 top-0 right-0 bg-white shadow-2xl rounded-2xl", children: /* @__PURE__ */ jsx(
      FieldForm,
      {
        setField,
        formCoordinates,
        fieldAccessPoint,
        robotHome,
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
  robotHome,
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
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        form.handleSubmit(e);
        e.preventDefault();
        e.stopPropagation();
      },
      className: "h-125 w-78",
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
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px]", children: "Robot Home" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                style: { cursor: "pointer" },
                className: "rounded px-2 pt-1 pb-1 text-xs bg-green-200",
                onClick: () => {
                  setMode("robot_home");
                },
                children: "+ Add"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 float-right", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setField(false),
              className: "border-1 mt-35 rounded pl-2 pr-2 text-sm cursor-pointer ",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "rounded mt-35 mr-2 pl-3 pr-3 text-sm bg-green-400 cursor-pointer",
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
  return /* @__PURE__ */ jsx(Fragment, { children: !field ? /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gray-200 rounded p-1 mb-2 h-8 w-full", children: /* @__PURE__ */ jsx("button", { type: "button", className: "rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right", onClick: () => setField(true), children: " + New Field" }) }),
    /* @__PURE__ */ jsx(FieldsTable, {})
  ] }) : /* @__PURE__ */ jsx(MapForm, { setField }) });
};

export { SplitComponent as component };
//# sourceMappingURL=field-_vvdDG9n.mjs.map
