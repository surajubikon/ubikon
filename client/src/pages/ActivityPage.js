import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { motion } from "framer-motion";
import axios from "axios";
import { baseURL } from "../API/api.url";
function ActivityPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabData, setTabData] = useState([]);
  
  const ActivityUbikon = ["Culture", "Work", "Event", "Team"];

  useEffect(() => {
    fetchActivityData(ActivityUbikon[selectedTab]); // Tab change hone par API call karega
  }, [selectedTab]);

  const fetchActivityData = async (subject) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/activity/get-activity/${subject}`);
      setTabData(response.data); // Subject wise images fetch kar raha hai
    } catch (error) {
      console.error("Error fetching data:", error);
      setTabData([]); // Error aane pe empty state
    }
  };
  

  return (
    <div>
      <div className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Life at Ubikon</h2>

          <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
            <TabList className="nav nav-tabs d-flex justify-content-center mb-5">
              {ActivityUbikon.map((tab, index) => (
                <Tab
                  key={index}
                  className={`nav-item nav-link px-3 py-2 border-0 cursor-pointer ${
                    selectedTab === index
                      ? "active border-primary text-primary border-0 border-bottom bg-transparent"
                      : "text-dark"
                  }`}
                >
                  {tab}
                </Tab>
              ))}
            </TabList>

            {ActivityUbikon.map((tab, index) => (
              <TabPanel key={index}>
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="row g-3 px-3"
                >
                  {tabData.length > 0 ? (
                    tabData.map((item) =>
                      item.images.map((images, imageIndex) => (
                        <motion.div key={imageIndex} className="col-6 col-md-3">
                          <img
                            src={`${baseURL}${images}`} // API se fetched image yaha show hogi
                            alt={item.subject}
                            className="img-fluid rounded shadow-sm"
                          />
                        </motion.div>
                      ))
                    )
                  ) : (
                    <p className="text-center">No data available</p>
                  )}
                </motion.div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
