import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import api, { baseURL } from '../../../API/api.url';
import Sidebar from "../components/Sidebar";
import CustomDataTable from "../components/CustomDataTable";

const LeadList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const statusOptions = ["New", "Contacted", "Interested", "Converted", "Not Interested"];

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

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const response = await axios.patch(`${baseURL}${api.lead.updateStatus.url}/${leadId}`, { status: newStatus });
      setData((prevData) =>
        prevData.map((lead) => (lead._id === leadId ? { ...lead, status: newStatus } : lead))
      );
      setFilteredData((prevData) =>
        prevData.map((lead) => (lead._id === leadId ? { ...lead, status: newStatus } : lead))
      );
      if (response.status === 200) {
        toast.success("Lead Status Updated Successfully");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (leadId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this lead?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${baseURL}${api.lead.deleteLead.url}/${leadId}`);
      setData((prevData) => prevData.filter((lead) => lead._id !== leadId));
      setFilteredData((prevData) => prevData.filter((lead) => lead._id !== leadId));
      if (response.status === 200) {
        toast.success("Lead Deleted Successfully");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

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
    { name: "Remark", selector: (row) => row.remark, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          style={{ padding: "5px", borderRadius: "5px" }}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <FaTrash
          style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
          onClick={() => handleDelete(row._id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
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
