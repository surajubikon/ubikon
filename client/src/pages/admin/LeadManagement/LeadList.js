import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api, { baseURL } from '../../../API/api.url';
import Sidebar from "../components/Sidebar";
import CustomDataTable from "../components/CustomDataTable";

const LeadList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}${api.lead.getLeads.url}`);
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(data);
    } else {
      const result = data.filter(
        (row) =>
          row?.company?.toLowerCase().includes(search?.toLowerCase()) ||
          row?.projectName?.toLowerCase().includes(search?.toLowerCase()) ||
          row?.name?.toLowerCase().includes(search?.toLowerCase()) ||
          row?.email?.toLowerCase().includes(search?.toLowerCase()) ||
          row?.phone?.toLowerCase().includes(search) ||
          row?.source?.toLowerCase().includes(search?.toLowerCase()) ||
          row?.status?.toLowerCase().includes(search?.toLowerCase())
      );
      setFilteredData(result);
    }
  }, [search, data]);

  const columns = [
    {
      name: "S No",
      selector: (row, index) => index + 1,
      sortable: false
    },
    { name: "Company", selector: (row) => row.company, sortable: true },
    { name: "Project Name", selector: (row) => row.projectName, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Source", selector: (row) => row.source, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
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
          <Link to="/lead-add"><button className="btn btn-primary">Add Lead</button></Link>
          <CustomDataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default LeadList;
