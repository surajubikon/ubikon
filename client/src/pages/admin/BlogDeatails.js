import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function BlogDetails() {
    const { slug } = useParams();  // Get the slug from the URL
    const [blog, setBlog] = useState(null);
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch blog details by slug
    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/blogpost/${slug}`);
                // Log the response
                setBlog(response.data[0]);  // Set the blog data in state
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setError("Error fetching the blog details");
                setLoading(false);
            }
        };

        fetchBlogDetails();
    }, [slug]);  // Dependency on the slug to refetch on URL change

    // Fetch all blog posts (for showing the list of posts or related blogs)


    return (
        <>
            <Navbar />
            <div className="blog-details">
                {blog ? (
                    <>
                        <div className='blog-banner position-relative'>
                            <div className='text-center blog-banner-title'>
                                <h2>Blog</h2>
                                <p>Stay Updated with the Latest Tech Insights</p>
                            </div>
                            {blog.coverImage && <img className='w-100 blogcoverimage' src={blog.coverImage} alt={blog.title} />}
                        </div>
                        <div className='blog-details-content'>
                            <div className='container'>
                                <div className='col-md-8 m-auto'>
                                    <h1>{blog.title}</h1>
                                    <p className='blog-published-dt'><strong>Published on:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
                                    {blog.thumbnail && (
                                        <img
                                            src={blog.thumbnail}
                                            alt={blog.title}
                                            className='w-100'
                                        />
                                    )}
                                    <div className='blog-content'>
                                        <p>{blog.description}</p>
                                        <div className="" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Blog not found</p>
                )}

            </div>
            <Footer />
        </>
    );
}

export default BlogDetails;
