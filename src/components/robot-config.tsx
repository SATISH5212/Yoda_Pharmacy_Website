import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { RobotConfig } from '@/types/dataTypes'
import { BASE_URL } from '@/config/appConfig'



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


export default function MissionConfig() {

    const form = useForm({
        defaultValues: {
            robot_uuid: '',
            robot_name: '',
            robot_type: '',
            hardware_version: '',
            software_version: '',
            deploy_id: '',
            firmware_version: '',
            ip_address: '',
            mac_address: '',
            robot_model: ''
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
            alert("Robot config Added!")
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
        <div style={{ height: "520px", width: "400px", backgroundColor: "white", marginLeft: "100px", borderRadius: '10px' }} className='shadow-lg border-0'>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div className='ml-5  flex flex-col gap-4'>

                    <div className='mb-1 mt-4'>
                        <h1 className='text-bold text-center font-bold'>Robot Configuration</h1>
                    </div>

                    <div>
                        <form.Field
                            name="robot_name"
                            children={(field) => (
                                <input
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Robot Name'
                                    className=" bg-gray-100 rounded w-90  p-2 text-xs"
                                    required

                                />
                            )}
                        />
                    </div>

                    <div>
                        <form.Field
                            name="robot_uuid"
                            children={(field) => (
                                <input
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Robot UUID'
                                    className="bg-gray-100 rounded w-90 p-2 text-xs "
                                    required
                                />
                            )}
                        />
                    </div>



                    <div>
                        <form.Field
                            name="deploy_id"
                            children={(field) => (
                                <input
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Deploy ID'
                                    className="bg-gray-100 rounded w-90 p-2 text-xs "
                                    required
                                />
                            )}
                        />
                    </div>




                    <div className='flex gap-2 mt-1'>
                        <div>
                            <form.Field
                                name="robot_type"
                                children={(field) => (
                                    <select
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="bg-gray-100 rounded w-44 p-2 text-xs"
                                        required
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
                            <form.Field
                                name="robot_model"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Robot Model'
                                        className='bg-gray-100 rounded w-44 p-2 text-xs'
                                        required
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex gap-2 mt-1'>
                        <div>
                            <form.Field
                                name="hardware_version"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Hardware Version'
                                        className=" bg-gray-100 rounded w-44 p-2 text-xs"
                                        required
                                    />
                                )}
                            />
                        </div>

                        <div>
                            <form.Field
                                name="software_version"
                                children={(field) => (
                                    <input
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder='Software Version'
                                        className=" bg-gray-100 rounded w-44 p-2 text-xs"
                                        required
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <form.Field
                            name="firmware_version"
                            children={(field) => (
                                <input
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='FirmWare Version'
                                    className=" bg-gray-100 rounded w-90 p-2 text-xs"
                                    required
                                />
                            )}
                        />
                    </div>

                    <div>
                        <form.Field
                            name="ip_address"
                            children={(field) => (
                                <input
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='IP address'
                                    className="bg-gray-100 rounded w-90 p-2 text-xs"
                                    required
                                />
                            )}
                        />
                    </div>

                    <div>
                        <form.Field
                            name="mac_address"
                            children={(field) => (
                                <input
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Mac Address'
                                    className='bg-gray-100 rounded w-90 p-2 text-xs'
                                    required
                                />
                            )}
                        />
                    </div>

                    <button className='mt-2 mr-3 p-2 rounded-xl w-90 text-sm bg-green-300 text-center' type="submit" style={{ cursor: 'pointer' }} >Add Robot</button>

                </div>
            </form>
        </div>
    )
}


