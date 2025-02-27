import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function JobApplication() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://ubikon.in/api/jobApplicationForm/get")
            .then((response) => {
                // Sort by latest createdAt (descending order)
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
            .put(`https://ubikon.in/api/jobApplicationForm/update/${id}`, { status: newStatus })
            .then((response) => {
                setApplications((prevApps) =>
                    prevApps.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
                );
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Job Applications</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover responsive>
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
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
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
                                    <td>
                                        {/* <Button
                                            variant="link"
                                            size="sm"
                                            className="me-2 p-0 text-primary text-decoration-none"
                                            href={app.resume}
                                            target="_blank"
                                        >
                                            Open
                                        </Button> */}
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 text-success text-decoration-none"
                                            onClick={() => window.open(app.resume, "_blank").focus()}  >
                                            Download
                                        </Button>
                                    </td>

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
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default JobApplication;
