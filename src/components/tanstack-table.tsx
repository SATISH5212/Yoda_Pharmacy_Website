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
import { useLocation, useParams, useRouter } from "@tanstack/react-router";
// import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; 

// import { pageProps } from "@/lib/interfaces/core/iTable";
// import { NoUsersDataSvg } from "../svg/NoUsersDataSvg";

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
  });
  const getWidth = (id: string) => {
    const widthObj = columns.find((col) => col.id === id);
    return widthObj ? widthObj?.width || widthObj?.size || "100px" : "100px";
  };
  const { user_id, apfc_id } = useParams({ strict: false });
  return (
    <div
      className={`scrollbar overflow-x-auto w-full ${
        heightClass ? heightClass : "h-auto"
      }`}
    >
      <div
        className={`overflow-auto scrollbar w-full relative ease-in-out duration-300 transition-all ${
          heightClass ? heightClass : "h-auto"
        }`}
      >
        {!data.length && !loading ? (
          <div className="p-4 w-full  box-border flex flex-col items-center justify-center text-center text-gray-500">
            <NoUsersDataSvg />
            <p className="mb-2 font-medium">
              {noDataLabel ? noDataLabel : "No users found"}
            </p>
          </div>
        ) : (
          <div
            className={` [&>*:first-child]:h-full ${
              heightClass ? heightClass : "h-auto"
            }`}
          >
            <Table className="relative">
              <TableHeader className="sticky top-0 z-1 bg-E8E8E8">
                {table?.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header: Header<any, unknown>, index: number) => (
                        <TableHead
                          key={index}
                          colSpan={header.colSpan}
                          className="bg-gray-200"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={`flex items-center gap-1 text-xs font-normal ${
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : ""
                              }`}
                              style={{
                                minWidth: getWidth(header.id),
                                width: getWidth(header.id),
                                borderRadius:
                                  index === 0
                                    ? "5px 0 0 0"
                                    : index === headerGroup.headers.length - 1
                                      ? "0 5px 0 0"
                                      : "0",
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
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
                      className="border-b-4 border-b-lightgray text-xs 3xl:text-sm text-gray-700 font-normal"
                    >
                      {[...Array(columns.length)].map((_, j) => (
                        <TableCell key={`loading-cell-${i}-${j}`}>
                          {j == 1 ? (
                            <div className="p-0 flex gap-0 items-center">
                              <Skeleton className="h-7 w-7 rounded-full bg-gray-200" />
                              <Skeleton className="h-3 w-3/5 bg-gray-200 rounded-none" />
                            </div>
                          ) : (
                            <div className="p-0">
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
                          className={`border-b border-slate-200 h-full w-full text-center hover:text-black ${
                            user_id == row.original.id || apfc_id == row.original.id
                              ? "bg-E4F5E3"
                              : "hover:bg-white"
                          } transition-colors duration-200 cursor-pointer`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              className={`p-0 !bg-transparent ${
                                user_id == row.original.id || apfc_id == row.original.id
                                  ? "selectedCell"
                                  : "defaultCell"
                              } transition-colors duration-200 cursor-pointer`}
                              key={cell.id}
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
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="p-3 text-center"
                        >
                          <div className="flex justify-center py-2">
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
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
