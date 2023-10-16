import React, { useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { ExclamationCircleFilled } from '@ant-design/icons';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { baseURL, baseURLstatic } from "lib/url";
import axios from "axios";
import { Modal, notification } from "antd";
import Link from "antd/es/typography/Link";

type RowObj = {
  id: number;
  productCode: string;
  productName: string;
  productPrice: string;
  productAmount: string;
  productImage: string;
  productType: string;
};

function ColumnsTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);



  const { confirm } = Modal;

  const deleteProduct2 = (id: number) => {
    confirm({
      title: 'คุณต้องการลบใช่ไหม',
      icon: <ExclamationCircleFilled />,
      content: 'เมื่อลบแล้วจะไม่สามารถกู้คืนได้',
      okButtonProps: {
        style: {
          backgroundColor: 'red'
        }
      },
      onOk() {
        const formData = new FormData();
        formData.append('id', id.toString());
        axios.post(`${baseURL}/delete-product`, formData).then((response: any) => {
          window.location.reload();
        });
      },
      onCancel() {},
    });
  };

  const EditProduct = (id: number) => {
    window.location.href = "/admin/product?id="+id;
  }


  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">id</p>
      ),
      //cell is index +1 
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("productImage", {
      id: "productImage",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">id</p>
      ),
      //cell is index +1 
      cell: (info: any) => (
        <img className="h-20 w-20 rounded-full border-gray-200 border transform hover:scale-125 transition duration-300 ease-in-out" src={baseURLstatic+"/"+info.getValue()} alt="" />
      ),
    }),
    columnHelper.accessor("productCode", {
      id: "productCode",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">รหัสสินค้ายา</p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("productName", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ชื่อสินค้า
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("productPrice", {
      id: "quantity",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          	ราคา
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("productAmount", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">จำนวน</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("id", {
      id: "edit",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">แก้ไข</p>
      ),
      cell: (info) => (
          <button className="linear mt-2 px-5 rounded-xl bg-brand-500 py-1 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={e => {
            EditProduct(info.getValue())
          }}
          >
          แก้ไข
          </button>
      ),
    }),
    columnHelper.accessor("id", {
      id: "delete",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ลบ</p>
      ),
      cell: (info) => (
        <button className="linear mt-2 px-5  rounded-xl bg-red-200 py-1 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-red-400 dark:text-white dark:hover:bg-pink-300 dark:active:bg-brand-200"
        onClick={e => {
          deleteProduct2(info.getValue());
        }}
        >
        ลบ
        </button>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(defaultData);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          รายการคลังยา
        </div>
        {/* create new data in path /admin/product */}

          <button 
          className="linear mt-2 px-5 rounded-xl bg-brand-500 py-1 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={() => {
            window.location.href = "/admin/product";
          }}
          >
            เพิ่มสินค้า
          </button>

      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* 123 */}
      <div ></div>
    </Card>
  );
}

export default ColumnsTable;
const columnHelper = createColumnHelper<RowObj>();
