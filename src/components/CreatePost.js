import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css';

function CreatePost() {
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles(prev => [...prev, file]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content && selectedFiles.length === 0) return;

    // Convert files to URLs
    const mediaUrls = selectedFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));

    // Create new post object
    const newPost = {
      id: Date.now(),
      content,
      media: mediaUrls,
      timestamp: new Date().toISOString(),
      hashtags: content.match(/#[a-zA-Z0-9]+/g) || []
    };

    // Get existing posts or initialize empty array
    const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    
    // Add new post to beginning of array
    const updatedPosts = [newPost, ...existingPosts];
    
    // Save to localStorage
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    // Reset form and navigate to PostImage
    setContent('');
    setSelectedFiles([]);
    navigate('/postimage');
  };

  return (
    <div className="create-post">
      <div className="create-post-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1 className="new-post">New Post</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        
        {selectedFiles.length > 0 && (
          <div className="selected-files-preview">
            {selectedFiles.map((file, index) => (
              <div key={index} className="preview-item">
                {file.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                ) : (
                  <video src={URL.createObjectURL(file)} controls />
                )}
                <button
                  type="button"
                  onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="post-actions">
          <div className="media-buttons">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              ref={videoInputRef}
              style={{ display: 'none' }}
            />
            
            <button 
              type="button" 
              className="media-button"
              onClick={() => fileInputRef.current.click()}
            >
              📷 Photos
            </button>
            <button 
              type="button"
              className="media-button"
              onClick={() => videoInputRef.current.click()}
            >
              🎥 Video
            </button>
          </div>
          
          <button
            type="submit" 
            className="create-button"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost; 