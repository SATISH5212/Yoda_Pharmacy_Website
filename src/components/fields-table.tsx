import { BASE_URL } from "@/config/appConfig";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { FieldResponse} from "@/types/dataTypes";


async function getFieldsData(): Promise<FieldResponse> {
    const response = await fetch(`${BASE_URL}/fieldmappings?`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    });
    const data = await response.json();
    console.log(data);
    return data.data;
}



export default function FieldsTable() {

    const { data} = useQuery<FieldResponse>({
        queryKey: ['users'],
        queryFn: () => getFieldsData(),
        
    });

 
    const columns = [
        {
            header: "S No",
            accessorKey: "id",
            cell: (value: any) => {
                return value.row.index + 1
            },
        },
        {
            header: "Field Name",
            accessorKey: "field_name"
        },
        {
            header: "Geographical Area",
            accessorKey: "field_area"
        },
        {
            header: "Created on",
            accessorKey: "created_at",
            cell: (value: any) => {
                const dateString = value.cell.getValue();
                const date = new Date(dateString);
                return date.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                });
            },
        },
        {
            header: "Status",
            accessorKey: "field_status"
        },
        {
            header: "Action",
            accessorKey: "action",
            cell: (info: any) => {
                const row = info.row.original;
                return (
                    <Link
                        to={`/devices`}
                        className=" flex justify-center hover:text-blue-700"
                        title="View Details"
                    >
                        <Eye size={12} />
                    </Link>
                );
            },
        }
    ]


    const table = useReactTable({
        data: data?.records ?? [],
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className="rounded">
            <table className="min-w-full">

                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="border p-0.5 bg-gray-100 text-xs text-center">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border p-1 text-center text-xs" style={{ backgroundColor: "#ffff" }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}