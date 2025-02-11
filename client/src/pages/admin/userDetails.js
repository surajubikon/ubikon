import React, { useEffect, useState } from "react";
import axios from "axios";
import './userDetails.css';
import api, {baseURL} from "../../API/api.url";
function UserDetails() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5); // Number of contacts per page

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${baseURL}${api.contact.getContacts.url}`);
        const contactsWithFlags = response.data.map(contact => ({
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

  // Get current contacts
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-details-container">
      <h2>User Contact Details</h2>
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((contact) => (
                <tr key={contact._id} className={contact.isNew ? 'new-contact' : ''}>
                  <td>{contact.yourName}</td>
                  <td>{contact.companyName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contactNumber}</td>
                  <td>{contact.textMessage}</td>
                  <td>
                    {contact.isNew && !contact.isRead ? (
                      <button onClick={() => markAsRead(contact._id)}>Mark as Read</button>
                    ) : (
                      <span>Read</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;