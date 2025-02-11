import React, { useEffect, useState } from "react";
import axios from "axios";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories/all"); // ✅ API endpoint yahan check karein
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
                <h3>{post.title}</h3>
                <p><strong>Author:</strong> {post.author}</p>
                <p><strong>Slug:</strong> {post.slug}</p>
                <p><strong>Description:</strong> {post.description}</p>
                <p><strong>Content:</strong> {post.content}</p>
                <p><strong>Headings:</strong> {post.headings?.join(", ") || "N/A"}</p>
                <p><strong>Tags:</strong> {post.tags?.join(", ") || "N/A"}</p>
                <p><strong>Categories:</strong> {post.categories?.join(", ") || "N/A"}</p>
                <p><strong>SEO Title:</strong> {post.seoTitle || "N/A"}</p>
                <p><strong>SEO Meta Description:</strong> {post.seoMetaDescription || "N/A"}</p>
                <p><strong>SEO Keywords:</strong> {post.seoKeywords?.join(", ") || "N/A"}</p>
                
                {post.thumbnail && <img src={post.thumbnail} alt="Thumbnail" width="100" />}
                {post.coverImage && <img src={post.coverImage} alt="Cover" width="200" />}

                <p><strong>Status:</strong> {post.status}</p>
                <p><strong>Published At:</strong> {post.publishedAt ? new Date(post.publishedAt).toLocaleString() : "Not Published"}</p>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogPage;
