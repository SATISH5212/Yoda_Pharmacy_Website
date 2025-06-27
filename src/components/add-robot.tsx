import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AddRobotProps, RobotConfig } from '@/types/dataTypes'
import { ToastContainer, toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL


const addRobot = async (robotConfig: RobotConfig) => {
    const response = await fetch(`${BASE_URL}/robots`, {
        method: "POST",
        headers: new Headers({
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }),
        body: JSON.stringify(robotConfig),


    })
    return response.json()
}


export default function AddRobot({ onBack }: AddRobotProps) {

    const notify = () => toast("Robot has been added Successfully !")
    const form = useForm({
        defaultValues: {
            robot_uuid: "a1b2c3d4-5678-4def-9012-3456abcdef12",
            robot_name: "robot-1",
            robot_type: 'Spraying',
            hardware_version: "v2.1",
            software_version: "v3.1",
            deploy_id: "9b57b8a6-3cf7-4b60-b69b-83a43a6c19ff",
            firmware_version: 'v4.1',
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
            }
            mutation.mutate(robotConfig)
        }
    })


    const mutation = useMutation({
        mutationFn: addRobot,
        onSuccess: () => {
            notify()
        },
    })

    // const { data, isLoading } = useQuery<{ products: Product[] }>({
    //     queryKey: ['robot_type'],
    //     queryFn: async () => {
    //         const res = await axios.get("https://dummyjson.com/products")
    //         return res.data
    //     }
    // })


    return (
        <div style={{ height: "250px", width: "1000px", backgroundColor: "white", marginLeft: "100px", marginTop: "10px", borderRadius: '10px' }}>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}

            >

                <div className='flex gap-2 h-61'>
                    <div className='flex flex-col gap-1 p-3 border-1 rounded-xl w-110'>
                        <div>
                            <label htmlFor="" className='text-xs  text-gray-400'>Robot Name</label><br />
                            <form.Field
                                name="robot_name"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='robo-1'
                                        className=" bg-gray-100 rounded w-105  p-1.5 text-xs "
                                        required

                                    />
                                )}
                            />
                        </div>

                        <div>
                            <label htmlFor="" className='text-xs text-gray-400'>Robot UUID</label><br />
                            <form.Field
                                name="robot_uuid"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='9xxxxxxxx-3xxx-4xxx-bxx-8xxxxxxxxxf'
                                        className="bg-gray-100 rounded w-105  p-1.5 text-xs"
                                        required
                                    />
                                )}
                            />
                        </div>




                        <div >
                            <label htmlFor="" className='text-xs  text-gray-400'>Deploy ID</label><br />
                            <form.Field
                                name="deploy_id"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Dxxxxx-xxx-xxx-xxx-xxx'
                                        className="bg-gray-100 rounded w-105 p-1.5 text-[10px] "
                                        required
                                    />
                                )}
                            />
                        </div>



                        <div className='flex gap-1'>
                            <div>
                                <label htmlFor="" className='text-xs  text-gray-400'>Robot Type</label><br />
                                <form.Field
                                    name="robot_type"
                                    children={(field) => (
                                        <select
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="bg-gray-100 rounded w-52  p-1.5 text-xs"
                                            
                                        >
                                            <option value="">Robot Type</option>
                                            {/* {

                                                isLoading ? (<option value="">Loading...</option>) :
                                                    (
                                                        data?.products?.map((info) => (
                                                            <option key={info.id} value={info.id}>{info.brand}</option>
                                                        ))
                                                    )

                                            } */}
                                        </select>
                                    )}
                                />
                            </div>

                            <div>
                                <label htmlFor="" className='text-xs  text-gray-400'>Robot Model</label><br />
                                <form.Field
                                    name="robot_model"
                                    children={(field) => (
                                        <input
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder='Agribot HV-500'
                                            className='bg-gray-100 rounded w-52  p-1.5 text-[10px]'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>

                        <div className='flex flex-col gap-4 p-2 border-1 rounded-xl w-130 h-31'>

                            <div className='text-xs'>Technical Configuration</div>
                            <div className='flex gap-3'>
                                <div>
                                    <label htmlFor="" className='text-xs  text-gray-400'>Hardware Version</label><br />
                                    <form.Field
                                        name="hardware_version"
                                        children={(field) => (
                                            <input
                                                type="text"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder='v2.3.1'
                                                className=" bg-gray-100 rounded w-40  p-1.5 text-[10px]"
                                                required
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="" className='text-xs  text-gray-400'>Software Version</label><br />
                                    <form.Field
                                        name="software_version"
                                        children={(field) => (
                                            <input
                                                type="text"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder='v3.4.1'
                                                className=" bg-gray-100 rounded w-40  p-1.5 text-[10px]"
                                                required
                                            />
                                        )}
                                    />
                                </div>


                                <div>
                                    <label htmlFor="" className='text-xs  text-gray-400'>Firm Version</label><br />
                                    <form.Field
                                        name="firmware_version"
                                        children={(field) => (
                                            <input
                                                type="text"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder='v6.1.1'
                                                className=" bg-gray-100 rounded w-40 p-1.5 text-[10px]"
                                                required
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 border-1 p-2 rounded-xl w-130 h-28'>
                            <div className='text-xs'>Network Configuration</div>
                            <div className='flex gap-2'>
                                <div>
                                    <label htmlFor="" className='text-xs  text-gray-400'>IP Address</label><br />
                                    <form.Field
                                        name="ip_address"
                                        children={(field) => (
                                            <input
                                                type="text"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder='e.g 198.123.19.1'
                                                className="bg-gray-100 rounded w-62 p-1.5 text-[10px]"
                                                required
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="" className='text-xs  text-gray-400'>Mac Address</label><br />
                                    <form.Field
                                        name="mac_address"
                                        children={(field) => (
                                            <input
                                                type="text"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder='D8:9E:F3:12:AB:CD'
                                                className='bg-gray-100 rounded w-62 p-1.5 text-[10px]'
                                                required
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 mt-3 mr-8 float-right'>
                    <button className='px-5 py-1 border-1 rounded text-[10px]  text-black  text-center cursor-pointer' type="button"
                        onClick={onBack}
                    >Back</button>
                    <button className='px-2 py-1 rounded text-[10px] bg-[#0ed78d] text-white text-center cursor-pointer' type="submit" >Add Robot</button>
                </div>
                <ToastContainer />
            </form>
        </div>
    )
}


