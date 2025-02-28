import { useState, useEffect } from "react";
import axios from "axios";
import api, { baseURL } from '../../../API/api.url';
import Sidebar from "../components/Sidebar";

const LeadAdd = () => {
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [formErrors, setFormErrors] = useState({});

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
        const source = document.getElementById("source").value;
        const projectName = document.getElementById("projectName").value;

        if (!name) errors.name = "Name is required";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address";
        }
        const phoneRegex = /^\d{10}$/;
        if (!phone) {
            errors.phone = "Phone number is required";
        } else if (!phoneRegex.test(phone)) {
            errors.phone = "Please enter a valid phone number";
        }

        if (!company) errors.company = "Company is required";
        if (!address) errors.address = "Address is required";
        if (!source) errors.source = "Source is required";
        if (!projectName) errors.projectName = "project Name is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                company: document.getElementById("company").value,
                address: document.getElementById("address").value,
                state: document.getElementById("state").value,
                city: document.getElementById("city").value,
                source: document.getElementById("source").value,
                projectName: document.getElementById("projectName").value,
                projectType: document.getElementById("projectType").value,
                projectBudget: document.getElementById("projectBudget").value,
                projectRequirements: document.getElementById("projectRequirements").value

            };

            try {
                const response = await axios.post(`${baseURL}${api.lead.createLead.url}`, formData, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.status === 201 || response.status === 200) {
                    alert("Lead added successfully!");
                    event.target.reset();
                } else {
                    alert("Something went wrong!");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert(error.response?.data?.message || "Error adding lead!");
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
                        <h3 className="text-center mb-4">Add Lead</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Enter name" />
                                    {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Enter email" />
                                    {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Enter phone" maxLength={12} />
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
                                    {formErrors.state && <small className="text-danger">{formErrors.state}</small>}
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
                                    {formErrors.city && <small className="text-danger">{formErrors.city}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="source" className="form-label">Source</label>
                                    <select className="form-control" name="source" id="source" >
                                        <option value="">Select Source</option>
                                        <option value="Website">Website</option>
                                        <option value="Ads">Ads</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Cold Call">Cold Call</option>
                                    </select>
                                    {formErrors.source && <small className="text-danger">{formErrors.source}</small>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="projectName" className="form-label">Project Name</label>
                                    <input type="text" className="form-control" name="projectName" id="projectName" placeholder="Enter Project Name" />
                                    {formErrors.projectName && <small className="text-danger">{formErrors.projectName}</small>}
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                    <label htmlFor="projectType" className="form-label">Project Type</label>
                                    <select className="form-control" name="projectType" id="projectType" >
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
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="projectBudget" className="form-label">Project Budget</label>
                                    <input type="number" className="form-control" name="projectBudget" id="projectBudget" placeholder="Enter Project Budget" />
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="projectRequirements" className="form-label">Project Requirements</label>
                                    <textarea type="text" className="form-control" name="projectRequirements" id="projectRequirements" rows={10} placeholder="Enter your project requirement" />
                                </div>
                            </div>

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

export default LeadAdd;
