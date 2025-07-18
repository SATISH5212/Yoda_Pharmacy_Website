
import { capitalize } from "@/lib/helpers/CaptalizeFirstLetter";
import { Link, useRouter } from "@tanstack/react-router";
import { Edit, Eye } from "lucide-react";
import { Button } from "../ui/button";

const getAllFieldsColumns = () => {
    const router = useRouter();
    const allFieldsColumns = [
        {
            id: "id",
            header: () => (
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    S.No
                </span>
            ),
            accessorKey: "id",
            cell: (value: any) => (
                <span className="text-sm font-semibold text-gray-900">
                    {value.row.index + 1}
                </span>
            ),
            width: "10px",
        },
        {
            id: "field_name",
            header: () => (
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Field Name
                </span>
            ),
            accessorKey: "field_name",
            cell: (info: any) => {
                const value = info.getValue() || "-";
                return (
                    <span className="text-sm font-semibold text-gray-800">
                        {value}
                    </span>
                );
            },
            width: "20%",
        },
        {
            header: () => (
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Geographical Area
                </span>
            ),
            accessorKey: "field_area",
            cell: (value: any) => (
                <span className="text-sm text-gray-700">
                    {value.getValue()} Acres
                </span>
            ),
            width: "150px",
        },
        {
            header: () => (
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    Created On
                </span>
            ),
            accessorKey: "created_at",
            cell: (value: any) => {
                const dateString = value.cell.getValue();
                const date = new Date(dateString);
                return (
                    <span className="text-sm ">
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
        // {
        //     header: () => (
        //         <span className="text-sm font-semibold text-gray-800">Status</span>
        //     ),
        //     accessorKey: "field_status",
        //     cell: (value: any) => {
        //         const status = (value.getValue() || "").toLowerCase();

        //         const statusStyles =
        //             status === "pending"
        //                 ? {
        //                     bg: "bg-orange-100",
        //                     text: "text-orange-800",
        //                     dot: "bg-orange-500",
        //                 }
        //                 : {
        //                     bg: "bg-green-100",
        //                     text: "text-green-800",
        //                     dot: "bg-green-600",
        //                 };

        //         return (
        //             <span
        //                 className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusStyles.bg} ${statusStyles.text}`}
        //             >
        //                 <span
        //                     className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusStyles.dot}`}
        //                 ></span>
        //                 {capitalize(status)}
        //             </span>
        //         );
        //     },
        //     width: "100px",
        // },
        {
            id: "location",
            header: () => (
                <span className="text-sm font-semibold text-gray-800">
                    Location
                </span>
            ),
            accessorKey: "location",
            cell: (info: any) => {
                const fullLocation = info.getValue() || "-";
                const parts = fullLocation.split(",").map((p: string) => p.trim());
                const firstTwo = parts.slice(0, 2).join(", ");
                const showDots = parts.length > 2;

                const groupedParts: string[] = [];
                for (let i = 0; i < parts.length; i += 2) {
                    groupedParts.push(parts.slice(i, i + 2).join(", "));
                }

                return (
                    <span
                        className="text-[13px] text-gray-700 truncate inline-block max-w-[150px] cursor-pointer"
                        title={showDots ? groupedParts.join("\n") : ""}
                    >
                        {firstTwo}
                        {showDots && "…"}
                    </span>
                );
            },
            width: "80px",
        },
        {
            header: () => (
                <span className="flex grow text-sm font-semibold text-gray-800 justify-center">
                    Actions
                </span>
            ),
            accessorKey: "action",
            cell: (info: any) => {
                const row = info.row.original;
                const field_id = row.id as string;
                return (
                    <div className="flex justify-center items-center gap-3 flex-wrap">
                        <Link
                            to="/fields/$field_id"
                            params={{ field_id }}
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors duration-200 group"
                            title="View Field"
                        >
                            <Eye size={14} className="text-gray-600 group-hover:text-blue-600" />
                        </Link>
                        <Link
                            to="/fields/$field_id/edit"
                            params={{ field_id }}
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors duration-200 group"
                            title="Edit Field"
                        >
                            <Edit size={14} className="text-gray-600 group-hover:text-blue-600" />
                        </Link>
                        <Button
                            className="text-xs font-semibold bg-gray-100 hover:bg-blue-100 text-black h-7 rounded-full"
                            title="Configure Mission"
                            onClick={() => router.navigate({ to: `/fields/${field_id}/config-mission` })}
                        >
                            Create Mission
                        </Button>
                        <Button
                            className="text-xs font-semibold bg-gray-100 hover:bg-blue-100 text-black h-7 rounded-full"
                            title="Add Robot"
                            onClick={() => router.navigate({ to: `/fields/${field_id}/config-robot` })}
                        >
                            Add Robot
                        </Button>
                    </div>
                );
            },
            width: "100px",
        },
    ];
    return [allFieldsColumns];
};

export const useViewAllFieldsColumns = () => {
    return getAllFieldsColumns();
};
