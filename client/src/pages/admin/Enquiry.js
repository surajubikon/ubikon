import React, { useEffect, useState } from "react";
import axios from "axios";
import './Enquiry.css';
import api, { baseURL } from "../../API/api.url";
import Sidebar from "../../pages/admin/components/Sidebar";
function Enquiry() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5); // Number of contacts per page
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${baseURL}${api.contact.getContacts.url}`);
        
        // Sort the contacts by `createdAt` in descending order (latest first)
        const sortedContacts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
        // Add flags to contacts
        const contactsWithFlags = sortedContacts.map(contact => ({
          ...contact,
          isNew: true, // Mark all fetched contacts as new initially
          isRead: false // Mark all fetched contacts as unread initially
        }));
  
        setContacts(contactsWithFlags);
      } catch (err) {
        setError("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };
  
    fetchContacts();
  }, []);
  
  const markAsRead = (id) => {
    setContacts(contacts.map(contact =>
      contact._id === id ? { ...contact, isRead: true, isNew: false } : contact
    ));
  };

  const openModal = (message) => {
    setModalContent(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Get current contacts
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncateMessage = (message) => {
    const words = message.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return message;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin">
      <div className="app">
      <Sidebar />
      <div className="main-content">
      <div className="user-details">
    <div className="container mt-5">
      <h2>Enquiry List</h2>
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((contact) => (
                <tr key={contact._id} className={contact.isNew ? 'table-info' : ''}>
                  <td>{contact.yourName}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contactNumber}</td>
                  <td className="message">
                    {truncateMessage(contact.textMessage)}
                    {contact.textMessage.split(' ').length > 20 && (
                      <button className="btn btn-link p-0" onClick={() => openModal(contact.textMessage)}>
                        See more
                      </button>
                    )}
                  </td>
                  <td className="status">
                    {contact.isNew && !contact.isRead ? (
                      <button className="btn btn-warning" onClick={() => markAsRead(contact._id)}>
                        Mark as Read
                      </button>
                    ) : (
                      <span className="text-success">Read</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, i) => (
              <button key={i + 1} className="btn btn-outline-primary m-1" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
                <h5 className="modal-title">Full Message</h5>
              </div>
              <div className="modal-body">
                <p>{modalContent}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Enquiry;
  
