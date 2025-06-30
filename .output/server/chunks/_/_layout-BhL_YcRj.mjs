import { jsxs, jsx } from 'react/jsx-runtime';
import { Outlet, Link } from '@tanstack/react-router';
import { Search, Bell, Mail, Sprout, Bot, Joystick, Settings } from 'lucide-react';

const Navbar = () => {
  return /* @__PURE__ */ jsxs("div", { style: { padding: "10px" }, className: "border-b-1", children: [
    /* @__PURE__ */ jsx(Link, { to: "/field", className: "text-sm font-bold", children: "Robot Fields" }),
    /* @__PURE__ */ jsxs("div", { style: { float: "right", paddingRight: "10px", display: "flex", gap: "15px" }, children: [
      /* @__PURE__ */ jsx("div", { className: " p-1 rounded-full border-2 border-gray-200 flex items-center", children: /* @__PURE__ */ jsx(Search, { size: 12, strokeWidth: 2 }) }),
      /* @__PURE__ */ jsx("div", { className: "p-1 rounded-full border-2 border-gray-200 flex items-center ", children: /* @__PURE__ */ jsx(Bell, { size: 12, strokeWidth: 2 }) }),
      /* @__PURE__ */ jsx("div", { className: "p-1 rounded-full border-2 border-gray-200 flex items-center ", children: /* @__PURE__ */ jsx(Mail, { size: 12, strokeWidth: 2 }) })
    ] })
  ] });
};
function Sidebar() {
  return /* @__PURE__ */ jsxs("div", { className: " pt-8  mr-2 w-15 flex flex-col items-center border-r-1 ", children: [
    /* @__PURE__ */ jsx(Link, { to: "/field", className: "[&.active]:bg-[#0ed78d] mb-8 hover:bg-green-200 rounded-lg h-8 w-8 flex items-center justify-center", children: /* @__PURE__ */ jsx(Sprout, { size: 20, strokeWidth: 2 }) }),
    /* @__PURE__ */ jsx(Link, { to: "/devices", className: "[&.active]:bg-[#0ed78d] mb-8  hover:bg-green-200  rounded-lg h-8 w-8 flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { size: 20, strokeWidth: 2 }) }),
    /* @__PURE__ */ jsx(Link, { to: "/teleop", className: "[&.active]:bg-[#0ed78d] mb-8  hover:bg-green-200 rounded-lg h-8 w-8 flex items-center justify-center", children: /* @__PURE__ */ jsx(Joystick, { size: 20, strokeWidth: 2 }) }),
    /* @__PURE__ */ jsx(Link, { to: "/settings", className: "[&.active]:bg-[#0ed78d]  hover:bg-green-200  rounded-lg h-8 w-8 flex items-center justify-center", children: /* @__PURE__ */ jsx(Settings, { size: 20, strokeWidth: 2 }) })
  ] });
}
const SplitComponent = function Body() {
  return /* @__PURE__ */ jsxs("div", { style: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { style: {
      flex: 1,
      display: "flex",
      overflow: "hidden"
    }, className: "flex h-screen", children: [
      /* @__PURE__ */ jsx(Sidebar, {}),
      /* @__PURE__ */ jsx("div", { style: {
        flex: 1,
        overflowY: "auto",
        paddingTop: "4px",
        paddingRight: "5px",
        backgroundColor: "white"
      }, children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=_layout-BhL_YcRj.mjs.map
