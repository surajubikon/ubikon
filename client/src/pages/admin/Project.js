// import { useState, useEffect } from "react";
// import axios from "axios";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Link } from "react-router-dom";

// const Project = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/api/blogpost/all");
//                 console.log("API", response.data);
//                 setPosts(response.data);
//             } catch (error) {
//                 console.error("Error fetching posts:", error.response?.data || error.message);
//             }
//         };
      
//         fetchPosts();
//     }, []);

//     const settings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 2,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };

//     return (
//         <div className="container">
//             {Array.isArray(posts) && posts.length > 0 ? (
//                 <Slider {...settings}>
//                     {posts.map((post) => (
//                         <div className="blog-card" key={post._id}>
//                             <div className="row align-items-center">
//                                 <div className="col-lg-6">
//                                     <div className="blog-image">
//                                         <Link to="/blog">
//                                             {post.image && <img src={post.image} alt={post.title || "Image"} />}
//                                         </Link>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-6">
//                                     <div className="blog-content">
//                                         <h3>
//                                             <a href="/koze/single-blog-1">{post.title || "No Title"}</a>
//                                         </h3>
//                                         <p>{post.description || "No Description"}</p>
//                                         <a href="/blog" className="blog-btn">
//                                             View More
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             ) : (
//                 <p>No posts found</p>
//             )}
//         </div>
//     );
// };

// export default Project;
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Project = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/blogpost/all");
                console.log("API", response.data);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error.response?.data || error.message);
            }
        };

        fetchPosts();
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1024,   // Large screens (below 1024px)
              settings: {
                slidesToShow: 2, 
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,   // Tablets (below 768px)
              settings: {
                slidesToShow: 1, 
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,   // Mobile devices (below 480px)
              settings: {
                slidesToShow: 1, 
                slidesToScroll: 1,
                dots: true,  // Keep dots for better UX
              },
            },
          ],
        };

    return (
        <div className="container">
            {Array.isArray(posts) && posts.length > 0 ? (
                <Slider {...settings}>
                    {posts.map((post) => (
                        <div className="blog-card" key={post._id}>
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
                                        <p>{post.description || "No Description"}</p>
                                        <p><strong>Published on:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                                        <a href={`/blog/${post.slug}`} className="blog-btn">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>No posts found</p>
            )}
        </div>
    );
};

export default Project;
