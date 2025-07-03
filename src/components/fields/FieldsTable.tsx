import { getAllFieldsAPI } from "@/lib/services/fields";
import { FieldResponse } from "@/types/dataTypes";
import { useQuery } from "@tanstack/react-query";
import TanStackTable from "../core/TanstackTable";
import { allFieldsColumns } from "./AllFieldsColumns";

const FieldsTable = () => {
    const {
        data: allFieldsData,
    } = useQuery({
        queryKey: ["all-fieldsData"],
        queryFn: async () => {
            const response = await getAllFieldsAPI();
            if (response?.status === 200 || response?.status === 201) {
                return response.data;
            }
            throw new Error("Failed to fetch gateways");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: true,
    });


    const data = allFieldsData?.data?.records?.map((field: FieldResponse) => ({
        ...field,
        field_area: field.field_area || "2.4",
        field_status: field.field_status === "pending" ? "Active" : field.field_status,
    })) || [];

    return (
        <TanStackTable
            columns={allFieldsColumns}
            data={data}
            loading={!allFieldsData}
            heightClass="h-[400px]"
            noDataLabel="No fields found"
        />
    );
};

export default FieldsTable;