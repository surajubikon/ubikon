import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import blogBG from '../assets/img/service-img.webp'
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { baseURL } from '../API/api.url';

function BlogListPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/blogpost/all");
             
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error.response?.data || error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
      <>
   <Navbar/>
   <div className="blog-banner position-relative mb-5">
    <div className="text-center blog-banner-title">
        <h2>Blog</h2><p>Stay Updated with the Latest Tech Insights</p>
    </div>
        <img className="w-100 blogcoverimage" src={blogBG} alt="Creating a Realistic Budget for Your Startup: Best Practices" />
    </div>
        <div className="container">

          <div className="row">
              {posts.map((post) => (
                        <div className="blog-card col-md-6" key={post._id}>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="blog-image">
                                        {/* Link to dynamic blog post page */}
                                        <Link to={`/blog/${post.slug}`}>
                                            {post.thumbnail && <img src={`${baseURL}${post.thumbnail}`} alt={post.title || "Image"} />}
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="blog-content">
                                        <h3>
                                            <a href={`/blog/${post.slug}`}>{post.title || "No Title"}</a>
                                        </h3>
                                        <p>
                                            {post.description
                                                ? post.description.split(" ").length > 15
                                                    ? post.description.split(" ").slice(0, 15).join(" ") + "..."
                                                    : post.description
                                                : "No Description"}
                                        </p>

                                        <p><strong>Published on:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                                        <a href={`/blog/${post.slug}`} className="blog-btn">
                                            View More <motion.div className="d-inline-block ms-2" initial={{ x: -5, opacity: 1 }} animate={{ x: 5, opacity: 1 }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}>
                                                        <FaArrowRight size={18} />
      
                                                      </motion.div>
                                        </a>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    ))}
              </div>
        </div>
    <Footer/>
           </>
    );
};

export default BlogListPage