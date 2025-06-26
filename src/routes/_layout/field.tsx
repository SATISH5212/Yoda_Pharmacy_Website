import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import DrawTools from '../../components/DrawTools';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from '@/types/dataTypes';
import { Coordinates, LocationInfo, SampleFormProps } from '@/types/dataTypes';
import FieldsTable from '@/components/fields-table';

export const Route = createFileRoute('/_layout/field')({
  component: Field,
})


function App({ setField }: AppProps) {
  const [formCoordinates, setFormCoordinates] = useState<number[][]>([]);
  const [fieldAccessPoint, setFieldAccessPoint] = useState<Coordinates>(null);
  const [robotHome, setRobotHome] = useState<Coordinates>(null);
  const [mode, setMode] = useState<string>("idle"); // "idle" | "polygon" | "field_access_point" | "robot_home"
  const [locationInfo, setLocationInfo] = useState<LocationInfo>(null);


  return (
    <div>
      <SampleForm
        setField={setField}
        formCoordinates={formCoordinates}
        fieldAccessPoint={fieldAccessPoint}
        robotHome={robotHome}
        setMode={setMode}
        locationInfo={locationInfo}
      />
       <DrawTools
        setFormCoordinates={setFormCoordinates}
        setFieldAccessPoint={setFieldAccessPoint}
        setRobotHome={setRobotHome}
        mode={mode}
        setMode={setMode}
        setLocationInfo={setLocationInfo}
      />
    </div>
  );
}

function SampleForm({
  setField,
  formCoordinates,
  fieldAccessPoint,
  robotHome,
  setMode,
  locationInfo
}: SampleFormProps) {


  // const { data, isLoading } = useQuery({
  //   queryKey: ["field_type"],
  //   queryFn: async () => {
  //     const res = await fetch("https://demetercloud.onrender.com/v1.0/robots",{
  //         method : "get",
  //         headers : new Headers({
  //             'content-type': 'application/json',
  //             'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
  //         })
  //     })
  //     const response = await res.json();

  //     return response.data;
  //   }
  // })


  const form = useForm({
    defaultValues: {
      type: '',
      field_name: '',
      farm: '',
    },

    onSubmit: async ({ value }) => {
      const fullData = {
        field_name: value.field_name,
        field_boundary: formCoordinates,
        location: locationInfo?.location || "",
        field_area: locationInfo?.area || "",
        field_access_point: fieldAccessPoint,
        robot_home: robotHome,
      };

      // await fetch("https://demetercloud.onrender.com/v1.0/fieldmapping", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("access_token")}`
      //   },
      //   body: JSON.stringify(fullData)
      // });
      console.log(fullData)

    }
  })


  return (

    <div >
      <form onSubmit={(e) => {
        form.handleSubmit(e);
        e.preventDefault();
        e.stopPropagation();
      }}
        className='h-125 w-78 shadow-2xl rounded-xl float-right'
      >
        <div className='flex flex-col p-2 gap-2'>
          <h1 className="text-sm font-semibold text-center mb-4">Register Field</h1>
          {/* <div>
            <label className='text-[10px]'>Type</label> <br />
            <form.Field
              name="type"
              children={(field) => (
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-gray-100 rounded w-74 p-1"
                >
                  {/* {
                    isLoading ? (
                      <option > <div>Loading......</div></option>
                    ) : (
                      data?.map((robot : any ) => (
                        <option value={robot.id} className='text-xs'>{robot.robot_name}</option>
                      ))
                    )
                  } 
                </select>
              )}
            />
          </div> */}

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

          {/* <div>
            <label className='text-[10px]'>Farm</label> <br />
            <form.Field
              name="farm"
              children={(field) => (
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange((e.target.value))}
                  className="bg-gray-100  rounded w-74 p-1"

                ></select>
              )}
            />
          </div> */}


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


          {/* robot home */}
          <div className='mb-2'>
            <label className='text-[10px]'>Robot Home</label><br />
            <button type="button" style={{ cursor: 'pointer' }}
              className='rounded px-2 pt-1 pb-1 text-xs bg-green-200'
              onClick={() => {
                setMode("robot_home")
              }}
            >+ Add</button>
          </div>


          {/* obstalces */}
          <div>
            <label className='text-[10px]'>obstacles</label><br />
            <button type="button" style={{ cursor: 'pointer' }}
              className='rounded px-2 pt-1 pb-1 text-xs bg-green-200'
            >+ Add</button>
          </div>


          <div>
            <div className='float-right mt-17 mr-3 rounded pl-3 pr-3 text-sm bg-green-400'>
              <button type="submit" style={{ cursor: 'pointer' }}>Save</button>
            </div>
            <div className='float-right mt-17 mr-3 border-1 rounded pl-2 pr-2 text-sm  '>
              <button type="button" onClick={() => setField(false)} style={{ cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>

        </div>
      </form >
      <ToastContainer />
    </div >

  );
}

function Field() {
  const [field, setField] = useState<boolean>(false);
  return (
    <div>
      {
        !field ? (<>
          <button className="bg-[#0ed78d] cursor-pointer px-2 py-0.5 rounded float-end mr-5 mb-1 text-xs" onClick={() => {
            setField(true)
          }}>
            + Add Field
          </button>
          <FieldsTable />
        </>
        )
          : (<App setField={setField} />)
      }
    </div>
  )
}


