import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Button, Form, InputGroup, FormControl, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../../API/api.url";
function JobApplication() {
    const applicationsPerPage = 10;
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [remark, setRemark] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/jobApplicationForm/get");
            if (Array.isArray(response.data)) {
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setApplications(sortedData);
                setFilteredApplications(sortedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch applications!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = applications;
        if (filterStatus !== "All") {
            filtered = filtered.filter(app => app.status === filterStatus);
        }
        if (searchQuery) {
            filtered = filtered.filter(app =>
                app.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.first?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.last?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.email?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredApplications(filtered);
        setCurrentPage(0);
    }, [filterStatus, searchQuery, applications]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleOpenRemarkModal = (application) => {
        setSelectedApplication(application);
        setRemark(application.remark || "");
        setShowModal(true);
    };

    const handleAddRemark = async () => {
        console.log("Submitting Remark:", remark); // Debugging ke liye
        if (!remark.trim()) {
            toast.error("Remark cannot be empty!");
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:8000/api/jobApplicationForm/update-remark/${selectedApplication._id}`,
                { remark }
            );

            console.log("Response:", response.data); // API response check karo

            setApplications(prev =>
                prev.map(app => (app._id === selectedApplication._id ? { ...app, remark } : app))
            );

            toast.success("Remark added successfully!");
            setShowModal(false);
        } catch (error) {
            console.error("Error updating remark:", error);
            toast.error("Failed to update remark!");
        }
    };


    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:8000/api/jobApplicationForm/update/${id}`, { status: newStatus });
            setApplications(prevApps => prevApps.map(app => app._id === id ? { ...app, status: newStatus } : app));
            toast.success("Status updated successfully!");
        } catch {
            toast.error("Failed to update status!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/jobApplicationForm/${id}`);
            setApplications(prevApps => prevApps.filter(app => app._id !== id));
            toast.success("Application deleted!");
        } catch {
            toast.error("Failed to delete application!");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "#ffc107";
            case "In Progress": return "#17a2b8";
            case "Selected": return "#28a745";
            case "Rejected": return "#dc3545";
            default: return "#ffffff";
        }
    };

     const displayedApplications = filteredApplications.slice(
        currentPage * applicationsPerPage,
        (currentPage + 1) * applicationsPerPage
    );

    return (
        <div className="container py-3">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-center mb-4">Job Applications</h2>
            <div className="d-flex justify-content-between mb-3">
                <InputGroup style={{ width: "300px" }}>
                    <FormControl placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </InputGroup>
                <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ width: "200px" }}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                </Form.Select>
            </div>
            {loading ? <Spinner animation="border" className="d-block mx-auto" /> :
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr><th>#</th><th>D&T</th>
                        <th>Position</th><th>Name</th><th>phone</th><th>experience</th><th>currentCTC</th><th>expectedCTC</th><th>Notic Period</th><th>Status</th><th>Actions</th><th>Resume</th><th>Portfolio</th></tr>
                    </thead>
                    <tbody>
                        {displayedApplications.map((app, index) => (
                             <tr key={app._id} style={{ backgroundColor: getStatusColor(app.status) }}>
                                <td>{currentPage * applicationsPerPage + index + 1}</td>
                                <th>{new Date(app.createdAt).toLocaleString()}</th>

                                <td>{app.position || "N/A"}</td>
                                <td>{app.first} {app.last}</td>
                                {/* <td>{app.email}</td> */}
                                <td>{app.phone}</td>
                                <td>{app.experience}</td>
                                <td>{app.currentCTC}</td>
                                <td>{app.expectedCTC}</td>
                                <td>{app.noticePeriod}</td>

                                <td>
                                    <Form.Select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)}>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Selected">Selected</option>
                                        <option value="Rejected">Rejected</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => handleOpenRemarkModal(app)}>Remark</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(app._id)}>Delete</Button>
                                </td>
                                <td>
                                    {app.resume ? (
                                        <>
                                            {/* PDF ko New Tab me Open Karne ke liye */}
                                            <a href={`${baseURL}${app.resume}`} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                            {' | '}
                                            {/* PDF ko Direct Download Karne ke liye */}
                                            <a href={`${baseURL}${app.resume}`} download>
                                                Download
                                            </a>
                                        </>
                                    ) : (
                                        "No Resume"
                                    )}
                                </td>


                                <td>
                                    <a href={app.portfoliolink} target="_blank" rel="noopener noreferrer">
                                        View Portfolio
                                    </a>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
<ReactPaginate
    previousLabel={"← Prev"}
    nextLabel={"Next →"}
    breakLabel={"..."}
    pageCount={Math.max(1, Math.ceil(filteredApplications.length / applicationsPerPage))}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={handlePageClick}
    containerClassName={"pagination justify-content-center mt-3"}
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    breakClassName={"page-item"}
    breakLinkClassName={"page-link"}
    activeClassName={"active"}
    disabledClassName={"disabled"}
/>


            {/* Modal for Adding Remarks */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">

                <Modal.Header closeButton>
                    <Modal.Title>Add Remark</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Remark</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddRemark}>Save Remark</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default JobApplication;
