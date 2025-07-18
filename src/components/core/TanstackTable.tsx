import { pageProps } from "@/lib/interfaces/core/iTable";
import { useLocation } from "@tanstack/react-router";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Header,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";
import SortAscIcon from "../icons/table/sort-asc";
import SortDescIcon from "../icons/table/sort-desc";
import Pagination from "./Pagination";

const TableSkeleton: FC<{ columns: number; rows?: number }> = ({ columns, rows = 10 }) => {
    return (
        <div className="w-full">
            <div className="bg-gray-100 rounded-sm mb-1">
                <div className="flex">
                    {Array.from({ length: columns }).map((_, index) => (
                        <div
                            key={index}
                            className={`px-4 py-3 flex-1 ${index === 0 ? "rounded-l-sm" : ""} ${index === columns - 1 ? "rounded-r-sm" : ""
                                }`}
                        >
                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="border-b border-gray-200 last:border-b-0">
                    <div className="flex hover:bg-gray-50">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div key={colIndex} className="px-4 py-3 flex-1">
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const TanStackTable: FC<pageProps> = ({
    columns,
    data,
    loading = false,
    getData,
    paginationDetails,
    removeSortingForColumnIds,
    noDataLabel,
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);
    const table = useReactTable({
        columns,
        data: data?.length ? data : [],
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualSorting: true,
        manualPagination: true,
    });

    const capturePageNum = (value: number) => {
        getData({
            page: value,
            page_size: Number(searchParams.get("page_size")) || 10,
            order_by: searchParams.get("order_by") || undefined,
            order_type: searchParams.get("order_type") || undefined,
        });
    };

    const captureRowPerItems = (value: number) => {
        getData({
            page: 1,
            page_size: value,
            order_by: searchParams.get("order_by") || undefined,
            order_type: searchParams.get("order_type") || undefined,
        });
    };

    const getWidth = (id: string) => {
        const widthObj = columns.find((col) => col.id === id);
        return widthObj ? widthObj?.width || widthObj?.size || "auto" : "auto";
    };

    const sortAndGetData = (header: Header<any, unknown>) => {
        if (
            removeSortingForColumnIds &&
            removeSortingForColumnIds.length &&
            removeSortingForColumnIds.includes(header.id)
        ) {
            return;
        }

        let orderBy = header.id;
        let orderType = "asc";

        if (searchParams.get("order_by")?.startsWith(header.id)) {
            if (searchParams.get("order_by") === header.id) {
                if (searchParams.get("order_type") === "asc") {
                    orderType = "desc";
                    orderBy = header.id;
                } else {
                    orderBy = "";
                    orderType = "";
                }
            }
        }

        getData({
            page: Number(searchParams.get("page")) || 1,
            page_size: Number(searchParams.get("page_size")) || 10,
            order_by: orderBy,
            order_type: orderType,
        });
    };
    if (loading) {
        return <TableSkeleton columns={columns.length} rows={20} />;
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 min-h-0 overflow-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
                {!data.length && !loading ? (
                    <div className="flex-1 flex justify-center items-center p-4">
                        <div className="flex flex-col justify-center items-center text-center">
                            <img
                                src="assets/logo.svg"
                                alt="No Data"
                                className="max-w-[150px] sm:max-w-[200px] md:max-w-[300px] h-auto mx-auto"
                            />
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-normal mt-4">
                                {noDataLabel || "No data available"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                {table?.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id + `-${new Date().getTime()}`}>
                                        {headerGroup.headers.map((header: Header<any, unknown>, index: number) => (
                                            <th
                                                key={index + `-${new Date().getTime()}`}
                                                colSpan={header.colSpan}
                                                className={`bg-gray-100 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 border-b-2 border-gray-200 ${index === 0 ? "rounded-l-sm" : ""
                                                    } ${index === headerGroup.headers.length - 1 ? "rounded-r-sm" : ""
                                                    }`}
                                                style={{
                                                    minWidth: getWidth(header.id),
                                                    width: getWidth(header.id),
                                                }}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        onClick={() => sortAndGetData(header)}
                                                        className="flex items-center gap-1 sm:gap-2 cursor-pointer"
                                                    >
                                                        <span className="truncate">
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                        </span>
                                                        <SortItems
                                                            header={header}
                                                            removeSortingForColumnIds={removeSortingForColumnIds}
                                                            getData={getData}
                                                        />
                                                    </div>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {table?.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id + `-${new Date().getTime()}`}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900"
                                                key={cell.id + `-${new Date().getTime()}`}
                                            >
                                                <div className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {data?.length && paginationDetails && !loading ? (
                <div className="flex-shrink-0 border-t  border-gray-200 bg-white px-2 sm:px-4 py-2 sm:py-3 fixed bottom-0  w-[calc(100%-32px)] z-20 bg-white shadow-lg">
                    <Pagination
                        paginationDetails={paginationDetails}
                        capturePageNum={capturePageNum}
                        captureRowPerItems={captureRowPerItems}
                    />
                </div>
            ) : null}
        </div>
    );
};

const SortItems = ({
    header,
    removeSortingForColumnIds,
    getData,
}: {
    header: Header<any, unknown>;
    removeSortingForColumnIds?: string[];
    getData: (params: any) => void;
}) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);
    const sortBy = searchParams.get("order_by");
    const sortDirection = searchParams.get("order_type");

    if (removeSortingForColumnIds?.includes(header.id)) {
        return null;
    }

    const isAscending = sortBy === header.id && sortDirection === "asc";
    const isDescending = sortBy === header.id && sortDirection === "desc";

    return (
        <div className="flex items-center flex-col flex-shrink-0">
            <div
                className={`[&_svg]:size-2 sm:[&_svg]:size-3 ${isAscending ? "text-blue-600" : "text-gray-400"} cursor-pointer hover:text-blue-500 transition-colors`}
                onClick={(e) => {
                    e.stopPropagation();
                    getData({
                        page: Number(searchParams.get("page")) || 1,
                        page_size: Number(searchParams.get("page_size")) || 10,
                        order_by: isAscending ? "" : header.id,
                        order_type: isAscending ? "" : "asc",
                    });
                }}
            >
                <SortAscIcon />
            </div>
            <div
                className={`[&_svg]:size-2 sm:[&_svg]:size-3 ${isDescending ? "text-blue-600" : "text-gray-400"} cursor-pointer hover:text-blue-500 transition-colors`}
                onClick={(e) => {
                    e.stopPropagation();
                    getData({
                        page: Number(searchParams.get("page")) || 1,
                        page_size: Number(searchParams.get("page_size")) || 10,
                        order_by: isDescending ? "" : header.id,
                        order_type: isDescending ? "" : "desc",
                    });
                }}
            >
                <SortDescIcon />
            </div>
        </div>
    );
};

export default TanStackTable;