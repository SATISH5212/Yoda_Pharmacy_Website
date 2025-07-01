import { AppProps, Coordinates, LocationInfo, FieldFormProps } from "@/types/dataTypes";
// import DrawTools from "./DrawTools";
import DrawTools from "./google-map";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "react-toastify";



function MapForm({ setField }: AppProps) {   // map rendering and tanstack form for taking input field data has been combined here
    const [formCoordinates, setFormCoordinates] = useState<{ lat: number; lng: number }[]>([]);
    const [fieldAccessPoint, setFieldAccessPoint] = useState<Coordinates>(null);
    // const [robotHome, setRobotHome] = useState<Coordinates>(null);
    const [mode, setMode] = useState<string>("idle"); // "idle" | "polygon" | "field_access_point" | 
    const [locationInfo, setLocationInfo] = useState<LocationInfo>(null);


    return (
        <div className="relative w-full h-screen">
            {/* Map Background */}
            <div className="absolute inset-0 z-0 w-full h-screen">

                <DrawTools
                    setFormCoordinates={setFormCoordinates}
                    setFieldAccessPoint={setFieldAccessPoint}
                    // setRobotHome={setRobotHome}
                    mode={mode}
                    setMode={setMode}
                    setLocationInfo={setLocationInfo}
                />
            </div>


            <div className="absolute z-10 top-1 right-1 bg-white shadow-2xl rounded-2xl">

                <FieldForm
                    setField={setField}
                    formCoordinates={formCoordinates}
                    fieldAccessPoint={fieldAccessPoint}

                    setMode={setMode}
                    locationInfo={locationInfo}
                />
            </div>
        </div>

    );
}



function FieldForm({
    setField,
    formCoordinates,
    fieldAccessPoint,
    // robotHome,
    setMode,
    locationInfo
}: FieldFormProps) {

    const form = useForm({
        defaultValues: {
            field_name: '',
        },

        onSubmit: async ({ value }) => {
            const fullData = {
                field_name: value.field_name,
                field_boundary: formCoordinates,
                location: locationInfo?.location || "",
                field_area: locationInfo?.area || "",
                field_access_point: fieldAccessPoint,
                // robot_home: robotHome,
            };

            await fetch("https://demetercloud.onrender.com/v1.0/fieldmapping", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify(fullData)
            });

        }
    })


    return (
        <form onSubmit={(e) => {

            form.handleSubmit(e);
            e.preventDefault();
            e.stopPropagation();
        }}
            className='h-132 w-78'
        >
            <div className='flex flex-col p-2 gap-2'>
                <h1 className="text-sm font-semibold text-center mb-4">Register Field</h1>

                <div>
                    <label className='text-[10px]'>Field Name</label> <br />
                    <form.Field
                        name="field_name"
                        children={(field) => (
                            <input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className=" bg-gray-100 rounded w-74 p-1.5 text-xs"
                                required
                            />
                        )}
                    />
                </div>

                <div className='flex justify-between text-[12px] mt-3 font-semibold'>

                    <span>Geographical Area</span>
                    <span className='rounded pl-2 pr-2 text-xs text-red-400 bg-red-200'>
                        {
                            locationInfo?.area || 0
                        }
                        <span className='text-black'> Hectars</span>
                    </span>
                </div> <br />


                {/* field access point */}
                <div className='mb-2'>
                    <label className='text-[10px]'>Field Access point</label><br />
                    <button type="button" style={{ cursor: 'pointer' }}
                        className='rounded px-2 pt-1 pb-1 text-xs bg-green-200'
                        onClick={() => {
                            setMode("field_access_point")
                            toast.info("Click on the map to place Field Access Point", {
                                position: "top-right",
                                autoClose: 2000,
                                style: {
                                    fontSize: '12px',
                                    color: '#065f46',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                },
                            });
                        }}
                    >+ Add</button>
                </div>



                {/* <div className='mb-2'>
                    <label className='text-[10px]'>Robot Home</label><br />
                    <button type="button" style={{ cursor: 'pointer' }}
                        className='rounded px-2 pt-1 pb-1 text-xs bg-green-200'
                        onClick={() => {
                            setMode("robot_home")
                        }}
                    >+ Add</button>
                </div> */}
            </div>

            <div className='absolute bottom-5 right-3 flex gap-3 '>
                <button type="button" onClick={() => setField(false)}
                    className='border-1  rounded pl-2 pr-2 text-sm cursor-pointer '
                >
                    Cancel
                </button>

                <button type="submit"
                    className='rounded pl-3 pr-3 text-sm bg-green-400 cursor-pointer'
                >
                    Save
                </button>
            </div>
        </form >

    );
}



export default MapForm;