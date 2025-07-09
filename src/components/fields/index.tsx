import { useNavigate } from "@tanstack/react-router";
import FieldsTable from "./FieldsTable";
import { useState } from "react";
import { Search } from "lucide-react";

const FieldsPage = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [searchString, setSearchString] = useState<string>(
        searchParams.get("search_string") || ""
    );

    const [status, setStatus] = useState<string>(
        searchParams.get("status") || ""
    )
    return (
        <div className='ml-1 overflow-hidden h-[92vh] px-4'>
            <div className="flex items-center justify-end bg-gray-100 rounded h-10 w-full space-x-2 mb-2">
                <select className="border border-gray-300 text-xs tracking-tight rounded h-6 w-36 focus:outline-none" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>

                <div className="flex relative h-6 items-center border border-gray-300 rounded">
                    <span
                        className="h-70% w-10 text-center text-gray-500 pointer-events-none flex items-center justify-center"
                    >
                        <Search size={14}/>
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-xs font-small tracking-tight rounded  h-6 w-35 focus:outline-none"
                        onChange={(e) => {
                            setSearchString(e.target.value);
                        }}
                    />

                </div>
                <div className=" flex w-25 justify-center -ml-2.5 ">

                    <button
                        type="button"
                        className=" flex justify-center items-center rounded bg-[#0ed78d] text-white text-sm  font-medium hover:bg-[#0cc87f] h-6 w-20"
                        onClick={() =>
                            navigate({
                                to: "/add-field",
                            })
                        }
                    >
                        <span className="text-xs font-small tracking-tight">+ New Field</span>
                    </button>
                </div>

            </div>
            <div>

                <FieldsTable searchString={searchString} searchParams={searchParams} status={status} />
            </div>

        </div>




    )
}

export default FieldsPage;