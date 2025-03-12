import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import api, { baseURL } from '../../../API/api.url';
import Sidebar from "../components/Sidebar";
import CustomDataTable from "../components/CustomDataTable";

const QuotationList = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}${api.quotation.getQuotations.url}`);
                setData(response.data.data);
                setFilteredData(response.data.data);
            } catch (error) {
                console.error("Error fetching quotations:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            setFilteredData(data);
        } else {
            const result = data.filter((row) => {
                const formattedDate = row?.quotationDate
                    ? new Date(row.quotationDate).toLocaleDateString("en-GB")
                    : "";

                return (
                    String(row?.quotationNo || "").toLowerCase().includes(search.toLowerCase()) ||
                    formattedDate.includes(search) ||
                    String(row?.name || "").toLowerCase().includes(search.toLowerCase()) ||
                    String(row?.email || "").toLowerCase().includes(search.toLowerCase()) ||
                    String(row?.phone || "").includes(search) ||
                    String(row?.address || "").toLowerCase().includes(search.toLowerCase()) ||
                    String(row?.totalAmount || "").includes(search)
                );
            });
            setFilteredData(result);
        }
    }, [search, data]);

    const handleDelete = async (quotationId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this quotation?");
        if (!isConfirmed) return;

        try {
            const response = await axios.delete(`${baseURL}${api.quotation.deleteQuotation.url}/${quotationId}`);
            setData((prevData) => prevData.filter((quotation) => quotation._id !== quotationId));
            setFilteredData((prevData) => prevData.filter((quotation) => quotation._id !== quotationId));
            if (response.status === 200) {
                toast.success("Quotation Deleted Successfully");
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.error("Error deleting Quotation:", error);
        }
    };

    const columns = [
        {
            name: "S No",
            selector: (row, index) => index + 1,
            sortable: false,
            width: "70px"
        },
        { name: "Quotation No", selector: (row) => row.quotationNo, sortable: true, width: "150px" },
        {
            name: "Quotation Date",
            selector: (row) => {
                if (!row.quotationDate) return "";
                const date = new Date(row.quotationDate);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
            sortable: true,
            width: "160px",
        },
        { name: "Name", selector: (row) => row.name, sortable: true, width: "220px" },
        { name: "Email", selector: (row) => row.email, sortable: true, width: "220px" },
        { name: "Phone", selector: (row) => row.phone, sortable: true, width: "140px" },
        { name: "Address", selector: (row) => row.address, sortable: true, width: "200px" },
        { name: "Total Amount", selector: (row) => row.totalAmount, sortable: true, width: "150px" },
        {
            name: "Generate Quotation",
            cell: (row) => (
                <Link to="/genrate-quotation" state={row._id}><button
                    className="btn btn-success"
                >
                    Generate
                </button>
                </Link>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "180px"
        },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <FaTrash
                        style={{ cursor: "pointer", color: "red", fontSize: "25px" }}
                        onClick={() => handleDelete(row._id)}
                    />
                </div>
            ),
            width: "120px",
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
                    <h2>Quotation List</h2>
                    <input
                        type="text"
                        placeholder="Search quotations..."
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
                    <Link to="/quotation-add"><button className="btn btn-primary">Add Quotation</button></Link>
                    <CustomDataTable columns={columns} data={filteredData} />
                </div>
            </div>
        </div>
    );
};

export default QuotationList;
