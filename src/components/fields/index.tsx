import { useState } from "react";
import MapForm from "../map-form";
import Cookies from "js-cookie";
import FieldsTable from "./FieldsTable";

const FieldsPage = () => {
    const [field, setField] = useState<boolean>(false);
    return (
        <>
            {
                !field ? (
                    <div className='ml-1'>
                        <div className='bg-gray-200 rounded p-1 mb-2 h-8 w-full'>
                            <button type="button" className="rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right"
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

export default FieldsPage;