import { capitalize } from "@/lib/helpers/CaptalizeFirstLetter";
import { Link } from "@tanstack/react-router";
import { Eye, Waypoints } from "lucide-react";

export const allFieldsColumns = [
    {
        header: "S No",
        accessorKey: "id",
        cell: (value: any) => (
            <span className="text-xs sm:text-sm font-medium text-gray-900">
                {value.row.index + 1}
            </span>
        ),
        width: "10px",

    },
    {
        accessorFn: (row: any) => row.field_name,
        id: "field_name",
        header: () => (
            <span className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                Field Name
            </span>
        ),
        cell: (info: any) => {
            const value = info.getValue() || "-";
            return (
                <span className="text-xs sm:text-sm text-gray-900 font-medium">
                    {value}
                </span>
            );
        },
        width: "20%",
    },
    {
        header: () => (
            <span className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                Geographical Area
            </span>
        ),
        accessorKey: "field_area",
        cell: (value: any) => (
            <span className="text-xs sm:text-sm text-gray-600">
                {value.getValue()} hectares
            </span>
        ),
        width: "150px",
    },
    {
        header: () => (
            <span className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                Created On
            </span>
        ),
        accessorKey: "created_at",
        cell: (value: any) => {
            const dateString = value.cell.getValue();
            const date = new Date(dateString);
            return (
                <span className="text-xs sm:text-sm text-gray-600">
                    {date.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                </span>
            );
        },
        width: "120px",
    },
    {
        header: () => (
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                Status
            </span>
        ),
        accessorKey: "field_status",
        cell: (value: any) => {
            const status = value.getValue();
            return (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                    {capitalize(status || "")}
                </span>
            );
        },
        width: "100px",
    },

    {
        accessorFn: (row: any) => row.location,
        id: "location",
        header: () => (
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                Location
            </span>
        ),
        accessorKey: "location",
        cell: (info: any) => {
            const fullLocation = info.getValue() || "-";
            const parts = fullLocation.split(",").map((p : string)=> p.trim());
            const firstTwo = parts.slice(0, 2).join(", ");
            const showDots = parts.length > 2;

            const groupedParts: string[]= [];
            for (let i = 0; i < parts.length; i += 2) {
                groupedParts.push(parts.slice(i, i + 2).join(", "));
            }

            return (
                <span
                    className="text-xs sm:text-sm text-gray-600 truncate inline-block max-w-[150px] cursor-pointer"
                    title={showDots ? groupedParts.join("\n") : ""}
                >
                    {firstTwo}
                    {showDots && "..."}
                </span>
            );
        },

        // cell: (info: any) => {
        //     const fullLocation = info.getValue() || "-";
        //     const parts = fullLocation.split(",").map((p: string) => p.trim());

        //     const groupedParts: string[] = [];
        //     for (let i = 0; i < parts.length; i += 2) {
        //         groupedParts.push(parts.slice(i, i + 2).join(", "));
        //     }

        //     return (
        //         <div
        //             className="text-xs sm:text-sm text-gray-600 max-w-[200px] overflow-hidden"
        //             title={fullLocation}
        //         >
        //             {groupedParts.map((line, index) => (
        //                 <div key={index} className="truncate">
        //                     {line}
        //                 </div>
        //             ))}
        //         </div>
        //     );
        // },

        width: "80px",
    },

    {
        header: () => (
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                Actions
            </span>
        ),
        accessorKey: "action",
        cell: (info: any) => {
            const row = info.row.original;
            const field_id = row.id as string;
            return (
                <div className="flex justify-center gap-3">
                    <Link
                        to="/fields/$field_id"
                        params={{ field_id }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors duration-200 group"
                        title="View Details"
                    >
                        <Eye size={14} className="text-gray-600 group-hover:text-blue-600" />
                    </Link>
                    <Link
                        to="/fields/$field_id/viewField"
                        params={{ field_id }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors duration-200 group"
                        title="View Field"
                    >
                        <Waypoints size={14} className="text-gray-600 group-hover:text-blue-600" />
                    </Link>
                </div>
            );
        },
        width: "100px",
    },
];