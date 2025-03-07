import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook to get slug from URL
import { baseURL } from "../API/api.url";
function ServiceDetails() {
  const { slug } = useParams(); // Get the slug from URL parameters
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch service details based on slug
    axios
      .get(`http://localhost:8000/api/sub-services/${slug}`)
      .then((response) => {
        setServiceDetails(response.data); // ✅ Use response.data (not response.data[0])
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
        setError("Error fetching service details");
        setLoading(false);
      });
  }, [slug]); // Re-run effect when slug changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!serviceDetails) {
    return <div>Service Not Found</div>;
  }

  return (
    <div>
      <h1>{serviceDetails.title}</h1> {/* Service title */}
      
      {/* Display thumbnail if available */}
      {serviceDetails.thumbnail && (
       <img
       src={`${baseURL}${serviceDetails.thumbnail}`} // ✅ Fix here
       alt={serviceDetails.title}
       style={{ width: "100%", maxWidth: "600px", borderRadius: "8px" }}
     />
     
      )}

      
      <p>{serviceDetails.description}</p> {/* Service description */}

      {/* Display the rich text content safely */}
      <div dangerouslySetInnerHTML={{ __html: serviceDetails.content }} />
    </div>
  );
}

export default ServiceDetails;
