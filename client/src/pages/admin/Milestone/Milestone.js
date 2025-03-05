import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table, Form } from "react-bootstrap";
import api, { baseURL } from '../../../API/api.url';
import { toast } from "react-toastify";

const Milestone = () => {
  const [milestones, setMilestones] = useState([]); // Milestone list
  const [formData, setFormData] = useState({ name: "", percentage: "" }); // Form data
  const [editingMilestone, setEditingMilestone] = useState(null); // Edit mode check
  const [show, setShow] = useState(false); // Modal open/close

  // ✅ Backend se milestones fetch karna
  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      const response = await axios.get(api.milestone.milestoneGet.url);
      setMilestones(response.data);
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  // ✅ Form input handle karna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Milestone Add ya Edit karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMilestone) {
        await axios.put(api.milestone.milestoneUpdate.url(editingMilestone._id), formData);
        toast.success("Milestone updated successfully!");
      } else {
        await axios.post(api.milestone.milestoneCreate.url, formData);
        toast.success("Milestone added successfully!");
      }
      setFormData({ name: "", percentage: "" });
      setEditingMilestone(null);
      setShow(false);
      fetchMilestones();
    } catch (error) {
      console.error("Error saving milestone:", error);
      toast.error("Failed to save milestone. Please try again.");
    }
  };


  // ✅ Milestone delete karna
  const handleDelete = async (id) => {
    try {
      await axios.delete(api.milestone.milestoneDelete.url(id))
      toast.success("Milestone deleted successfully!");
      fetchMilestones();
    } catch (error) {
      console.error("Error deleting milestone:", error);
  toast.error("Error deleting data: " + (error.response?.data?.message || "Something went wrong!"));
     
    }
  };

  // ✅ Milestone edit karna
  const handleEdit = (milestone) => {
    setFormData({ name: milestone.name, percentage: milestone.percentage });

    setEditingMilestone(milestone);
    setShow(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Milestone Management</h2>
      <Button variant="primary" onClick={() => setShow(true)}>+ Add Milestone</Button>

      {/* 🚀 Modal Form for Add/Edit */}
      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>{editingMilestone ? "Edit Milestone" : "Add Milestone"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Milestone Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter milestone name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control
                type="number"
                name="percentage"
                placeholder="Enter percentage"
                value={formData.percentage}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              {editingMilestone ? "Update" : "Add"} Milestone
            </Button>
            <Button variant="secondary" onClick={() => setShow(false)} className="ms-2">Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* 🚀 Milestone Table */}
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((milestone, index) => (
            <tr key={milestone._id}>
              <td>{index + 1}</td>
              <td>{milestone.name}</td>
              <td>{milestone.percentage}%</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(milestone)}>Edit</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(milestone._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Milestone;
