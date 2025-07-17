import { FormValues } from '@/lib/interfaces/auth';
import { loginAPI } from '@/lib/services/auth';
import { LoginPayload } from '@/types/dataTypes';
// import { useForm } from '@tanstack/react-form'
import { ValidationErrors } from '@/lib/interfaces/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import Cookies from "js-cookie";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { toast, Toaster } from "sonner";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';


export function LoginPage() {
    const navigate = useNavigate();
    const [validation, setValidations] = useState<ValidationErrors>({});
    const [view, setView] = useState(false);
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
            const refreshToken = response?.data?.data?.refresh_token;
            Cookies.set("token", accessToken, { secure: true, sameSite: "strict" });
            Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "strict" });
            localStorage.setItem("userCredentials", JSON.stringify(response?.data?.data?.user));
            navigate({
                to: `/all-fields`,
            });
        },

        onError: (error: any) => {
            if (error?.status === 422 || error?.status === 409) {
                const errorMessages = error?.data?.errors || error?.data?.message;
                setValidations(errorMessages);

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
    return (
        <>
            <div className="h-screen w-screen flex text-xs bg-white">
                <div className="w-8/12 rounded-xl overflow-hidden m-4">
                    <img
                        className="w-full h-full object-cover"
                        src="/assets/monarchTractor.jpg"
                        alt="Main Image"
                    />
                </div>
                <div className="w-4/12 flex flex-col items-center gap-10 h-dvh px-24 box-border justify-center">
                    <div>
                        <img src="/src/components/svg/logo.svg" alt="Logo" className="mb-3" />
                    </div>

                    <div className="w-full space-y-5 text-35353d text-xs font-normal">
                        <div className="text-center">
                            <div className="text-xl 3xl:text-2xl text-title font-normal">Sign In</div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-1 text-title text-smd 3xl:text-base font-light">
                                <div className="font-normal">Email</div>
                                <div className="flex items-center w-full rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                    <Mail size={16} />
                                    <input
                                        placeholder="Enter your email"
                                        className="h-full outline-none p-2 w-full bg-inherit"
                                        type="text"
                                        autoComplete="off"
                                        {...register("email", {
                                            onChange: (e) => {
                                                clearFieldError("email");
                                            },
                                        })}
                                    />
                                </div>
                                {validation.email && (
                                    <p className="text-red-500 text-xs">{validation.email}</p>
                                )}
                            </div>

                            <div className="space-y-1 text-title text-smd 3xl:text-base ase h-full font-light">
                                <div className="font-normal">Password</div>
                                <div className="flex items-center w-full h-full rounded-md border border-e9e9e9 pl-2 bg-f9f9f9">
                                    <Lock size={17} />
                                    <input
                                        placeholder="Enter your Password"
                                        className="h-full outline-none p-2 w-full bg-inherit font-light"
                                        type={view ? "text" : "password"}
                                        autoComplete="new-password"
                                        {...register("password", {
                                            onChange: (e) => {
                                                clearFieldError("password");
                                            },
                                        })}
                                    />

                                    <button
                                        type="button"
                                        className="pr-2.5 overflow-visible"
                                        onClick={() => {
                                            setView((prev) => !prev);

                                        }}>
                                        {view ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {validation.password && (
                                    <p className="text-red-500 text-xs">{validation.password}</p>
                                )}
                                {conflictError?.message && (
                                    <p className="text-red-500 text-xs">
                                        {conflictError.message}
                                    </p>
                                )}
                            </div>

                            <div className="text-center pt-5 space-y-2">
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
                                        onClick={() => {
                                            navigate({ to: "/sign-up" });
                                        }
                                        }
                                    > Sign Up
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster richColors position="top-right" />
        </>
    )
}