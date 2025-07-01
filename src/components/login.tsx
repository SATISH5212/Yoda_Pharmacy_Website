import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { EyeOff, Eye } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import SignIn from './signin'
import { LoginPayload } from '@/types/dataTypes'
import { AuthSwitchProps } from '@/types/dataTypes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'



const LoginPage = async (userlogin: LoginPayload) => {

    const response = await fetch(`https://demetercloud.onrender.com/v1.0/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userlogin),
    })
    const res = await response.json();
    if (response.ok) {
        return res;
    }
    else {
        throw new Error('Failed to Add User')
    }
}

export default function Login({ onSwitch }: AuthSwitchProps) {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const mutation = useMutation({
        mutationFn: LoginPage,
        onSuccess: (res) => {
            // toast.success(res?.data?.message || "Login successful!");
            // console.log("onSuccess ", res.data);

            localStorage.setItem("access_token", res.data.access_token);
            navigate({
                to: "/fields"
            })

        },
    })

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            const userlogin = {
                email: value.email,
                password: value.password
            }
            mutation.mutate(userlogin)
        }

    })


    return (
        <div style={{ height: "300px", width: "400px", backgroundColor: "white", marginLeft: "400px", marginTop: "150px", borderRadius: '10px' }} className='shadow-lg border-0'>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >

                <div className='ml-5 flex flex-col gap-4'>
                    <div className='mt-15'>
                        <form.Field
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
                        />
                    </div>

                    <div className='flex '>
                        <form.Field
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
                        />

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


                    <button className='mt-2 mr-3 p-2 rounded-xl w-90 text-sm bg-green-300 text-center cursor-pointer' type="submit"
                    >Login</button>


                    <div className='text-xs'>
                        <span>Don't have an Account? </span>
                        <button
                            type="button"
                            className="text-green-400 text-xs font-bold cursor-pointer"
                            onClick={onSwitch}
                        > Sign Up
                        </button>
                    </div>

                </div>
            </form>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    )
}
