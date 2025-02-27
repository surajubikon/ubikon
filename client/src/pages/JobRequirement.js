import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import careerBg from "../assets/img/career-bg.jpg"; // Local image import
import newSectionImage from "../assets/img/new-section.png"; // New section image import
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { PiBagSimpleFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const JobRequirement = () => {
    const location = useLocation();
    const job = location.state?.jobData; // Career Page se jo job data pass hoga use access kar raha hai

    if (!job) return <p className="text-center mt-5">Job data not available</p>;

    return (
        <> 
            <Navbar />

            <div className="product-designer-dt">
                <div>
                    {/* Hero Section */}
                    <div className="d-flex flex-column align-items-center justify-content-center text-white text-center p-5 rounded shadow-lg"
                        style={{
                            backgroundImage: `url(${careerBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "290px",
                        }}
                    >
                        <h1 className="fw-bold mb-2">{job.title}</h1>
                        <p className="lead mb-4">{job.description}</p>
                        <button className="default-btn shadow" style={{ fontSize: "14px", borderRadius: "0" }}>
                            Get Started
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="container">
                        <div className="d-flex justify-content-center mt-5 col-md-8 m-auto">
                            <img src={newSectionImage} alt="New Section" style={{ width: "1110px", height: "400px" }} />
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="container mt-5">
                        <div className="row">
                            {/* Left Side */}
                            <div className="col-md-8">
                            <h1 className="fw-bold mb-4">Who Are We Looking For</h1>
                                <h2 className="fw-bold mb-5">{job.title}</h2>
                                <div className="mt-3 mb-5">
                                    <div dangerouslySetInnerHTML={{ __html: job.content }} />
                                    
                                    <ul className="list-unstyled small">
                                        {job.dynamicFields?.map((field, i) => (
                                            <li key={i} className="mb-2">
                                                <span className="me-3"><GoDotFill /></span> {field.heading}: {field.value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="col-md-4">
                                <div className="card m-0">
                                    <div className="card-body">
                                        <div className="text-center">  
                                            <Link to="/jobapp-form" className="text-decoration-none">
                                                <button className="default-btn mt-4">Apply Now</button>
                                            </Link>
                                        </div>

                                        <div className="mt-5">
                                            <h5 className="fw-bold mb-3">Job Summary</h5>
                                            
                                            {/* Location */}
                                            <div className="row mb-4">
                                                <div className="col-md-2 d-flex align-items-center"><FaMapMarkerAlt size={32} color="gray" /></div>
                                                <div className="col-md-10 ps-0">
                                                    <p className="text-secondary mb-0">Location</p>
                                                    <p className="mb-0 small">{job.location || 'Not specified'}</p>
                                                </div>
                                            </div>

                                            {/* Job Type */}
                                            <div className="row mb-4">
                                                <div className="col-md-2 d-flex align-items-center"><PiBagSimpleFill size={32} color="gray" /></div>
                                                <div className="col-md-10 ps-0">
                                                    <p className="text-secondary mb-0">Job Type</p>
                                                    <p className="mb-0 small">{job.jobType || 'Not specified'}</p>
                                                </div>
                                            </div>

                                            {/* Date Posted */}
                                            <div className="row mb-4">
                                                <div className="col-md-2 d-flex align-items-center"><MdDateRange size={32} color="gray" /></div>
                                                <div className="col-md-10 ps-0">
                                                    <p className="text-secondary mb-0">Date posted</p>
                                                    <p className="mb-0 small">{new Date(job.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>

                                            {/* Experience */}
                                            <div className="row mb-4">
                                                <div className="col-md-2 d-flex align-items-center"><FaClock size={32} color="gray" /></div>
                                                <div className="col-md-10 ps-0">
                                                    <p className="text-secondary mb-0">Experience</p>
                                                    <p className="mb-0 small">{job.experience || 'Not specified'}</p>
                                                </div>
                                            </div>

                                            <Link to="/careerdetails" className="fw-bold border-bottom text-dark">View all jobs</Link>
                                        </div>  
                                    </div>  
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />      
        </>
    );
};

export default JobRequirement;
