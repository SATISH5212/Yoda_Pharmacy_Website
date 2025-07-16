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

    return (
        <div className="w-full flex flex-col">
            <div className="flex-1 ">
                {!data.length && !loading ? (
                    <div className="flex justify-center items-center min-h-[400px] p-4">
                        <div className="flex flex-col justify-center items-center text-center">
                            <img
                                src="/images/core/no-data.jpg"
                                alt="No Data"
                                className="max-w-[200px] sm:max-w-[300px] h-auto mx-auto"
                            />
                            <p className="text-lg text-gray-600 font-normal mt-4">
                                {noDataLabel || "No data available"}
                            </p>
                        </div>
                    </div>
                ) : ( 
                    <div className="w-full max-h-[500px] overflow-auto pb-10">
                        <table className="w-full">
                            <thead className="sticky top-0 z-10 ">
                                {table?.getHeaderGroups().map((headerGroup) => (
                                    <tr
                                        key={headerGroup.id + `-${new Date().getTime()}`}
                                        className=""
                                    >
                                        {headerGroup.headers.map((header: Header<any, unknown>, index: number) => (
                                            <th
                                                key={index + `-${new Date().getTime()}`}
                                                colSpan={header.colSpan}
                                                className={`bg-gray-100 text-xs px-4 py-1 font-semibold text-gray-900 ${index === 0 ? 'rounded-l-sm' : ''
                                                    } ${index === headerGroup.headers.length - 1 ? 'rounded-r-sm' : ''
                                                    }`}
                                                style={{
                                                    minWidth: getWidth(header.id),
                                                    width: getWidth(header.id),
                                                }}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        onClick={() => sortAndGetData(header)}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                            <tbody className="divide-y">
                                {data?.length ? (
                                    table?.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id + `-${new Date().getTime()}`}
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <td
                                                    className="px-4 py-1.5 text-xs text-gray-900 whitespace-nowrap"
                                                    key={cell.id + `-${new Date().getTime()}`}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : loading ? (
                                    <tr>
                                        <td
                                            colSpan={columns?.length}
                                            className="px-4 py-8 text-sm text-center text-gray-500"
                                        >
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                                <span className="ml-2">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {data?.length && paginationDetails ? (
                <div className="sticky bottom-0 z-10 bg-white">
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
        <div className="flex items-center flex-col ">
            <div
                className={`[&_svg]:size-2 ${isAscending ? "text-blue-600" : "text-gray-500"} cursor-pointer`}
                onClick={(e) => {
                    e.stopPropagation();
                    const newSearchParams = new URLSearchParams(searchParams);

                    if (isAscending) {
                        newSearchParams.delete("order_by");
                        newSearchParams.delete("order_type");
                    } else {
                        newSearchParams.set("order_by", header.id);
                        newSearchParams.set("order_type", "asc");
                    }
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
                className={`[&_svg]:size-2 ${isDescending ? "text-blue-600" : "text-gray-500"}`}
                onClick={(e) => {
                    e.stopPropagation();
                    const newSearchParams = new URLSearchParams(searchParams);

                    if (isDescending) {
                        newSearchParams.delete("order_by");
                        newSearchParams.delete("order_type");
                    } else {
                        newSearchParams.set("order_by", header.id);
                        newSearchParams.set("order_type", "desc");
                    }

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