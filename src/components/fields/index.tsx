import { useNavigate } from "@tanstack/react-router";
import FieldsTable from "./FieldsTable";
import { useState } from "react";

const FieldsPage = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [searchString, setSearchString] = useState<string>(
        searchParams.get("search_string") || ""
    );
    console.log(searchString, "con001")

    return (
        <div className='ml-1'>
            <div className="flex items-center justify-end bg-gray-100 rounded p-2 mb-2 h-12 w-full space-x-2">
                <select className="border border-gray-300 text-sm rounded px-2 py-1 focus:outline-none">
                    <option>Select Location</option>
                    <option>Select Location</option>
                    <option>Select Location</option>
                    <option>Select Location</option>
                </select>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 text-sm rounded px-8 py-1 pl-8 focus:outline-none"
                        onChange={(e) => {
                            setSearchString(e.target.value);
                        }}
                    />
                    <span className="absolute left-2 top-1.5 text-gray-400">
                        🔍
                    </span>
                </div>

                <button
                    type="button"
                    className="rounded bg-[#0ed78d] text-white text-sm px-4 py-1 font-medium hover:bg-[#0cc87f]"
                    onClick={() =>
                        navigate({
                            to: "/add-field",
                        })
                    }
                >
                    + New Field
                </button>

            </div>

            <FieldsTable searchString={searchString} setSearchString={setSearchString} searchParams={searchParams} />
        </div>




    )
}

export default FieldsPage;