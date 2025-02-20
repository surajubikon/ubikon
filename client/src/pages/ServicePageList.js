import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ServicesPageList = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
    .get(`http://localhost:8000/api/services/slug/${slug}`)
    .then((response) => {
      setService(response.data); // findOne() ek object deta hai
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
      setLoading(false);
    });
  
  }, [slug]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!service) return <h2>No data found!</h2>;

  return (
    <div>
      <h1>Service Details</h1>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
          maxWidth: "600px",
        }}
      >
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        <img
          src={service.thumbnail}
          alt={service.title}
          style={{ width: "100%", borderRadius: "5px" }}
        />
         {/* Dynamic Fields Rendering */}
         {service.dynamicFields && service.dynamicFields.length > 0 && (
          <div>
            <h3>Additional Details</h3>
            {service.dynamicFields.map((field) => (
              <div key={field._id}>
                <h4>{field.heading}</h4>
                <p>{field.value}</p>
              </div>
            ))}
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: service.ckeditor }}></div>

        <small>Published on: {new Date(service.publishedAt).toDateString()}</small>
      </div>
    </div>
  );
};

export default ServicesPageList;
