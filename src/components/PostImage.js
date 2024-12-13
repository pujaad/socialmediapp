import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PostImage.css';

function PostImage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
  }, []);

  return (
    <div className="post-image">
      <div className="post-image-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1>Preview</h1>
      </div>

      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {post.media.length > 0 && (
              <div className="media-container">
                {post.media.map((media, index) => (
                  <div key={index} className="media-item">
                    {media.type === 'image' ? (
                      <img src={media.url} alt={`Post ${index + 1}`} />
                    ) : (
                      <video src={media.url} controls />
                    )}
                    {post.media.length > 1 && (
                      <span className="media-count">
                        {index + 1}/{post.media.length}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="post-content">
              <p>{post.content}</p>
              <div className="hashtags">
                {post.hashtags.map((tag, index) => (
                  <span key={index} className="hashtag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostImage;