import React from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/services';
import '../styles/Profile.css';
import cover from '../assets/cover.png';
import photo from '../assets/photo.png';
import Group9 from '../assets/Group9.png';
import Group10 from '../assets/Group10.png';
import Group11 from '../assets/Group11.png';

function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const posts = [
    {
      id: 1,
      title: "Design meet",
      image: Group9,
      likes: 67,
      slideCount: "1/2"
    },
    {
      id: 2,
      title: "Working on a B2B..",
      image: Group10,
      likes: 40
    },
    {
      id: 3,
      title: "Parachute ❤️",
      image: Group11,
      likes: 65
    }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <img src={cover} alt="cover" className="cover-image" />
        <div className="profile-main">
          <img 
            src={photo} 
            alt="profile" 
            className="profile-photo" 
          />
          <button onClick={()=>navigate("/editprofile")}className="edit-profile-button">Edit Profile</button>
        </div>
      </div>

      <div className="profile-content">
        <h1 className="profile-name">{user?.displayName || "Puja"}</h1>
        <p className="profile-bio">
          Just someone who loves designing, sketching, and finding beauty in the little things💝
        </p>

        <div className="profile-posts">
          <h2>My Posts</h2>
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-image-container">
                  <img src={post.image} alt={post.title} />
                  {post.slideCount && (
                    <span className="slide-count">{post.slideCount}</span>
                  )}
                  <div className="post-likes">
                    ❤️ {post.likes}
                  </div>
                </div>
                <h3 className="post-title">{post.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;