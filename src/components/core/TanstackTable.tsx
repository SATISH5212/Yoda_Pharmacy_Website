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
    useReactTable
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
    heightClass,
    noDataLabel,
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location?.search);
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
        getPaginationRowModel: getPaginationRowModel(),
        manualSorting: true,
        manualPagination: true,
    });

    const capturePageNum = (value: number) => {
        getData({
            ...searchParams,
            page_size: searchParams.get("page_size")
                ? +(searchParams.get("page_size") as string)
                : 25,
            page: value,
            order_by: searchParams.get("order_by"),
            order_type: searchParams.get("order_type"),
        });
    };

    const captureRowPerItems = (value: number) => {
        getData({
            ...searchParams,
            page_size: value,
            page: 1,
            order_by: searchParams.get("order_by"),
            order_type: searchParams.get("order_type"),
            //search_string:searchParams.get("search_string"),
        });
    };

    const getWidth = (id: string) => {
        const widthObj = columns.find((col) => col.id === id);
        return widthObj ? widthObj?.width || widthObj?.size || "100px" : "100px";
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
        <div className="w-full rounded-lg shadow-sm border border-gray-200 bg-white">
            <div
                className="w-1832px relative bg-white overflow-hidden"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "944px",
                }}
            >
                {!data.length && !loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col justify-center items-center text-center">
                            <img
                                src={"/images/core/no-data.jpg"}
                                alt="No Data"
                                className="w-[300px] h-auto mx-auto"
                            />
                            <p className="text-[20px] text-zinc-800 font-normal mt-4">
                                {noDataLabel ? noDataLabel : "No data available"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col">

                        <div className="flex-1 overflow-auto custom-scrollbar">
                            <table className="w-full border-collapse bg-white min-w-full">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                    {table?.getHeaderGroups().map((headerGroup) => (
                                        <tr
                                            key={headerGroup.id + `-${new Date().getTime()}`}
                                            className="border-b border-gray-200"
                                        >
                                            {headerGroup.headers.map(
                                                (header: Header<any, unknown>, index: number) => {
                                                    if (location.pathname.includes("/dashboard")) {
                                                        return (
                                                            <th
                                                                key={index + `-${new Date().getTime()}`}
                                                                colSpan={header.colSpan}
                                                                className="bg-gray-500 text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200"
                                                                style={{
                                                                    minWidth: getWidth(header.id),
                                                                    width: getWidth(header.id),
                                                                }}
                                                            >
                                                                {header.isPlaceholder ? null : (
                                                                    <div
                                                                        {...{
                                                                            className: header.column.getCanSort()
                                                                                ? "cursor-pointer select-none"
                                                                                : "",
                                                                            onClick:
                                                                                header.column.getToggleSortingHandler(),
                                                                        }}
                                                                        className="flex items-center gap-2"
                                                                    >
                                                                        {flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                        {{
                                                                            asc: (
                                                                                <img
                                                                                    src={
                                                                                        "/images/dashboard/table/sort-asc.svg"
                                                                                    }
                                                                                    height={20}
                                                                                    width={20}
                                                                                    alt="Asc"
                                                                                    className={
                                                                                        removeSortingForColumnIds?.includes(
                                                                                            header.id
                                                                                        ) || header.colSpan == 2
                                                                                            ? "hidden"
                                                                                            : ""
                                                                                    }
                                                                                />
                                                                            ),
                                                                            desc: (
                                                                                <img
                                                                                    src={
                                                                                        "/images/dashboard/table/sort-desc.svg"
                                                                                    }
                                                                                    height={20}
                                                                                    width={20}
                                                                                    alt="Desc"
                                                                                    className={
                                                                                        removeSortingForColumnIds?.includes(
                                                                                            header.id
                                                                                        ) || header.colSpan == 2
                                                                                            ? "hidden"
                                                                                            : ""
                                                                                    }
                                                                                />
                                                                            ),
                                                                        }[
                                                                            header.column.getIsSorted() as string
                                                                        ] ?? (
                                                                                <img
                                                                                    src={
                                                                                        "/images/dashboard/table/sort-norm.svg"
                                                                                    }
                                                                                    height={15}
                                                                                    width={15}
                                                                                    alt="No Sort"
                                                                                    className={
                                                                                        removeSortingForColumnIds?.includes(
                                                                                            header.id
                                                                                        ) || header.colSpan == 2
                                                                                            ? "hidden"
                                                                                            : ""
                                                                                    }
                                                                                />
                                                                            )}
                                                                    </div>
                                                                )}
                                                            </th>
                                                        );
                                                    } else {
                                                        return (
                                                            <th
                                                                key={index + `-${new Date().getTime()}`}
                                                                colSpan={header.colSpan}
                                                                className="bg-gray-50 text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200"
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
                                                                        {flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                        <SortItems
                                                                            header={header}
                                                                            removeSortingForColumnIds={
                                                                                removeSortingForColumnIds
                                                                            }
                                                                            getData={getData}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </th>
                                                        );
                                                    }
                                                }
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {data?.length ? (
                                        table?.getRowModel().rows.map((row, rowIndex) => (
                                            <tr
                                                key={row.id + `-${new Date().getTime()}`}
                                                className="hover:bg-gray-50/50 transition-colors duration-200"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <td
                                                        className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 whitespace-nowrap"
                                                        key={cell.id + `-${new Date().getTime()}`}
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : loading ? (
                                        <tr>
                                            <td
                                                colSpan={columns?.length}
                                                className="px-6 py-8 text-sm text-center text-gray-500"
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
                    </div>
                )}
            </div>
            {data?.length && paginationDetails ? (
                <div className="border-t border-gray-200 bg-white sticky bottom-0 z-10">
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
        <div className="flex items-center flex-col">
            <div
                className={`[&_svg]:size-2 ${isAscending ? "text-primary-600 [&_svg]:size-2 " : ""}`}
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
                        ...Object.fromEntries(newSearchParams.entries()),
                        page: searchParams.get("page") || 1,
                        page_size: searchParams.get("page_size") || 25,
                    });
                }}
            >
                <SortAscIcon />
            </div>

            <div
                className={`[&_svg]:size-2 ${isDescending ? "text-primary-600 [&_svg]:size-2 " : ""}`}
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
                        ...Object.fromEntries(newSearchParams.entries()),
                        page: searchParams.get("page") || 1,
                        page_size: searchParams.get("page_size") || 25,
                    });
                }}
            >
                <SortDescIcon />
            </div>
        </div>
    );
};
export default TanStackTable;
