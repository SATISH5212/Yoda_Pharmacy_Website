import { AuthSwitchProps } from '@/types/dataTypes'
import { SignInPayLoad } from '@/types/signinTypes'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

const Registration = async (newStudent:SignInPayLoad) => {
    console.log("newStudent is ", newStudent)
    const response = await fetch(`https://demetercloud.onrender.com/v1.0/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newStudent),
    })
    console.log("response is", response)
    if (!response.ok) {
        throw new Error('Failed to Add User')
    }
    return response.json()
}


function SignIn({ onSwitch } : AuthSwitchProps) {

    const nav=useNavigate();
    const [showPassword, setShowPassword] = useState(false); 

    const mutation = useMutation({
        mutationFn: Registration,
        onSuccess: () => {
              nav({
                to: "/field"
            })
        },
    })

    const form = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            const userAdd = {
                first_name: value.first_name,
                last_name: value.last_name,
                phone: value.phone,
                email: value.email,
                password: value.password
            }
            mutation.mutate(userAdd)
        }
    })

    return (
        <div style={{ height: "320px", width: "400px", backgroundColor: "white", marginLeft: "400px", borderRadius: "10px" }} className='shadow-lg border-0 mt-35'>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >

                <div className='ml-5 flex flex-col gap-4'>
                    <div className='flex gap-2 mt-9'>
                        <div>
                            <form.Field
                                name="first_name"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='First Name'
                                        className="bg-gray-100 rounded w-44 p-2 text-xs"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <form.Field
                                name="last_name"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Last Name'
                                        className="bg-gray-100 rounded w-44 p-2 text-xs"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <form.Field
                        name="phone"
                        children={(field) => (
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder='Phone'
                                className="bg-gray-100 rounded w-90 p-2 text-xs"
                            />
                        )}
                    />

                    <form.Field
                        name="email"
                        children={(field) => (
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder='Email'
                                className="bg-gray-100 rounded w-90 p-2 text-xs"
                            />
                        )}
                    />

                    <form.Field
                        name="password"
                        children={(field) => (
                            <input
                                type={showPassword ? "text" : "password"}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder='Password'
                                className="bg-gray-100 rounded w-90 p-2 text-xs"
                            />
                        )}
                         
                    />

                    <div className='flex gap-1'>
                        <span className='text-xs'>Already have an Account?</span>
                        <button
                            type="button"
                            className="text-green-400 text-xs font-bold cursor-pointer"
                            onClick={onSwitch}
                        > Login
                        </button>
                    </div>

                    <button className='mt-2 mr-3 p-2 rounded-xl w-90 text-sm bg-green-300 text-center' type='submit' style={{ cursor: 'pointer' }}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;