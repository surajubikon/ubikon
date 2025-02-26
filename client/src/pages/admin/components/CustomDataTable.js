import DataTable from "react-data-table-component";

const CustomDataTable = ({ data, columns }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      striped
      responsive
    />
  );
};

export default CustomDataTable;
