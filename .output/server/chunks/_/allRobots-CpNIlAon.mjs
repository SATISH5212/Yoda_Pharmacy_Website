import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useQuery, useMutation } from '@tanstack/react-query';
import { B as BASE_URL$1 } from './appConfig-BoLcRWaq.mjs';
import { MapPin, BatteryFull } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

const BASE_URL = "https://demetercloud.onrender.com/v1.0";
const addRobot = async (robotConfig) => {
  const response = await fetch(`${BASE_URL}/robots`, {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }),
    body: JSON.stringify(robotConfig)
  });
  return response.json();
};
function AddRobot({ onBack }) {
  const notify = () => toast("Robot has been added Successfully !");
  const form = useForm({
    defaultValues: {
      robot_uuid: "a1b2c3d4-5678-4def-9012-3456abcdef12",
      robot_name: "robot-1",
      robot_type: "Spraying",
      hardware_version: "v2.1",
      software_version: "v3.1",
      deploy_id: "9b57b8a6-3cf7-4b60-b69b-83a43a6c19ff",
      firmware_version: "v4.1",
      ip_address: "10.0.4.25",
      mac_address: "AA:BB:CC:DD:EE:FF",
      robot_model: "WB-900"
    },
    onSubmit: async ({ value }) => {
      const robotConfig = {
        robot_uuid: value.robot_uuid,
        robot_name: value.robot_name,
        robot_type: value.robot_type,
        hardware_version: value.hardware_version,
        software_version: value.software_version,
        deploy_id: value.deploy_id,
        firmware_version: value.firmware_version,
        ip_address: value.ip_address,
        mac_address: value.mac_address,
        robot_model: value.robot_model
      };
      mutation.mutate(robotConfig);
    }
  });
  const mutation = useMutation({
    mutationFn: addRobot,
    onSuccess: () => {
      notify();
    }
  });
  return /* @__PURE__ */ jsx("div", { style: { height: "250px", width: "1000px", backgroundColor: "white", marginLeft: "100px", marginTop: "10px", borderRadius: "10px" }, children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 h-61", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 p-3 border-1 rounded-xl w-110", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Robot Name" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(
                form.Field,
                {
                  name: "robot_name",
                  children: (field) => /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: field.state.value,
                      onChange: (e) => field.handleChange(e.target.value),
                      placeholder: "robo-1",
                      className: " bg-gray-100 rounded w-105  p-1.5 text-xs ",
                      required: true
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs text-gray-400", children: "Robot UUID" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(
                form.Field,
                {
                  name: "robot_uuid",
                  children: (field) => /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: field.state.value,
                      onChange: (e) => field.handleChange(e.target.value),
                      placeholder: "9xxxxxxxx-3xxx-4xxx-bxx-8xxxxxxxxxf",
                      className: "bg-gray-100 rounded w-105  p-1.5 text-xs",
                      required: true
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Deploy ID" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(
                form.Field,
                {
                  name: "deploy_id",
                  children: (field) => /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: field.state.value,
                      onChange: (e) => field.handleChange(e.target.value),
                      placeholder: "Dxxxxx-xxx-xxx-xxx-xxx",
                      className: "bg-gray-100 rounded w-105 p-1.5 text-[10px] ",
                      required: true
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Robot Type" }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx(
                  form.Field,
                  {
                    name: "robot_type",
                    children: (field) => /* @__PURE__ */ jsx(
                      "select",
                      {
                        value: field.state.value,
                        onChange: (e) => field.handleChange(e.target.value),
                        className: "bg-gray-100 rounded w-52  p-1.5 text-xs",
                        children: /* @__PURE__ */ jsx("option", { value: "", children: "Robot Type" })
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Robot Model" }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx(
                  form.Field,
                  {
                    name: "robot_model",
                    children: (field) => /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: field.state.value,
                        onChange: (e) => field.handleChange(e.target.value),
                        placeholder: "Agribot HV-500",
                        className: "bg-gray-100 rounded w-52  p-1.5 text-[10px]",
                        required: true
                      }
                    )
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 p-2 border-1 rounded-xl w-130 h-31", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs", children: "Technical Configuration" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Hardware Version" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx(
                    form.Field,
                    {
                      name: "hardware_version",
                      children: (field) => /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          placeholder: "v2.3.1",
                          className: " bg-gray-100 rounded w-40  p-1.5 text-[10px]",
                          required: true
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Software Version" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx(
                    form.Field,
                    {
                      name: "software_version",
                      children: (field) => /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          placeholder: "v3.4.1",
                          className: " bg-gray-100 rounded w-40  p-1.5 text-[10px]",
                          required: true
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Firm Version" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx(
                    form.Field,
                    {
                      name: "firmware_version",
                      children: (field) => /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          placeholder: "v6.1.1",
                          className: " bg-gray-100 rounded w-40 p-1.5 text-[10px]",
                          required: true
                        }
                      )
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 border-1 p-2 rounded-xl w-130 h-28", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs", children: "Network Configuration" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "IP Address" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx(
                    form.Field,
                    {
                      name: "ip_address",
                      children: (field) => /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          placeholder: "e.g 198.123.19.1",
                          className: "bg-gray-100 rounded w-62 p-1.5 text-[10px]",
                          required: true
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "", className: "text-xs  text-gray-400", children: "Mac Address" }),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx(
                    form.Field,
                    {
                      name: "mac_address",
                      children: (field) => /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          placeholder: "D8:9E:F3:12:AB:CD",
                          className: "bg-gray-100 rounded w-62 p-1.5 text-[10px]",
                          required: true
                        }
                      )
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-3 mr-8 float-right", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "px-5 py-1 border-1 rounded text-[10px]  text-black  text-center cursor-pointer",
              type: "button",
              onClick: onBack,
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "px-2 py-1 rounded text-[10px] bg-[#0ed78d] text-white text-center cursor-pointer", type: "submit", children: "Add Robot" })
        ] }),
        /* @__PURE__ */ jsx(ToastContainer, {})
      ]
    }
  ) });
}
async function getRobotsData(page, page_size) {
  const response = await fetch(`${BASE_URL$1}/robots?page=${page}&page_size=${page_size}`, {
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
function AllRobots() {
  const [showAddRobot, setShowAddRobot] = useState(false);
  const [page, setPage] = useState(1);
  const [page_size, setPageSize] = useState(5);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["robots", { page, page_size }],
    queryFn: () => getRobotsData(page, page_size)
  });
  const total = [];
  if (data) {
    for (let i = 1; i <= Math.ceil((data == null ? void 0 : data.pagination_info.total_records) / page_size); i++) {
      total.push(i);
    }
  }
  if (isLoading) return /* @__PURE__ */ jsx("p", { children: "Loading robots..." });
  if (isError) return /* @__PURE__ */ jsx("p", { children: "Error at Fetching Robots" });
  console.log(data);
  return showAddRobot ? /* @__PURE__ */ jsx(AddRobot, { onBack: () => setShowAddRobot(false) }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-200 rounded p-1 mb-2 w-full", children: [
      /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs font-serif", children: "Total Robots : " }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs", children: [
        data.pagination_info.total_records,
        " "
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right",
          onClick: () => setShowAddRobot(true),
          children: " + New Robot"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10", children: data == null ? void 0 : data.records.map((robot) => (
      // <div key={robot.id} className="p-4 border rounded-xl">
      //     <ul className="list-none text-sm space-y-3">
      //         <li>
      //             <span className="font-bold">{robot.robot_name}</span>
      //         </li>
      //         <li className="flex justify-between">
      //             <span className="font-semibold text-[10px]">IP Address</span>
      //             <span className='text-xs'>{robot.ip_address}</span>
      //         </li>
      //         <li className="flex justify-between">
      //             <span className="font-semibold"><MapPin size={12} />
      //             </span>
      //             <span className='text-xs'>Hyderabad</span>
      //         </li>
      //         <li className="flex justify-between">
      //             <span className="font-semibold"><BatteryFull size={12} /></span>
      //             <span className='text-xs'>75%</span>
      //         </li>
      //     </ul>
      // </div>
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative bg-white border shadow-xl rounded-2xl p-4 w-full max-w-xs backdrop-blur-sm transition-transform hover:scale-[1.02]",
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-3 flex items-center justify-between", children: /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-green-800", children: [
              "\u{1F916} ",
              robot.robot_name
            ] }) }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-3 text-gray-700", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-medium", children: "IP Address" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-mono", children: robot.ip_address })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 font-medium text-gray-600", children: [
                  /* @__PURE__ */ jsx(MapPin, { size: 14, className: "text-emerald-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Location" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Hyderabad" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 font-medium text-gray-600", children: [
                  /* @__PURE__ */ jsx(BatteryFull, { size: 14, className: "text-lime-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Battery" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm font-semibold text-lime-700 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-lime-500 animate-pulse" }),
                  "75%"
                ] })
              ] })
            ] })
          ]
        },
        robot.id
      )
    )) }),
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
              /* @__PURE__ */ jsx("option", { value: "5", children: "5 pages" }),
              /* @__PURE__ */ jsx("option", { value: "10", children: "10 pages" }),
              /* @__PURE__ */ jsx("option", { value: "15", children: "15 pages" })
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
            disabled: page === data.pagination_info.total_pages,
            onClick: () => setPage((prev) => prev + 1),
            className: "px-4 py-1 mr-1 text-xs rounded disabled:opacity-50 cursor-pointer bg-gray-200",
            children: "Next"
          }
        )
      ] })
    ] }) })
  ] }) });
}

export { AllRobots as A };
//# sourceMappingURL=allRobots-CpNIlAon.mjs.map
