import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

export const allFieldsColumns = [
    {
        header: "S No",
        accessorKey: "id",
        cell: (value: any) => value.row.index + 1,
        width: "50px",
    },
    {
        header: "Field Name",
        accessorKey: "field_name",
        width: "200px",
    },
    {
        header: "Geographical Area",
        accessorKey: "field_area",
        cell: (value: any) => `${value.getValue()} hectares`,
        width: "150px",
    },
    {
        header: "Created On",
        accessorKey: "created_at",
        cell: (value: any) => {
            const dateString = value.cell.getValue();
            const date = new Date(dateString);
            return date.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
        },
        width: "150px",
    },
    {
        header: "Status",
        accessorKey: "field_status",
        cell: (value: any) => value.getValue() === "pending" ? "Active" : value.getValue(),
        width: "100px",
    },
    {
        header: "Missions",
        accessorKey: "missions",
        cell: () => 12,
        width: "100px",
    },
    {
        header: "Actions",
        accessorKey: "action",
        cell: (info: any) => {
            const row = info.row.original;
            const field_id = row.id as string
            console.log("Rowdata:", row);
            return (
                <Link
                    to="/fields/$field_id"
                    params={{ field_id }}
                    className="flex justify-center hover:text-blue-700"
                    title="View Details"
                >
                    <Eye size={12} />
                </Link>
            );
        },
        width: "80px",
    },
];