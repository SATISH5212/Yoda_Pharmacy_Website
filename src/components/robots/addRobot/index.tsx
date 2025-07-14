import { RobotFormData } from '@/lib/interfaces/robots'
import { addRobotDataAPI } from '@/lib/services/robots'
import { RobotConfig } from '@/types/dataTypes'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
const AddRobot = () => {
    const [apiErrors, setApiErrors] = useState<Record<string, string>>({})
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<RobotFormData>({
        defaultValues: {
            robot_uuid: "",
            robot_name: "",
            robot_type: "",
            hardware_version: "",
            software_version: "",
            deploy_id: "",
            firmware_version: "",
            ip_address: "",
            mac_address: "",
            robot_model: ""
        }
    })

    const { mutate: mutateAddRobot, isPending } = useMutation({
        mutationKey: ["add-robot"],
        retry: false,
        mutationFn: async (data: RobotConfig) => {
            const response = await addRobotDataAPI(data);
            return response;
        },
        onSuccess: (response) => {
            reset();
            setApiErrors({});
            toast.success("Robot added successfully!");
        },
        onError: (error: any) => {
            if (error?.status === 422 || error?.status === 409) {
                const errorMessages = error?.data?.errors || {};
                setApiErrors(errorMessages);

                if (error?.data?.message) {
                    toast.error(error.data.message);
                }
            } else {
                toast.error("Failed to add robot. Please try again.");
            }
        },
    });

    const onSubmit = (data: RobotFormData) => {
        setApiErrors({});
        const robotConfig: RobotConfig = {
            robot_uuid: data.robot_uuid,
            robot_name: data.robot_name,
            robot_type: data.robot_type,
            hardware_version: data.hardware_version,
            software_version: data.software_version,
            deploy_id: data.deploy_id,
            firmware_version: data.firmware_version,
            ip_address: data.ip_address,
            mac_address: data.mac_address,
            robot_model: data.robot_model
        }
        mutateAddRobot(robotConfig)
    }

    return (
        <div style={{
            height: "auto",
            width: "1000px",
            backgroundColor: "white",
            marginLeft: "100px",
            marginTop: "10px",
            borderRadius: '10px',
            padding: '20px'
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-2 '>
                    <div className='flex flex-col gap-1 p-3 border-1 rounded-xl w-110'>
                        <div>
                            <label htmlFor="robot_name" className='text-xs text-gray-400'>Robot Name</label><br />
                            <input
                                type="text"
                                {...register("robot_name")}
                                placeholder='robo-1'
                                className={`bg-gray-100 rounded w-105 p-1.5 text-xs ${apiErrors.robot_name ? 'border-red-500 border' : ''}`}
                            />
                            {apiErrors.robot_name && (
                                <span className='text-red-500 text-[10px] mt-1'>{apiErrors.robot_name}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="robot_uuid" className='text-xs text-gray-400'>Robot UUID</label><br />
                            <input
                                type="text"
                                {...register("robot_uuid")}
                                placeholder='9xxxxxxxx-3xxx-4xxx-bxx-8xxxxxxxxxf'
                                className={`bg-gray-100 rounded w-105 p-1.5 text-xs ${apiErrors.robot_uuid ? 'border-red-500 border' : ''}`}
                            />
                            {apiErrors.robot_uuid && (
                                <span className='text-red-500 text-[10px] mt-1'>{apiErrors.robot_uuid}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="deploy_id" className='text-xs text-gray-400'>Deploy ID</label><br />
                            <input
                                type="text"
                                {...register("deploy_id")}
                                placeholder='Dxxxxx-xxx-xxx-xxx-xxx'
                                className={`bg-gray-100 rounded w-105 p-1.5 text-[10px] ${apiErrors.deploy_id ? 'border-red-500 border' : ''}`}
                            />
                            {apiErrors.deploy_id && (
                                <span className='text-red-500 text-[10px] mt-1'>{apiErrors.deploy_id}</span>
                            )}
                        </div>

                        <div className='flex gap-1'>
                            <div>
                                <label htmlFor="robot_type" className='text-xs text-gray-400'>Robot Type</label><br />
                                <select
                                    {...register("robot_type")}
                                    className={`bg-gray-100 rounded w-52 p-1.5 text-xs ${apiErrors.robot_type ? 'border-red-500 border' : ''}`}
                                >
                                    <option value="">Select Robot Type</option>
                                    <option value="Spraying">Spraying</option>
                                    <option value="Harvesting">Harvesting</option>
                                    <option value="Monitoring">Monitoring</option>
                                    <option value="Weeding">Weeding</option>
                                </select>
                                {apiErrors.robot_type && (
                                    <span className='text-red-500 text-[10px] mt-1 block'>{apiErrors.robot_type}</span>
                                )}
                            </div>

                            <div>
                                <label htmlFor="robot_model" className='text-xs text-gray-400'>Robot Model</label><br />
                                <input
                                    type="text"
                                    {...register("robot_model")}
                                    placeholder='Agribot HV-500'
                                    className={`bg-gray-100 rounded w-52 p-1.5 text-[10px] ${apiErrors.robot_model ? 'border-red-500 border' : ''}`}
                                />
                                {apiErrors.robot_model && (
                                    <span className='text-red-500 text-[10px] mt-1 block'>{apiErrors.robot_model}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-4 p-2 border-1 rounded-xl w-130 h-auto'>
                            <div className='text-xs'>Technical Configuration</div>
                            <div className='flex gap-3'>
                                <div>
                                    <label htmlFor="hardware_version" className='text-xs text-gray-400'>Hardware Version</label><br />
                                    <input
                                        type="text"
                                        {...register("hardware_version")}
                                        placeholder='v2.3.1'
                                        className={`bg-gray-100 rounded w-40 p-1.5 text-[10px] ${apiErrors.hardware_version ? 'border-red-500 border' : ''}`}
                                    />
                                    {apiErrors.hardware_version && (
                                        <span className='text-red-500 text-[10px] mt-1 block'>{apiErrors.hardware_version}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="software_version" className='text-xs text-gray-400'>Software Version</label><br />
                                    <input
                                        type="text"
                                        {...register("software_version")}
                                        placeholder='v3.4.1'
                                        className={`bg-gray-100 rounded w-40 p-1.5 text-[10px] ${apiErrors.software_version ? 'border-red-500 border' : ''}`}
                                    />
                                    {apiErrors.software_version && (
                                        <span className='text-red-500 text-[10px] mt-1 block'>{apiErrors.software_version}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="firmware_version" className='text-xs text-gray-400'>Firmware Version</label><br />
                                    <input
                                        type="text"
                                        {...register("firmware_version")}
                                        placeholder='v6.1.1'
                                        className={`bg-gray-100 rounded w-40 p-1.5 text-[10px] ${apiErrors.firmware_version ? 'border-red-500 border' : ''}`}
                                    />
                                    {apiErrors.firmware_version && (
                                        <span className='text-red-500 text-[10px] mt-1 block'>{apiErrors.firmware_version}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 border-1 p-2 rounded-xl w-130 h-auto'>
                            <div className='text-xs'>Network Configuration</div>
                            <div className='flex gap-2'>
                                <div>
                                    <label htmlFor="ip_address" className='text-xs text-gray-400'>IP Address</label><br />
                                    <input
                                        type="text"
                                        {...register("ip_address")}
                                        placeholder='e.g 198.123.19.1'
                                        className={`bg-gray-100 rounded w-62 p-1.5 text-[10px] ${apiErrors.ip_address ? 'border-red-500 border' : ''}`}
                                    />
                                    {apiErrors.ip_address && (
                                        <span className='text-red-500 text-[10px] mt-1 block'>{apiErrors.ip_address}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="mac_address" className='text-xs text-gray-400'>Mac Address</label><br />
                                    <input
                                        type="text"
                                        {...register("mac_address")}
                                        placeholder='D8:9E:F3:12:AB:CD'
                                        className={`bg-gray-100 rounded w-62 p-1.5 text-[10px] ${apiErrors.mac_address ? 'border-red-500 border' : ''}`}
                                    />
                                    {apiErrors.mac_address && (
                                        <span className='text-red-500 text-[10px] mt-1 block'>{apiErrors.mac_address}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 mt-3 mr-8 float-right'>
                    <button
                        className='px-5 py-1 border-1 rounded text-[10px] text-black text-center cursor-pointer'
                        type="button"
                        onClick={() => {
                            reset();
                            setApiErrors({});
                        }}
                    >
                        Reset
                    </button>
                    <button
                        className='px-2 py-1 rounded text-[10px] bg-[#0ed78d] text-white text-center cursor-pointer disabled:opacity-50'
                        type="submit"
                        disabled={isPending || isSubmitting}
                    >
                        {isPending || isSubmitting ? 'Adding...' : 'Add Robot'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddRobot