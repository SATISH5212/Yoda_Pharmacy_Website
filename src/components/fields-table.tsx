import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"

const data = [
    {
        sno: 1,
        fieldname: "Amaravathi",
        geographical_area: "",
        created_at: "",
        status: "active",
        action: "spraying",
    },
    {
        sno: 3,
        fieldname: "Amaravathi",
        geographical_area: "",
        created_at: "",
        status: "active",
        action: "spraying",
    },
    {
        sno: 4,
        fieldname: "Amaravathi",
        geographical_area: "",
        created_at: "",
        status: "active",
        action: "spraying",
    }
]

const columns = [
    {
        header: "S NO",
        accessorKey: "sno"
    },
    {
        header: "Field Name",
        accessorKey: "fieldname"
    },
    {
        header: "Geographical Area",
        accessorKey: "geographical_area"
    },
    {
        header: "Status",
        accessorKey: "status"
    },
    {
        header: "Action",
        accessorKey: "action"
    }

]
export default function FieldsTable() {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div>
            <table className="min-w-full"  >
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
                                <td key={cell.id} className="border p-0.5 text-center text-xs" style={{ backgroundColor: "#ffff" }}>
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