import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CustomDataTable from "../components/CustomDataTable"; // Import new DataTable component

const LeadList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" },
        { id: 3, name: "Mike Smith", email: "mike@example.com" },
        { id: 4, name: "Emma Johnson", email: "emma@example.com" },
        { id: 5, name: "Oliver Brown", email: "oliver@example.com" },
        { id: 6, name: "Ava Williams", email: "ava@example.com" },
        { id: 7, name: "Lucas Jones", email: "lucas@example.com" },
        { id: 8, name: "Sophia Garcia", email: "sophia@example.com" },
        { id: 9, name: "Mason Martinez", email: "mason@example.com" },
        { id: 10, name: "Isabella Rodriguez", email: "isabella@example.com" },
      ];
      setData(fakeData);
      setFilteredData(fakeData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, data]);

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
  ];

  return (
    <div className="admin">
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <h2>Lead List</h2>
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <CustomDataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default LeadList;
