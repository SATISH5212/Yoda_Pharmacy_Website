import { FormValues } from '@/lib/interfaces/auth'
import { loginAPI } from '@/lib/services/auth'
import { LoginPayload } from '@/types/dataTypes'
// import { useForm } from '@tanstack/react-form'
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from "sonner";
import Cookies from "js-cookie";


export function LoginPage() {
    const navigate = useNavigate();
    const [validation, setValidations] = useState<any>({});
    const [view, setView] = useState(false);
    const handleView = () => setView(!view);
    const [conflictError, setConflictError] = useState<{ message?: string }>({});
    const {
        register,
        handleSubmit,
        clearErrors,
    } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const { mutateAsync: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationKey: ["login-user"],
        retry: false,
        mutationFn: async (data: LoginPayload) => {
            const response = await loginAPI(data);
            return response;
        },
        onSuccess: (response) => {
            const message = response?.data?.message;
            toast.success(message);
            const accessToken = response?.data?.data?.access_token;
            Cookies.set("token", accessToken, { secure: true, sameSite: "strict" });
            localStorage.setItem("authToken", accessToken);
            navigate({
                to: `/field`,
            });
        },
        onError: (error: any) => {
            if (error?.status === 422 || error?.status === 409) {
                const errorMessages = error?.data?.errors || error?.data?.message;
                // setValidations(errorMessages);
            } else if (
                error?.status === 409 ||
                error?.status === 401 ||
                error?.status === 400 ||
                error?.status === 404
            ) {
                setConflictError({ message: error?.data?.message });
            }
        },
    });
    const clearFieldError = (field: keyof FormValues) => {
        setValidations((prev: any) => ({
            ...prev,
            [field]: null,
        }));
        setConflictError({});
        clearErrors(field);
    };

    const onSubmit = (data: FormValues) => {
        mutateLogin(data);
    };
    const tokenlocal = localStorage.getItem("authToken");
    if (tokenlocal) {
        navigate({ to: "/field" });
    }


    return (
        <div style={{ height: "300px", width: "400px", backgroundColor: "white", marginLeft: "400px", marginTop: "150px", borderRadius: '10px' }} className='shadow-lg border-0'>
            <form
                // onSubmit={(e) => {
                //     e.preventDefault()
                //     e.stopPropagation()
                //     handleSubmit(onSubmit)
                // }}
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className='ml-5 flex flex-col gap-4'>
                    <div className='mt-15'>
                        {/* <form.Field
                            name="email"
                            children={(field) => (
                                <>
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Email'
                                        className="bg-gray-100 rounded w-90 p-2 text-xs"
                                    />
                                </>
                            )}
                        /> */}
                        <input
                            placeholder="Enter your email"
                            className="h-full outline-none p-2 w-full bg-inherit"
                            type="text"
                            autoComplete="off"
                            {...register("email", {
                                onChange: (e: any) => {
                                    clearFieldError("email");
                                },
                            })}
                        />
                        {validation.email && (
                            <p className="text-red-500 text-xs">{validation.email}</p>
                        )}
                    </div>

                    <div className='flex '>
                        {/* <form.Field
                            name="password"

                            children={(field) => (
                                <>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Password'
                                        className="bg-gray-100 rounded w-90 p-2 text-xs"
                                    />
                                </>
                            )}
                        /> */}
                        <input
                            placeholder="Enter your Password"
                            className="h-full outline-none p-2 w-full bg-inherit font-light"
                            type={view ? "text" : "password"}
                            autoComplete="new-password"
                            {...register("password", {
                                onChange: (e: any) => {
                                    clearFieldError("password");
                                },
                            })}
                        />
                        {validation.password && (
                            <p className="text-red-500 text-xs">{validation.password}</p>
                        )}
                        {conflictError?.message && (
                            <p className="text-red-500 text-xs">
                                {conflictError.message}
                            </p>
                        )}

                        <button type="button" className='absolute ml-83 mt-2' onClick={() => {
                            setShowPassword(prev => !prev)
                        }}
                        // const input = document.getElementById("input_password");
                        // if (input instanceof HTMLInputElement) {
                        //     input.type = input.type === "password" ? "text" : "password";
                        // }

                        >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full text-white bg-primary p-2 rounded-full disabled:opacity-50 flex items-center justify-center text-sm 3xl:text-base"
                        disabled={isPendingLogin}
                    >
                        {isPendingLogin ? (
                            <>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>


                    <div className='text-xs'>
                        <span>Don't have an Account? </span>
                        <button
                            type="button"
                            className="text-green-400 text-xs font-bold cursor-pointer"
                        // onClick={onSwitch}
                        > Sign Up
                        </button>
                    </div>

                </div>
            </form>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    )
}
