import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
                const response = await axios.get(`https://ubikon.in/api/blogpost/${slug}`);
                console.log("API Response:", response.data);  // Log the response
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
        <div className="blog-details">
            {blog ? (
                <>
                    <h1>{blog.title}</h1>
                    {blog.coverImage && <img src={blog.coverImage} alt={blog.title} />}
                    {blog.thumbnail && (
                        <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            style={{ width: '100%', maxWidth: '500px', height: 'auto' }} // Adjust the width, maxWidth, and height
                        />
                    )}

                    <p>{blog.description}</p>
                    <p><strong>Published on:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.ckeditor }}></div>
                </>
            ) : (
                <p>Blog not found</p>
            )}

        </div>
    );
}

export default BlogDetails;
