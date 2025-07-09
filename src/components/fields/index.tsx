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
        <div className=' overflow-hidden h-[92vh]'>
            <div className="flex items-center justify-end bg-gray-100  border-b h-12 w-full space-x-2 mb-2 pr-4">
                <select className="border border-gray-300 text-sm tracking-tight rounded h-10 w-44 pl-1 hover:border-gray-400 hover:cursor-pointer focus:outline-none " onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>

                <div className="flex relative h-10 w-50  items-center border border-gray-300 rounded hover:border-gray-400">
                    <span
                        className="h-70% w-10 text-center text-gray-500 pointer-events-none flex items-center justify-center"
                    >
                        <Search size={14}/>
                    </span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-sm font-small tracking-tight rounded  h-6 w-35 focus:outline-none"
                        onChange={(e) => {
                            setSearchString(e.target.value);
                        }}
                    />

                </div>
                <div className=" flex justify-center  h-10 w-30">
                    <button
                        type="button"
                        className=" flex justify-center items-center rounded bg-[#0ed78d] text-white font-medium hover:bg-[#0cc87f] cursor-pointer h-full w-full"
                        onClick={() =>
                            navigate({
                                to: "/add-field",
                            })
                        }
                    >
                        <span className="text-md font-semibold tracking-tight">+ New Field</span>
                    </button>
                </div>

            </div>
            <div className="m-2">

                <FieldsTable searchString={searchString} searchParams={searchParams} status={status} />
            </div>

        </div>




    )
}

export default FieldsPage;