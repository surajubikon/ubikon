import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api, { baseURL } from '../../../API/api.url';
import Sidebar from "../components/Sidebar";
import BundledEditor from "../../admin/bundled";
import MultiSelectDropdown from "../../admin/components/MultiSelectDropdown";

const Quotation = () => {
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [quotationNo, setQuotationNo] = useState("");
    const [items, setItems] = useState([{ description: "", qty: 1, price: "", total: 0 }]);
    const projectMilestones = [
        { value: "advanced payment", label: "Advanced payment ........... 30%" },
        { value: "design & prototypes", label: "Design & Prototypes ........... 25%" },
        { value: "development", label: "Development ........... 25%" },
        { value: "final delivery", label: "Final Delivery ........... 15%" },
    ];
    const [selectedMilestones, setSelectedMilestones] = useState([]);

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
        const fetchStateData = async () => {
            try {
                const stateResponse = await axios.get(`${baseURL}${api.lead.getStates.url}`);
                setStateData(stateResponse.data.data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };
        fetchStateData();
    }, []);

    const handleStateChange = async (event) => {
        const selectedStateName = event.target.value;
        setSelectedState(selectedStateName);
        setCityData([]);

        if (!selectedStateName) {
            return;
        }
        try {
            const cityResponse = await axios.get(`${baseURL}/api/leads/cities/${selectedStateName}/IN`);
            setCityData(cityResponse.data.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const validateForm = () => {
        const errors = {};
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const company = document.getElementById("company").value;
        const address = document.getElementById("address").value;

        if (!name) errors.name = "Name is required";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address";
        }
        const phoneRegex = /^\d{10}$/;
        if (!phone) {
            errors.phone = "Phone is required";
        } else if (!phoneRegex.test(phone)) {
            errors.phone = "Please enter a valid phone";
        }

        if (!company) errors.company = "Company is required";
        if (!address) errors.address = "Address is required";

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
            formData.append("milestone", JSON.stringify(selectedMilestones.map((opt) => opt.value)));
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
                    fetchData()
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

    return (
        <div className="admin d-flex">
            <Sidebar />
            <div className="main-content container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", flex: "1" }}>
                <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "1000px", borderRadius: "15px", backgroundColor: "#f8f9fa" }}>
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
                                    <input type="date" className="form-control" name="quotationDate" id="quotationDate" />
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
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Enter Name" />
                                    {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Enter email" />
                                    {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Enter phone" />
                                    {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                    <label htmlFor="company" className="form-label">Company</label>
                                    <input type="text" className="form-control" name="company" id="company" placeholder="Enter company" />
                                    {formErrors.company && <small className="text-danger">{formErrors.company}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" id="address" placeholder="Enter address" />
                                    {formErrors.address && <small className="text-danger">{formErrors.address}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select className="form-control" name="state" id="state" onChange={handleStateChange}>
                                        <option value="">Select State</option>
                                        {stateData.map((state, index) => (
                                            <option key={index} value={state.isoCode}>{state.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <select className="form-control" name="city" id="city" disabled={!selectedState}>
                                        <option value="">Select City</option>
                                        {cityData.map((city, index) => (
                                            <option key={index} value={city.name}>{city.name}</option>
                                        ))}
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
                                options={projectMilestones}
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

export default Quotation;
