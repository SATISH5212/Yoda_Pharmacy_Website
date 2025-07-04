import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    Header,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";
import { useLocation, useRouter } from "@tanstack/react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { NoUsersDataSvg } from "../svg/NoUsersDataSvg";
import { Skeleton } from "../ui/skeleton";
import { pageProps } from "@/lib/interfaces/core/iTable";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

const TanStackTable: FC<
    pageProps & {
        lastRowRef?: (node: HTMLTableRowElement | null) => void;
        onRowClick?: (row: any) => void;
    }
> = ({
    columns,
    data,
    loading = false,
    getData,
    removeSortingForColumnIds,
    heightClass,
    noDataLabel,
    lastRowRef,
    isFetchingNextPage,
    onRowClick,
}) => {
        const router = useRouter();
        const [sorting, setSorting] = useState<SortingState>([]);
        const location = useLocation();

        const table = useReactTable({
            columns,
            data: data?.length ? data : [],
            state: {
                sorting,
            },
            onSortingChange: setSorting,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getSortedRowModel: getSortedRowModel(),
        });

        const getWidth = (id: string) => {
            const widthObj = columns.find((col) => col.id === id);
            return widthObj ? widthObj?.width || widthObj?.size || "150px" : "150px";
        };

        const getSortIcon = (header: Header<any, unknown>) => {
            if (!header.column.getCanSort()) return null;
            
            const sortDirection = header.column.getIsSorted();
            if (sortDirection === 'asc') return <ArrowUp className="ml-1 h-3 w-3" />;
            if (sortDirection === 'desc') return <ArrowDown className="ml-1 h-3 w-3" />;
            return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />;
        };

        return (
            <div className={`scrollbar overflow-x-auto w-full  ${heightClass ? heightClass : "h-auto"}`}>
                <div className={`overflow-auto scrollbar  w-full relative ease-in-out duration-300 transition-all ${heightClass ? heightClass : "h-auto"}`}>
                    {!data.length && !loading ? (
                        <div className="p-4 w-full box-border flex flex-col items-center justify-center text-center text-gray-500">
                            <NoUsersDataSvg />
                            <p className="mb-2 font-medium">
                                {noDataLabel ? noDataLabel : "No users found"}
                            </p>
                        </div>
                    ) : (
                        <div className={`[&>*:first-child]:h-full ${heightClass ? heightClass : "h-auto"}`}>
                            <Table className="relative w-full border ">
                                {/* Reduced header height */}
                                <TableHeader className="sticky top-0 z-1 bg-E8E8E8 h-5">
                                    {table?.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id} className="h-5">
                                            {headerGroup.headers.map(
                                                (header: Header<any, unknown>, index: number) => (
                                                    <TableHead
                                                        key={index}
                                                        colSpan={header.colSpan}
                                                        className="bg-gray-200 h-5 px-3 border-gray-300 last:border-r-0"
                                                        style={{
                                                            width: getWidth(header.id),
                                                            minWidth: getWidth(header.id),
                                                        }}
                                                    >
                                                        {header.isPlaceholder ? null : (
                                                            <div
                                                                className={`flex items-center justify-center h-full text-xs font-normal ${
                                                                    header.column.getCanSort()
                                                                        ? "cursor-pointer select-none"
                                                                        : ""
                                                                    }`}
                                                                onClick={header.column.getToggleSortingHandler()}
                                                            >
                                                                <div className="flex items-center">
                                                                    <span className="text-center">
                                                                        {flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                    </span>
                                                                    {getSortIcon(header)}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </TableHead>
                                                )
                                            )}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody className="relative">
                                    {loading && !isFetchingNextPage ? (
                                        [...Array(15)].map((_, i) => (
                                            <TableRow
                                                key={`loading-row-${i}`}
                                                className="border-b border-gray-200 text-xs  text-gray-700 font-normal h-5"
                                            >
                                                {[...Array(columns.length)].map((_, j) => (
                                                    <TableCell 
                                                        key={`loading-cell-${i}-${j}`}
                                                        className="h-5 text-center"
                                                        style={{
                                                            width: getWidth(columns[j]?.id),
                                                            minWidth: getWidth(columns[j]?.id),
                                                        }}
                                                    >
                                                        {j == 1 ? (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
                                                                <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
                                                            </div>
                                                        ) : (
                                                            <div className="flex justify-center">
                                                                <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <>
                                            {table?.getRowModel().rows.map((row, index) => {
                                                const isLastRow =
                                                    index === table.getRowModel().rows.length - 1;
                                                return (
                                                    <TableRow
                                                        key={row.id}
                                                        ref={isLastRow ? lastRowRef : null}
                                                        onClick={() => onRowClick?.(row.original)}
                                                        className={`border-b border-gray-200 h-6 w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
                                                    >
                                                        {row.getVisibleCells().map((cell) => (
                                                            <TableCell
                                                                className={`p-0 !bg-transparent defaultCell transition-colors duration-200 cursor-pointer h-6 text-center text-xs`}
                                                                key={cell.id}
                                                                style={{
                                                                    width: getWidth(cell.column.id),
                                                                    minWidth: getWidth(cell.column.id),
                                                                }}
                                                            >
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                );
                                            })}
                                            {isFetchingNextPage && (
                                                <TableRow className="h-8">
                                                    <TableCell
                                                        colSpan={columns.length}
                                                        className="p-2 text-center h-8"
                                                    >
                                                        <div className="flex justify-center">
                                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        );
    };

export default TanStackTable;















// import {
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getSortedRowModel,
//     Header,
//     SortingState,
//     useReactTable,
// } from "@tanstack/react-table";
// import { FC, useState } from "react";
// import { useLocation, useParams, useRouter } from "@tanstack/react-router";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
// import { NoUsersDataSvg } from "../svg/NoUsersDataSvg";
// import { Skeleton } from "../ui/skeleton";
// import { pageProps } from "@/lib/interfaces/core/iTable";
// const TanStackTable: FC<
//     pageProps & {
//         lastRowRef?: (node: HTMLTableRowElement | null) => void;
//         onRowClick?: (row: any) => void;
//     }
// > = ({
//     columns,
//     data,
//     loading = false,
//     getData,
//     removeSortingForColumnIds,
//     heightClass,
//     noDataLabel,
//     lastRowRef,
//     isFetchingNextPage,
//     onRowClick,
// }) => {
//         const router = useRouter();
//         const [sorting, setSorting] = useState<SortingState>([]);
//         const location = useLocation();
//         const searchParams = new URLSearchParams(location?.search);
//         const table = useReactTable({
//             columns,
//             data: data?.length ? data : [],
//             state: {
//                 sorting,
//             },
//             onSortingChange: setSorting,
//             getCoreRowModel: getCoreRowModel(),
//             getFilteredRowModel: getFilteredRowModel(),
//             getSortedRowModel: getSortedRowModel(),
//         });
//         const getWidth = (id: string) => {
//             const widthObj = columns.find((col) => col.id === id);
//             return widthObj ? widthObj?.width || widthObj?.size || "100px" : "100px";
//         };
//         return (
//             <div
//                 className={`scrollbar overflow-x-auto w-full ${heightClass ? heightClass : "h-auto"
//                     }`}
//             >
//                 <div
//                     className={`overflow-auto scrollbar w-full relative ease-in-out duration-300 transition-all ${heightClass ? heightClass : "h-auto"
//                         }`}
//                 >
//                     {!data.length && !loading ? (
//                         <div className="p-4 w-full  box-border flex flex-col items-center justify-center text-center text-gray-500">
//                             <NoUsersDataSvg />
//                             <p className="mb-2 font-medium">
//                                 {noDataLabel ? noDataLabel : "No users found"}
//                             </p>
//                         </div>
//                     ) : (
//                         <div
//                             className={` [&>*:first-child]:h-full ${heightClass ? heightClass : "h-auto"
//                                 }`}
//                         >
//                             <Table className="relative">
//                                 <TableHeader className="sticky top-0 z-1 bg-E8E8E8">
//                                     {table?.getHeaderGroups().map((headerGroup) => (
//                                         <TableRow key={headerGroup.id}>
//                                             {headerGroup.headers.map(
//                                                 (header: Header<any, unknown>, index: number) => (
//                                                     <TableHead
//                                                         key={index}
//                                                         colSpan={header.colSpan}
//                                                         className="bg-gray-200"
//                                                     >
//                                                         {header.isPlaceholder ? null : (
//                                                             <div
//                                                                 className={`flex items-center gap-1 text-xs font-normal ${header.column.getCanSort()
//                                                                     ? "cursor-pointer select-none"
//                                                                     : ""
//                                                                     }`}
//                                                                 style={{
//                                                                     minWidth: getWidth(header.id),
//                                                                     width: getWidth(header.id),
//                                                                     borderRadius:
//                                                                         index === 0
//                                                                             ? "5px 0 0 0"
//                                                                             : index === headerGroup.headers.length - 1
//                                                                                 ? "0 5px 0 0"
//                                                                                 : "0",
//                                                                 }}
//                                                             >
//                                                                 {flexRender(
//                                                                     header.column.columnDef.header,
//                                                                     header.getContext()
//                                                                 )}
//                                                             </div>
//                                                         )}
//                                                     </TableHead>
//                                                 )
//                                             )}
//                                         </TableRow>
//                                     ))}
//                                 </TableHeader>
//                                 <TableBody className="relative">
//                                     {loading && !isFetchingNextPage ? (
//                                         [...Array(15)].map((_, i) => (
//                                             <TableRow
//                                                 key={`loading-row-${i}`}
//                                                 className="border-b-4 border-b-lightgray text-xs 3xl:text-sm text-gray-700 font-normal"
//                                             >
//                                                 {[...Array(columns.length)].map((_, j) => (
//                                                     <TableCell key={`loading-cell-${i}-${j}`}>
//                                                         {j == 1 ? (
//                                                             <div className="p-0 flex gap-0 items-center">
//                                                                 <Skeleton className="h-7 w-7 rounded-full bg-gray-200" />
//                                                                 <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
//                                                             </div>
//                                                         ) : (
//                                                             <div className="p-0">
//                                                                 <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
//                                                             </div>
//                                                         )}
//                                                     </TableCell>
//                                                 ))}
//                                             </TableRow>
//                                         ))
//                                     ) : (
//                                         <>

//                                             {table?.getRowModel().rows.map((row, index) => {
//                                                 const isLastRow =
//                                                     index === table.getRowModel().rows.length - 1;
//                                                 return (
//                                                     <TableRow
//                                                         key={row.id}
//                                                         ref={isLastRow ? lastRowRef : null}
//                                                         onClick={() => onRowClick?.(row.original)}
//                                                         className={`border-b border-slate-200 h-full w-full text-center hover:text-black  hover:bg-white transition-colors duration-200 cursor-pointer`}
//                                                     >
//                                                         {row.getVisibleCells().map((cell) => (
//                                                             <TableCell
//                                                                 className={`p-0 !bg-transparent defaultCell transition-colors duration-200 cursor-pointer`}
//                                                                 key={cell.id}
//                                                             >
//                                                                 {flexRender(
//                                                                     cell.column.columnDef.cell,
//                                                                     cell.getContext()
//                                                                 )}
//                                                             </TableCell>
//                                                         ))}
//                                                     </TableRow>
//                                                 );
//                                             })}
//                                             {isFetchingNextPage && (
//                                                 <TableRow>
//                                                     <TableCell
//                                                         colSpan={columns.length}
//                                                         className="p-3 text-center"
//                                                     >
//                                                         <div className="flex justify-center py-2">
//                                                             <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
//                                                         </div>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             )}
//                                         </>
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     };
// export default TanStackTable;
