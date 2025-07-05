import { useNavigate } from "@tanstack/react-router";
import FieldsTable from "./FieldsTable";

const FieldsPage = () => {
    const navigate = useNavigate();
    return (
        <div className='ml-1'>
            <div className='bg-gray-200 rounded p-1 mb-2 h-8 w-full'>
                <button type="button" className="rounded px-1 mt-0.5 py-0.5 text-[10px] bg-[#0ed78d] text-center text-white cursor-pointer float-right"
                    onClick={() =>
                        navigate({
                            to: "/add-field",

                        })
                    }
                > + New Field
                </button>
            </div>
            <FieldsTable />
        </div>




    )
}

export default FieldsPage;