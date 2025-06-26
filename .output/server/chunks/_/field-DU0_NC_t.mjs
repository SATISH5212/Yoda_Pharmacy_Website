import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

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
  {
    return null;
  }
};
const data = [
  {
    sno: 1,
    fieldname: "Amaravathi",
    geographical_area: "",
    created_at: "",
    status: "active",
    action: "spraying"
  },
  {
    sno: 3,
    fieldname: "Amaravathi",
    geographical_area: "",
    created_at: "",
    status: "active",
    action: "spraying"
  },
  {
    sno: 4,
    fieldname: "Amaravathi",
    geographical_area: "",
    created_at: "",
    status: "active",
    action: "spraying"
  }
];
const columns = [
  {
    header: "S NO",
    accessorKey: "sno"
  },
  {
    header: "Field Name",
    accessorKey: "fieldname"
  },
  {
    header: "Geographical Area",
    accessorKey: "geographical_area"
  },
  {
    header: "Status",
    accessorKey: "status"
  },
  {
    header: "Action",
    accessorKey: "action"
  }
];
function FieldsTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
    /* @__PURE__ */ jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx("th", { className: "border p-0.5 bg-gray-100 text-xs text-center", children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }, headerGroup.id)) }),
    /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "border p-0.5 text-center text-xs", style: { backgroundColor: "#ffff" }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
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
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(SampleForm, { setField, formCoordinates, fieldAccessPoint, robotHome, setMode, locationInfo }),
    /* @__PURE__ */ jsx(DrawTools, { setFormCoordinates, setFieldAccessPoint, setRobotHome, mode, setMode, setLocationInfo })
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
      console.log(fullData);
    }
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("form", { onSubmit: (e) => {
      form.handleSubmit(e);
      e.preventDefault();
      e.stopPropagation();
    }, className: "h-125 w-78 shadow-2xl bg-white rounded-xl float-end", style: {
      backgroundColor: "#ffff"
    }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-2 gap-2", children: [
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
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px]", children: "obstacles" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("button", { type: "button", style: {
          cursor: "pointer"
        }, className: "rounded px-2 pt-1 pb-1 text-xs bg-green-200", children: "+ Add" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "float-right mt-17 mr-3 rounded pl-3 pr-3 text-sm bg-green-400", children: /* @__PURE__ */ jsx("button", { type: "submit", style: {
          cursor: "pointer"
        }, children: "Save" }) }),
        /* @__PURE__ */ jsx("div", { className: "float-right mt-17 mr-3 border-1 rounded pl-2 pr-2 text-sm  ", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setField(false), style: {
          cursor: "pointer"
        }, children: "Cancel" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
}
const SplitComponent = function Field() {
  const [field, setField] = useState(false);
  return /* @__PURE__ */ jsx("div", { children: !field ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { className: "bg-[#0ed78d] cursor-pointer px-2 py-0.5 rounded float-end mr-5 mb-1 text-xs", onClick: () => {
      setField(true);
    }, children: "+ Add Field" }),
    /* @__PURE__ */ jsx(FieldsTable, {})
  ] }) : /* @__PURE__ */ jsx(App, { setField }) });
};

export { SplitComponent as component };
//# sourceMappingURL=field-DU0_NC_t.mjs.map
