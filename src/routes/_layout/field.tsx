import FieldsTable from '@/components/fields-table';
import MapForm from '@/components/map-form';
import { createFileRoute } from '@tanstack/react-router';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const Route = createFileRoute('/_layout/field')({
  component: Field,
})


function Field() {
  const [field, setField] = useState<boolean>(false);
  return (
    <>
      {
        !field ? (
          <div className='ml-1'> 
                <div className='bg-gray-200 rounded p-1 mb-2 h-8 w-full'>
                    <button type="button" className='rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right'
                        onClick={() =>
                            setField(true)
                        }
                    > + New Field
                    </button>
                </div>
                <FieldsTable />
          </div>
        )
          : (<MapForm setField={setField} />)
      }
    </>
  )
}


