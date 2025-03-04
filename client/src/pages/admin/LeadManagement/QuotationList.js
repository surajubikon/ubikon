import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api, { baseURL } from '../../../API/api.url';
import Sidebar from "../components/Sidebar";
import CustomDataTable from "../components/CustomDataTable";

const QuotationList = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [quotationNo, setQuotationNo] = useState("");
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}${api.quotation.getQuotations.url}`);
                setData(response.data.data);
                setFilteredData(response.data.data);
                setQuotationNo();
            } catch (error) {
                setQuotationNo();
                console.error("Error fetching quotations:", error);
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
                    row?.quotationNo?.includes(search) ||
                    row?.quotationDate?.includes(search) ||
                    row?.name?.toLowerCase().includes(search?.toLowerCase()) ||
                    row?.email?.toLowerCase().includes(search?.toLowerCase()) ||
                    row?.phone?.toLowerCase().includes(search) ||
                    row?.address?.toLowerCase().includes(search?.toLowerCase()) ||
                    row?.totalAmount?.includes(search)
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
        { name: "Quotation No", selector: (row) => row.quotationNo, sortable: true },
        { name: "Quotation Date", selector: (row) => row.quotationDate, sortable: true },
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Phone", selector: (row) => row.phone, sortable: true },
        { name: "Address", selector: (row) => row.address, sortable: true },
        { name: "Total Amount", selector: (row) => row.totalAmount, sortable: true },
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
