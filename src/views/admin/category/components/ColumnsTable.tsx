import React, { useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { ExclamationCircleFilled } from '@ant-design/icons';
import clsx from "clsx"

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
  name: string;
};

function ColumnsTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [value, setValue] = React.useState<string>("");


  const { confirm } = Modal;

  const deleteProduct2 = (id: number) => {
    confirm({
      title: 'คุณต้องการลบใช่ไหม',
      icon: <ExclamationCircleFilled />,
      content: 'เมื่อลบแล้วจะไม่สามารถกู้คืนได้',
      onOk() {
        const formData = new FormData();
        formData.append('id', id.toString());
        axios.post(`${baseURL}/delete-category`, formData).then((response: any) => {
          window.location.reload();
        });
      },
      onCancel() { },
    });
  };

  const EditProduct = (id: number) => {
    window.location.href = "/admin/category?id=" + id;
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
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          ชื่อประเภทสินค้า
        </p>
      ),
      cell: ({ row, cell }) => {
        if (editID === row.original.id.toString()) {
          return (
            <input
              className="w-96 h-10 pl-4 mt-2 border-2 dark:!text-[#000] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="กรอกประเภทสินค้า"
              value={value}
              onChange={(e) => {
                console.log(e.target.value);
                setValue(e.target.value);
              }}
            />
          )
        } else {
          return (
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {row.original.name.toString()}
            </p>
          )
        }
      },
    }),
    columnHelper.accessor("id", {
      id: "edit",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">แก้ไข</p>
      ),
      cell: (info) => (
        <button className="linear mt-2 px-5 rounded-xl bg-brand-500 py-1 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={e => {
            if(editID === info.getValue().toString()){
              console.log("editID === info.getValue().toString()");
              handleSubmit();
            }else{
              setCanvisible(false);
              setValue(info.row.original.name.toString());
              setEditID(info.getValue().toString());
            }
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
  const [data, setData] = React.useState<RowObj[]>(defaultData);
  const [editID, setEditID] = React.useState<string>();
  const [canvisibled, setCanvisible] = React.useState<boolean>(false);
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

  const handleSubmit = () => {
    if (editID !== undefined && editID !== "") {
      console.log("editID !== undefined && editID !== ''");
      const formData = new FormData();
      formData.append('name', value);
      formData.append('id', editID?.toString()!);
      axios.post(`${baseURL}/update-category`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response: any) => {
        if (response.data.code === 200) {
          notification.success({
            message: 'แก้ไขข้อมูลสำเร็จ',
            description:

              'แก้ไขข้อมูลสำเร็จ',
          });
          setTimeout(() => {
            //refresh
            window.location.reload();
          }, 2000);
        } else if (response.data.code === 500) {
          setAlertError(500);
        }
      });
    } else {
      const formData = new FormData();
      formData.append('name', value);
      axios.post(`${baseURL}/add-category`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response: any) => {
        if (response.data.code === 200) {
          notification.success({
            message: 'เพิ่มข้อมูลสำเร็จ',
            description:
              'เพิ่มข้อมูลสำเร็จ',
          });
          //countdown 2 sec
          setTimeout(() => {
            //refresh
            window.location.reload();
          }, 3000);

          // window.location.href = "/admin/product";
        } else if (response.data.code === 500) {
          setAlertError(500);
          notification.error({
            message: 'เกิดข้อผิดพลาด',
            description:
              'Error 500',
          });
        }
      });
    }
  }

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          รายการประเภทสินค้า
        </div>
        {/* create new data in path /admin/product */}

        <button
          className="linear mt-2 px-5 rounded-xl bg-brand-500 py-1 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={() => {
            setEditID("");
            setValue("");
            setCanvisible(!canvisibled);
          }}
        >
          เพิ่มประเภทสินค้า
        </button>

      </header>
      <div className={clsx(
        "duration-500 transition-all overflow-hidden",
        canvisibled ? `h-full` : `h-0`
      )}>
        <Card extra={"w-full pb-10 p-4 h-full"}>

          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <div className="flex flex-col px-5">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <label className="text-2xl font-bold">ชื่อประเภทสินค้า</label>
                  <input
                    className="w-96 h-10 pl-4 mt-2 border-2 dark:!text-[#000] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="กรอกรหัสสินค้า"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className="flex flex-row justify-center mt-10 w-full">
                  <button
                    className="px-6 py-2 text-lg font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
                    onClick={() => handleSubmit()}
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

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
function setAlertError(arg0: number) {
  throw new Error("Function not implemented.");
}

