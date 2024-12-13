import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/services';
import '../styles/Editprofile.css';
import cover from '../assets/cover.png';
import photo from '../assets/photo.png';

function Editprofile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Load saved data when component mounts
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    setName(savedProfile.name || "Puja");
    setBio(savedProfile.bio || "Just someone who loves designing, sketching, and finding beauty in the little things💝");
  }, []);

  const handleSave = () => {
    // Save to localStorage
    const profileData = {
      name,
      bio,
      photo: photo, // Save photo path
      cover: cover  // Save cover path
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    navigate(-1);
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate(-1)}>←</button>
          <h1>Edit Profile</h1>
        </div>
        <button className="edit-button">
          <span>✎</span>
        </button>
      </div>

      <div className="profile-images">
        <div className="cover-image-container">
          <img src={cover} alt="Cover" className="cover-image" />
          <button className="edit-cover">
            <span>✎</span>
          </button>
        </div>
        <div className="profile-photo-container">
          <img src={photo} alt="Profile" className="profile-photo" />
          <button className="edit-photo">
            <span>✎</span>
          </button>
        </div>
      </div>

      <div className="edit-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself"
          />
        </div>

        <button className="save-button" onClick={handleSave}>
          SAVE
        </button>
      </div>
    </div>
  );
}

export default Editprofile;
