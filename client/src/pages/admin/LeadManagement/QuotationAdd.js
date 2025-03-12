import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import axios from "axios";
import { toast } from "react-toastify";
import api, { baseURL } from '../../../API/api.url';
import Sidebar from "../components/Sidebar";
import BundledEditor from "../../admin/bundled";
import MultiSelectDropdown from "../../admin/components/MultiSelectDropdown";

const QuotationAdd = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [quotationNo, setQuotationNo] = useState("");
    const [quotationDate, setQuotationDate] = useState("");
    const [items, setItems] = useState([{ description: "", qty: 1, price: "", total: 0 }]);
    const [milestones, setMilestones] = useState([]);
    const [selectedMilestones, setSelectedMilestones] = useState([]);
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [selectedProjectType, setSelectedProjectType] = useState("");
    const [selectedLead, setSelectedLead] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}${api.quotation.getQuotations.url}`);
            setQuotationNo(response.data.nextQuotationNo);
        } catch (error) {
            setQuotationNo(2001);
            console.error("Error fetching quotations:", error);
        }
    };
    fetchData();

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        if (field === "qty" || field === "price") {
            updatedItems[index].total = updatedItems[index].qty * updatedItems[index].price;
        }
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { description: "", qty: 1, price: "", total: 0 }]);
    };

    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const getTotalAmount = () => {
        return items.reduce((sum, item) => sum + (item.total || 0), 0);
    };

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const response = await fetch(`${api.milestone.milestoneGet.url}`);
                const data = await response.json();
                setMilestones(
                    data.map((milestone) => ({
                        value: milestone.value,
                        label: `${milestone.name} ........... ${milestone.percentage}%`,
                    }))
                );
            } catch (error) {
                console.error("Error fetching milestones:", error);
            }
        };
        fetchMilestones();
        const fetchLeads = async () => {
            try {
                const response = await axios.get(`${baseURL}${api.lead.getLeads.url}`);
                setLeads(response.data.data);
                setFilteredLeads(response.data.data);
            } catch (error) {
                console.error("Error fetching leads:", error);
            }
        };
        fetchLeads();
    }, []);

    useEffect(() => {
        $("#lead").select2();

        $("#lead").on("select2:select", function (e) {
            const selectedId = e.params.data.id;
            console.log("Lead Selected:", selectedId);
            const lead = leads.find((l) => l._id === selectedId);
            console.log("Found Lead:", lead);
            setSelectedLead(lead || null);
        });

        return () => {
            $("#lead").select2("destroy");
        };
    }, [filteredLeads]);


    const handleProjectTypeChange = (selectedType) => {
        setSelectedProjectType(selectedType);
        if (selectedType) {
            const filtered = leads.filter((lead) => lead.projectType === selectedType);
            setFilteredLeads(filtered);
        } else {
            setFilteredLeads(leads);
        }
        setSelectedLead(null);
    };
    const validateForm = () => {
        const errors = {};
        const quotationDate = document.getElementById("quotationDate").value;
        const lead = document.getElementById("lead").value;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const company = document.getElementById("company").value;
        if (!quotationDate) errors.quotationDate = "Quotation Date is required";
        if (!lead) errors.lead = "Please select lead";
        const phoneRegex = /^\d{10}$/;
        if (!phone) {
            errors.phone = "Phone is required";
        } else if (!phoneRegex.test(phone)) {
            errors.phone = "Please enter a valid phone";
        }
        if (!name && !company) {
            errors.name = "Either Name or Company is required";
            errors.company = "Either Name or Company is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append("name", document.getElementById("name").value);
            formData.append("company", document.getElementById("company").value);
            formData.append("email", document.getElementById("email").value);
            formData.append("phone", document.getElementById("phone").value);
            formData.append("address", document.getElementById("address").value);
            formData.append("state", document.getElementById("state").value);
            formData.append("city", document.getElementById("city").value);
            formData.append("quotationNo", document.getElementById("quotationNo").value);
            formData.append("quotationDate", document.getElementById("quotationDate").value);
            formData.append("lead", document.getElementById("lead").value);

            const imageFile = document.getElementById("image").files[0];
            if (imageFile) {
                formData.append("image", imageFile);
            }

            items.forEach((item, index) => {
                formData.append(`items[${index}][description]`, item.description);
                formData.append(`items[${index}][qty]`, item.qty);
                formData.append(`items[${index}][price]`, item.price);
                formData.append(`items[${index}][total]`, item.total);
            });
            formData.append("projectOverview", document.getElementById("projectOverview").value);
            formData.append("projectDetails", document.getElementById("projectDetails").value);
            formData.append("milestone", JSON.stringify(selectedMilestones));
            formData.append("totalAmount", document.getElementById("totalAmount").value);

            try {
                const response = await axios.post(`${baseURL}${api.quotation.createQuotation.url}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                if (response.status === 201 || response.status === 200) {
                    toast.success("Quotation added successfully!");
                    event.target.reset();
                    setItems([{ description: "", qty: 1, price: "", total: 0 }]);
                    setSelectedMilestones([])
                    setSelectedLead(null)
                    fetchData()
                    navigate("/genrate-quotation", { state: response?.data?.data?._id });
                } else {
                    toast.error("Something went wrong!");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error adding quotation!");
            }
        } else {
            console.log("Form validation failed");
        }
    };

    const handleLeadChange = (event) => {
        const selectedId = event.target.value;
        const lead = leads.find((l) => l._id === selectedId);
        setSelectedLead(lead || null);
    };

    useEffect(() => {
        const today = new Date();
        const formattedDate = formatDate(today);
        setQuotationDate(formattedDate);
    }, []);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="admin d-flex">
            <Sidebar />
            <div className="main-content container-fluid d-flex justify-content-center align-items-center" >
                <div className=" p-4  w-100" >
                    <div className="card-body">
                        <h3 className="text-center mb-4">Add Quotation</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label htmlFor="quotationNo" className="form-label">Quotation No</label>
                                    <input type="number" className="form-control" name="quotationNo" id="quotationNo" value={quotationNo} readOnly />
                                    {formErrors.name && <small className="text-danger">{formErrors.quotationNo}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="quotationDate" className="form-label">Quotation Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="quotationDate"
                                        id="quotationDate"
                                        value={quotationDate}
                                        onChange={(e) => setQuotationDate(e.target.value)}
                                    />
                                    {formErrors.quotationDate && <small className="text-danger">{formErrors.quotationDate}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="file" className="form-control" name="image" id="image" />
                                    {formErrors.image && <small className="text-danger">{formErrors.image}</small>}
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                    <label htmlFor="projectType" className="form-label">Project Type</label>
                                    <select className="form-control" name="projectType" id="projectType" onChange={(e) => handleProjectTypeChange(e.target.value)}>
                                        <option value="">Select Project Type</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="App Development">App Development</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Software Development">Software Development</option>
                                        <option value="Game Development">Game Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Machine Learning">Machine Learning</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Blockchain">Blockchain</option>
                                        <option value="Cloud Computing">Cloud Computing</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="SEO Optimization">SEO Optimization</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="Video Editing">Video Editing</option>
                                        <option value="Content Writing">Content Writing</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="IoT (Internet of Things)">IoT (Internet of Things)</option>
                                        <option value="Embedded Systems">Embedded Systems</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Database Administration">Database Administration</option>
                                        <option value="Robotics">Robotics</option>
                                    </select>
                                    {formErrors.projectType && <small className="text-danger">{formErrors.projectType}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="lead" className="form-label">Select Lead</label>
                                    <select className="form-control select2" name="lead" id="lead">
                                        <option value="">Select Lead</option>
                                        {filteredLeads.map((lead) => (
                                            <option key={lead._id} value={lead._id}>
                                                {lead.name} ({lead.company}) ({lead.phone})
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.lead && <small className="text-danger">{formErrors.lead}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Enter Name" value={selectedLead?.name || ""} />
                                    {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Enter email" value={selectedLead?.email || ""} />
                                    {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Enter phone" value={selectedLead?.phone || ""} />
                                    {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="company" className="form-label">Company</label>
                                    <input type="text" className="form-control" name="company" id="company" placeholder="Enter company" value={selectedLead?.company || ""} />
                                    {formErrors.company && <small className="text-danger">{formErrors.company}</small>}
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" id="address" placeholder="Enter address" value={selectedLead?.address || ""} />
                                    {formErrors.address && <small className="text-danger">{formErrors.address}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select className="form-control" name="state" id="state">
                                        <option value="">Select State</option>
                                        <option value={selectedLead?.state} selected>{selectedLead?.state}</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <select className="form-control" name="city" id="city">
                                        <option value="">Select City</option>
                                        <option value={selectedLead?.city} selected>{selectedLead?.city}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Description</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Description"
                                                        value={item.description}
                                                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Qty"
                                                        value={item.qty}
                                                        onChange={(e) => handleItemChange(index, "qty", Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Price"
                                                        value={item.price}
                                                        onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Total"
                                                        value={item.total}
                                                        readOnly
                                                    />
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-danger" onClick={() => removeItem(index)}>
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="text-end fw-bold">Total Amount:</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="totalAmount"
                                                    value={getTotalAmount()}
                                                    readOnly
                                                />
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <button type="button" className="btn btn-secondary mt-2" onClick={addItem}>
                                    Add Item
                                </button>
                            </div>

                            <div className="mt-4">
                                <label>Project Overview</label>
                                <BundledEditor
                                    id="projectOverview"
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins: ["advlist", "autolink", "link", "lists", "preview", "image", "media"],
                                        toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | image media preview",
                                    }}
                                />
                            </div>

                            <div className="mt-4">
                                <label>Project Details</label>
                                <BundledEditor
                                    id="projectDetails"
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins: ["advlist", "autolink", "link", "lists", "preview", "image", "media"],
                                        toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | image media preview",
                                    }}
                                />
                            </div>

                            <MultiSelectDropdown
                                options={milestones}
                                label="Project Milestone Breakdown"
                                onChange={setSelectedMilestones}
                                totalAmount={getTotalAmount()}
                            />

                            <button type="submit" className="btn btn-primary w-100 mt-4" style={{ fontSize: "1.2rem", padding: "12px" }}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationAdd;
