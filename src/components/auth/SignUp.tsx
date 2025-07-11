import { FormValues, SignUpPayload, ValidationErrors } from '@/lib/interfaces/auth'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { SignUpAPI } from '@/lib/services/auth'

export function Register() {
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
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            password: "",
        },
    });

    const { mutateAsync: mutateRegister, isPending: isPendingLogin } = useMutation({
        mutationKey: ["SignUp-user"],
        retry: false,
        mutationFn: async (data: FormValues) => {
            const response = await SignUpAPI(data);
            return response;
        },

        onSuccess: (response) => {
            const message = response?.data?.message;
            toast.success(message);
            // const accessToken = response?.data?.data?.access_token;
            // Cookies.set("token", accessToken, { secure: true, sameSite: "strict" });
            // localStorage.setItem("authToken", accessToken);
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
        const payload: FormValues = {
            ...data,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
            password: data.password,
        };
        mutateRegister(payload);
    };


    return (
        <>
            <div
                className="h-screen w-screen flex text-xs justify-center bg-cover bg-center bg-no-repeat"
            // style={{ backgroundImage: "url('/assets/monarchTractor.jpg')" }}
            >

                {/* Left Image Panel */}
                {/* <div className="w-8/12 rounded-xl overflow-hidden m-4">
                    <img
                        className="w-full h-full object-cover"
                        src="/assets/image.webp"
                        alt="Main Image"
                    />
                </div> */}

                {/* Right Form Panel */}
                <div className="w-5/12 flex flex-col items-center gap-1 h-dvh px-24 box-border  justify-center">
                    <div>
                        <img src="/src/components/svg/logo.svg" alt="Logo" className="mb-3" />
                    </div>

                    <div className="w-full space-y-5 text-35353d text-xs font-normal border p-2 rounded-2xl bg-white shadow-lg ">
                        <div className="text-center">
                            <div className="text-xl text-title font-normal">Sign Up</div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Fields */}
                            <div className="flex gap-2">
                                <div className="flex items-center w-full rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                    {/* <User size={16} /> */}
                                    <input

                                        placeholder="First Name"
                                        className="h-full outline-none p-2 w-full bg-inherit"
                                        type="text"
                                        {...register('first_name', {
                                            onChange: () => clearFieldError('first_name'),
                                        })}
                                    />
                                </div>


                                <div className="flex items-center w-full rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                    {/* <User size={16} /> */}
                                    <input
                                        placeholder="Last Name"
                                        className="h-full outline-none p-2 w-full bg-inherit"
                                        type="text"
                                        {...register('last_name', {
                                            onChange: () => clearFieldError('last_name'),
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div className="flex items-center w-full rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <Phone size={14} />
                                <input
                                    placeholder="Phone Number"
                                    className="h-full outline-none p-2 w-full bg-inherit"
                                    type="text"
                                    {...register('phone', {
                                        onChange: () => clearFieldError('phone'),
                                    })}
                                />
                            </div>

                            {/* Email Field */}
                            <div className="flex items-center w-full rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <Mail size={16} />
                                <input
                                    placeholder="Enter your email"
                                    className="h-full outline-none p-2 w-full bg-inherit"
                                    type="email"
                                    {...register('email', {
                                        onChange: () => clearFieldError('email'),
                                    })}
                                />
                            </div>
                            {validation.email && (
                                <p className="text-red-500 text-xs">{validation.email}</p>
                            )}

                            {/* Password Field */}
                            <div className="space-y-1 text-title font-light">
                                <div className="font-normal">Password</div>
                                <div className="flex items-center w-full rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                    <Lock size={17} />
                                    <input
                                        placeholder="Enter your Password"
                                        className="h-full outline-none p-2 w-full bg-inherit font-light"
                                        type={view ? 'text' : 'password'}
                                        {...register('password', {
                                            onChange: () => clearFieldError('password'),
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="pr-2.5"
                                        onClick={() => setView((prev) => !prev)}
                                    >
                                        {view ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {validation.password && (
                                    <p className="text-red-500 text-xs">{validation.password}</p>
                                )}
                                {conflictError.message && (
                                    <p className="text-red-500 text-xs">{conflictError.message}</p>
                                )}
                            </div>


                            <div className="text-center pt-5 space-y-2">
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary p-2 rounded-full disabled:opacity-50 flex items-center justify-center text-sm cursor-pointer"
                                    disabled={isPendingLogin}
                                >
                                    {isPendingLogin ? 'Registering...' : 'Register'}
                                </button>

                                <div className="text-xs">
                                    <span>Already have an account?</span>
                                    <button
                                        type="button"
                                        className="text-green-400 font-bold ml-1 cursor-pointer"
                                        onClick={() => navigate({ to: '/' })}
                                    >
                                        Login
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster richColors position="top-right" />
        </>
    );
}

export default Register
