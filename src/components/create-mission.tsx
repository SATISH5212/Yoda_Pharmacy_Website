import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { use, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { ValidationErrors, missionFormValues } from '@/lib/interfaces/auth';
import { CreateMissionAPI, FieldsAPI, RobotsAPI } from '@/lib/services/auth';

export function CreateMission() {
    const navigate = useNavigate();
    const [validation, setValidations] = useState<ValidationErrors>({});

    const {
        register,
        handleSubmit,
        clearErrors,
    } = useForm<missionFormValues>({
        defaultValues: {
            mission_name: '',
            // robot_id: '',
            mission_type: '',
            //  field_id: undefined,
            buffer_zone_width: '',
            row_spacing: '',
        },
    });


    // const{data: robots, isPending: isPendingRobots} = useQuery({
    //     queryKey: ['robots'],
    //     queryFn: async () => {
    //         const response = await RobotsAPI();
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch robots');
    //         }
    //         return response;
    //     },
    //     retry: false,
    // })
    // const{data: fields, isPending: isPendingFields} = useQuery({
    //     queryKey: ['fields'],
    //     queryFn: async () => {

    //         const response = await FieldsAPI(data);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch fields');
    //         }
    //         return response;
    //     },
    //     retry: false,
    // })

    const { mutateAsync: mutateCreateMission, isPending: isPendingMission } = useMutation({
        mutationKey: ['create-mission'],
        retry: false,
        mutationFn: async (data: missionFormValues) => {
            console.log(data, "daaaa")
            const payload = {
                mission_name: data.mission_name,
                mission_type: data.mission_type ?? "",
                robot_id: data.robot_id,
                field_id: Number(data.field_id),
                buffer_zone_width: data.buffer_zone_width,
                row_spacing: data.row_spacing,
            };
            const response = await CreateMissionAPI(payload);
            return response;

        },

        // onSuccess : () =>{
        //     toast.success('Mission created successfully');
        //     navigate({
        //         to: `/fields`,
        //     });
        // },

        onError: (error: any) => {
            console.log('Create mission error', error);
            if (error?.status === 422 || error?.status === 409) {
                const errorMessages = error?.data?.errors || error?.data?.message;
                setValidations(errorMessages);
                console.log('Validation error', validation);
            } else if (
                error?.status === 409 ||
                error?.status === 401 ||
                error?.status === 400 ||
                error?.status === 404
            ) {
                toast.error('An error occurred while creating the mission.');
            }
        },
    });

    const clearFieldError = (field: keyof missionFormValues) => {
        setValidations((prev: any) => ({
            ...prev,
            [field]: null,
        }));

        clearErrors(field);
    };

    const onSubmit = (data: missionFormValues) => {
        const payload: missionFormValues = {
            ...data,
            mission_name: data.mission_name,
            mission_type: data.mission_type,
            robot_id: data.robot_id,
            field_id: data.field_id,
            buffer_zone_width: data.buffer_zone_width,
            row_spacing: data.row_spacing,
        };
        mutateCreateMission(payload);
    };

    return (
        <>
            <div className="w-4/12 space-y-5 text-xs text-35353d font-normal border p-4 rounded-2xl bg-white shadow-lg m-auto mt-5">
                <div className="text-center text-xl font-normal text-title">Create Mission</div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex space-x-2">
                        <div className="w-1/2 space-y-1">
                            <label className="text-xs font-medium">Mission Name</label>

                            <div className="flex items-center rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <input
                                    placeholder="Enter mission name"
                                    className="w-full p-2 outline-none bg-inherit"
                                    type="text"
                                    {...register('mission_name', {
                                        onChange: () => clearFieldError('mission_name'),
                                    })}
                                />
                            </div>

                            {validation.mission_name && (
                                <p className="text-red-500 text-xs">{validation.mission_name}</p>
                            )}
                        </div>

                        <div className='w-1/2 space-y-1'>
                            <label className="text-xs font-medium">Mission Type</label>
                            <div className="flex items-center rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <select
                                    className="w-full p-2 outline-none bg-inherit"
                                    {...register('mission_type', {
                                        onChange: () => clearFieldError('mission_type'),
                                    })}
                                >
                                    <option value="" disabled>Select Mission Type</option>
                                    <option value="planting">Planting</option>
                                    <option value="harvesting">Harvesting</option>
                                    <option value="weeding">Weeding</option>
                                </select>
                            </div>
                            {validation.mission_type && (
                                <p className="text-red-500 text-xs">{validation.mission_type}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2 space-y-1">
                            <label className="text-xs font-medium"> Robot ID</label>
                            <div className="flex items-center rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <select
                                    className="w-full p-2 outline-none bg-inherit"
                                    defaultValue=""
                                    {...register('robot_id', {
                                        onChange: () => clearFieldError('robot_id'),
                                    })}
                                >
                                    <option value="" disabled>Robot ID</option>
                                    <option value="robot1">1</option>
                                    <option value="robot2">2</option>
                                    <option value="robot3">3</option>
                                </select>
                            </div>
                        </div>

                        <div className="w-1/2 space-y-1">
                            <label className="text-xs font-medium">Field Id</label>
                            <div className="flex items-center rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <input
                                    type="number"
                                    className="w-full p-2 outline-none bg-inherit"
                                    defaultValue=""
                                    {...register('field_id', {
                                        onChange: () => clearFieldError('field_id'),
                                    })}
                                />
                            </div>
                            {validation.field_id && (
                                <p className="text-red-500 text-xs">{validation.field_id}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2 space-y-1">
                            <label className="text-xs font-medium">Buffer Size</label>
                            <div className="flex items-center rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <input
                                    placeholder="Enter buffer size"
                                    className="w-full p-2 outline-none bg-inherit"
                                    type="text"
                                    {...register('buffer_zone_width', {
                                        onChange: () => clearFieldError('buffer_zone_width'),
                                    })}
                                />
                            </div>
                            {validation.buffer_zone_width && (
                                <p className="text-red-500 text-xs">{validation.buffer_zone_width}</p>
                            )}
                        </div>

                        <div className="w-1/2 space-y-1">
                            <label className="text-xs font-medium">Row Spacing</label>
                            <div className="flex items-center rounded-md border border-e9e9e9 pl-2 bg-FAFAFA">
                                <input
                                    placeholder="Enter row spacing"
                                    className="w-full p-2 outline-none bg-inherit"
                                    type="text"
                                    {...register('row_spacing', {
                                        onChange: () => clearFieldError('row_spacing'),
                                    })}
                                />
                            </div>
                            {validation.row_spacing && (
                                <p className="text-red-500 text-xs">{validation.row_spacing}</p>
                            )}
                        </div>
                    </div>

                    <div className="text-center pt-5">
                        <button
                            type="submit"
                            className=" text-black border px-5 py-1 rounded text-xs cursor-pointer disabled:opacity-50"
                            disabled={isPendingMission}
                        >
                            {isPendingMission ? 'Creating...' : 'Next'}
                        </button>
                    </div>
                </form >
            </div >

            <Toaster richColors position="top-right" />
        </>
    );
}

export default CreateMission;


