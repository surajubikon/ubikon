import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { baseURL } from "../API/api.url";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/sub-services/${slug}`)
      .then((response) => {
        setServiceDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
        setError("Error fetching service details");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!serviceDetails) {
    return <div className="text-center text-gray-600 mt-10">Service Not Found</div>;
  }

  return (
    <>
      <Navbar />
     
      <div className="relative w-full h-[400px] bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-center px-6">
        <div>
          <h1 className="text-4xl font-bold drop-shadow-lg">{serviceDetails.title}</h1>
          <p className="text-lg mt-3 max-w-2xl mx-auto">{serviceDetails.description}</p>
        </div>
      </div>

     
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
         
          {serviceDetails.thumbnail && (
            <div>
              <img
                src={`${baseURL}${serviceDetails.thumbnail}`}
                alt={serviceDetails.title}
                className="rounded-xl shadow-lg w-full max-w-lg mx-auto"
              />
            </div>
          )}

         
          <div>
            <h2 className="text-3xl font-semibold mb-4">About This Service</h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: serviceDetails.content }}
            />
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Get This Service
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;