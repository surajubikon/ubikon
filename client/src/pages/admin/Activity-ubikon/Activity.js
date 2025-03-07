import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import api, { baseURL } from '../../../API/api.url';

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const ActivityUbikon = ["Culture", "Work", "Event", "Team"];

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${baseURL}${api.activity.getAllActivities.url}`);
      setActivities(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);

    const formData = new FormData();
    formData.append("subject", subject);

    if (image) {
      formData.append("image", image); // Naya image selected hai
    }

    try {
      if (editId) {
        const url = `${baseURL}${api.activity.updateActivity.url.replace(':id', editId)}`;

        await axios.put(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Activity updated successfully!");
      } else {
        await axios.post(`${baseURL}${api.activity.createActivity.url}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Activity added successfully!");
      }

      fetchActivities();
      setShow(false);
      setSubject("");
      setImage(null);
      setPreview(null);
      setEditId(null);
    } catch (error) {
      toast.error("Error uploading data: " + (error.response?.data?.message || "Something went wrong!"));
    } finally {
      setButtonLoading(false);
    }
  };

  const handleEdit = (activity) => {
    setSubject(activity.subject);
    setEditId(activity._id);
    setPreview(activity.images?.[0] ? `${baseURL}${activity.images[0]}` : null);
    setShow(true);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}${api.activity.deleteActivity.url.replace(':id', id)}`);
      toast.success("Activity deleted successfully!");
      fetchActivities();
    } catch (error) {
      toast.error("Error deleting data: " + (error.response?.data?.message || "Something went wrong!"));
    }
  };

  return (
    <div className="container mt-4">
      <Button variant="primary" onClick={() => setShow(true)}>
        Add Activity
      </Button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit" : "Add"} Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Select Subject</Form.Label>
              <Form.Select value={subject} onChange={(e) => setSubject(e.target.value)} required>
                <option value="">Choose...</option>
                {ActivityUbikon.map((act, index) => (
                  <option key={index} value={act}>{act}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(file ? URL.createObjectURL(file) : preview); // Naya image hai toh update karo, nahi toh wahi rehne do
                }}
              />
              {preview && <img src={preview} alt="Preview" className="mt-2" width="100" height="100" />}
            </Form.Group>



            <Button className="mt-3 w-100" variant="success" type="submit" disabled={buttonLoading}>
              {buttonLoading ? <Spinner as="span" animation="border" size="sm" /> : editId ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{activity.subject}</td>
                <td>
                  <img src={`${baseURL}${activity.images?.[0]}`} alt="Activity" width="50" height="50" />

                </td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(activity)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(activity._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Activity;
