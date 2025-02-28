import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function JobApplication() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/jobApplicationForm/get")
            .then((response) => {
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setApplications(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        axios
            .put(`http://localhost:8000/api/jobApplicationForm/${id}`, { status: newStatus })
            .then(() => {
                setApplications((prevApps) =>
                    prevApps.map((app) =>
                        app._id === id ? { ...app, status: newStatus } : app
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            axios
                .delete(`http://localhost:8000/api/jobApplicationForm/${id}`)
                .then(() => {
                    setApplications((prevApps) => prevApps.filter((app) => app._id !== id));
                })
                .catch((error) => {
                    console.error("Error deleting application:", error);
                });
        }
    };

    const getRowClass = (status) => {
        switch (status) {
            case "Rejected":
                return "table-danger";
            case "Selected":
                return "table-success";
            case "Pending":
                return "table-warning";
            default:
                return "";
        }
    };

    return (
        
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden", padding: "20px" }}>
            <h2 className="text-center mb-4">Job Applications</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div style={{ overflowX: "auto", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
                    <Table striped bordered hover>
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Current CTC</th>
                                <th>Expected CTC</th>
                                <th>Notice Period</th>
                                <th>Portfolio</th>
                                <th>Resume</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={app._id} className={getRowClass(app.status)}>
                                    <td>{index + 1}</td>
                                    <td>{app.first}</td>
                                    <td>{app.last}</td>
                                    <td>{app.email}</td>
                                    <td>{app.phone}</td>
                                    <td>₹{app.currentCTC}</td>
                                    <td>₹{app.expectedCTC}</td>
                                    <td>{app.noticePeriod} days</td>
                                    <td>
                                        <a href={app.portfoliolink} target="_blank" rel="noopener noreferrer">
                                            Portfolio
                                        </a>
                                    </td>
                                    <td>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 text-success text-decoration-none"
                                            onClick={() => window.open(app.resume, "_blank").focus()}
                                        >
                                            Download
                                        </Button>
                                    </td>
                                    <td>
                                        <Form.Select
                                            value={app.status}
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                            size="sm"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Selected">Selected</option>
                                            <option value="Rejected">Rejected</option>
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(app._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default JobApplication;
