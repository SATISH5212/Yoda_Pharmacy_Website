import { useNavigate } from "@tanstack/react-router";
import FieldsTable from "./FieldsTable";
import { useState } from "react";
import { Search } from "lucide-react";

const AllFieldsPage = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [searchString, setSearchString] = useState<string>(searchParams.get("search_string") || "");
    const [status, setStatus] = useState<string>(searchParams.get("status") || "");

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border-b border-gray-200 p-4 gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <select
                        className="border border-gray-300 text-sm rounded-md px-3 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className="relative flex items-center border border-gray-300 rounded-md w-full sm:w-64 focus-within:ring-2 focus-within:ring-blue-500 transition-colors">
                        <span className="flex items-center justify-center w-8 text-gray-500">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search fields..."
                            className="text-sm rounded-md py-2 pl-2 pr-3 w-full focus:outline-none"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    onClick={() => navigate({ to: "/add-field" })}
                >
                    + New Field
                </button>
            </div>
            <div className="p-4 flex-1">
                <FieldsTable searchString={searchString} searchParams={searchParams} status={status} />
            </div>
        </div>
    );
};

export default AllFieldsPage;