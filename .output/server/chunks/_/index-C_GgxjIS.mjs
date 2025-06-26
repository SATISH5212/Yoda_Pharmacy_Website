import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';

const LoginPage = async (userlogin) => {
  console.log("user Login ", userlogin);
  const response = await fetch(`https://demetercloud.onrender.com/v1.0/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userlogin)
  });
  const res = await response.json();
  if (response.ok) {
    return res;
  } else {
    throw new Error("Failed to Add User");
  }
};
function Login({ onSwitch }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: LoginPage,
    onSuccess: (res) => {
      console.log("onSuccess ", res.data);
      localStorage.setItem("access_token", res.data.access_token);
      navigate({
        to: "/field"
      });
    }
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    onSubmit: async ({ value }) => {
      const userlogin = {
        email: value.email,
        password: value.password
      };
      mutation.mutate(userlogin);
    }
  });
  return /* @__PURE__ */ jsxs("div", { style: { height: "300px", width: "400px", backgroundColor: "white", marginLeft: "400px", marginTop: "150px", borderRadius: "10px" }, className: "shadow-lg border-0", children: [
    /* @__PURE__ */ jsx(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        },
        children: /* @__PURE__ */ jsxs("div", { className: "ml-5 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "mt-15", children: /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "email",
              children: (field) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                  placeholder: "Email",
                  className: "bg-gray-100 rounded w-90 p-2 text-xs"
                }
              ) })
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex ", children: [
            /* @__PURE__ */ jsx(
              form.Field,
              {
                name: "password",
                children: (field) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: field.state.value,
                    onChange: (e) => field.handleChange(e.target.value),
                    placeholder: "Password",
                    className: "bg-gray-100 rounded w-90 p-2 text-xs"
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "absolute ml-83 mt-2",
                onClick: () => {
                  setShowPassword((prev) => !prev);
                },
                children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsx(Eye, { size: 15 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "mt-2 mr-3 p-2 rounded-xl w-90 text-sm bg-green-300 text-center cursor-pointer",
              type: "submit",
              children: "Login"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-xs", children: [
            /* @__PURE__ */ jsx("span", { children: "Don't have an Account? " }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "text-green-400 text-xs font-bold cursor-pointer",
                onClick: onSwitch,
                children: " Sign Up"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center", autoClose: 3e3 })
  ] });
}
const Registration = async (newStudent) => {
  console.log("newStudent is ", newStudent);
  const response = await fetch(`https://demetercloud.onrender.com/v1.0/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newStudent)
  });
  console.log("response is", response);
  if (!response.ok) {
    throw new Error("Failed to Add User");
  }
  return response.json();
};
function SignIn({ onSwitch }) {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: Registration,
    onSuccess: () => {
      nav({
        to: "/field"
      });
    }
  });
  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: ""
    },
    onSubmit: async ({ value }) => {
      const userAdd = {
        first_name: value.first_name,
        last_name: value.last_name,
        phone: value.phone,
        email: value.email,
        password: value.password
      };
      mutation.mutate(userAdd);
    }
  });
  return /* @__PURE__ */ jsx("div", { style: { height: "320px", width: "400px", backgroundColor: "white", marginLeft: "400px", borderRadius: "10px" }, className: "shadow-lg border-0 mt-35", children: /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      },
      children: /* @__PURE__ */ jsxs("div", { className: "ml-5 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-9", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "first_name",
              children: (field) => /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                  placeholder: "First Name",
                  className: "bg-gray-100 rounded w-44 p-2 text-xs"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "last_name",
              children: (field) => /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: field.state.value,
                  onChange: (e) => field.handleChange(e.target.value),
                  placeholder: "Last Name",
                  className: "bg-gray-100 rounded w-44 p-2 text-xs"
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: "phone",
            children: (field) => /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                placeholder: "Phone",
                className: "bg-gray-100 rounded w-90 p-2 text-xs"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: "email",
            children: (field) => /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                placeholder: "Email",
                className: "bg-gray-100 rounded w-90 p-2 text-xs"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: "password",
            children: (field) => /* @__PURE__ */ jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: field.state.value,
                onChange: (e) => field.handleChange(e.target.value),
                placeholder: "Password",
                className: "bg-gray-100 rounded w-90 p-2 text-xs"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Already have an Account?" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-green-400 text-xs font-bold cursor-pointer",
              onClick: onSwitch,
              children: " Login"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { className: "mt-2 mr-3 p-2 rounded-xl w-90 text-sm bg-green-300 text-center", type: "submit", style: { cursor: "pointer" }, children: "Register" })
      ] })
    }
  ) });
}
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return /* @__PURE__ */ jsx(Fragment, { children: isLogin ? /* @__PURE__ */ jsx(Login, { onSwitch: () => setIsLogin(false) }) : /* @__PURE__ */ jsx(SignIn, { onSwitch: () => setIsLogin(true) }) });
}
const SplitComponent = function Index() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(AuthPage, {}) });
};

export { SplitComponent as component };
//# sourceMappingURL=index-C_GgxjIS.mjs.map
