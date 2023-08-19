import tableDataDevelopment from "./variables/tableDataDevelopment";
import tableDataCheck from "./variables/tableDataCheck";
import tableDataColumns from "./variables/tableDataColumns";
import tableDataComplex from "./variables/tableDataComplex";
import ColumnsTable from "./components/ColumnsTable";



const Tables = () => {
  return (
    <div>


      <div className="mt-5 h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable tableData={tableDataColumns} />


      </div>
    </div>
  );
};

export default Tables;
