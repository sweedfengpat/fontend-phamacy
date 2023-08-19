import ColumnsTable from "./components/ColumnsTable";
import { useEffect } from "react";
import React from "react";
import { baseURL } from "lib/url";
import axios from "axios";

interface DataTable {
  id: number;
  productCode: string;
  productName: string;
  productPrice: string;
  productAmount: string;
  productImage: string;
  productType: string;
}

const Tables = () => {
  const [tableDataColumns, setTableDataColumns] = React.useState<DataTable[]>([]);
  const [page , setPage] = React.useState<number>(1);
  useEffect(() => {
    if (tableDataColumns.length === 0) {
      const formData = new FormData();
      formData.append('id', "1");
      axios.post(`${baseURL}/all-product`, formData).then((response: any) => {
        let new_rows: any = [];
        let data = JSON.parse(response.data);
        setTableDataColumns(data);
      });
    }
  }, []);
  return (
    <div>

      <div className="mt-5  h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable tableData={tableDataColumns} />
      </div>
    </div>
  );
};

export default Tables;
