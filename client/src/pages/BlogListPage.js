import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
        <div className="container">

          <div className="row">
              {posts.map((post) => (
                        <div className="blog-card col-md-6" key={post._id}>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="blog-image">
                                        {/* Link to dynamic blog post page */}
                                        <Link to={`/blog/${post.slug}`}>
                                            {post.thumbnail && <img src={post.thumbnail} alt={post.title || "Image"} />}
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
                                            View More
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