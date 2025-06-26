
import axios from 'axios';
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';


const queryClient = new QueryClient();

function TableComponent() {

    const { data = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
            return res.data;
        },
    });

    const columns = [
        { header: 'Id', accessorKey: 'id' },
        { header: 'Name', accessorKey: 'name' },
        { header: 'Email', accessorKey: 'email' },
    ];



    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <p className='text-white'>Loading...</p>;

        return (
            <div>
                <table className="min-w-full ml-2 mt-2">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="border-none p-0.5 bg-gray-100 text-xs mb-1">
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
                                    <td key={cell.id} className="border-b border-gray-300 p-0.5 text-xs text-center" style={{ backgroundColor: "#ffff" }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }

export default function UserTable() {
    return (
        <QueryClientProvider client={queryClient}>
            <TableComponent />
        </QueryClientProvider>
    );
}
