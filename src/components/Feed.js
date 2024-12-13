import React from 'react';
import { auth } from '../firebase/services';
import '../styles/Feed.css';
import profile from '../assets/profile.png';
import Aarav from '../assets/Aarav.png';
import { useNavigate } from 'react-router-dom';
import video from '../assets/video.mp4';

function Feed() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleShare = () => {
    navigate('/shareposts');
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const posts = [
    {
      id: 1,
      user: {
        id: 'aarav123',
        name: "Aarav",
        avatar: Aarav,
      },
      timestamp: "2 hours ago",
      content: "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽",
      media: [
        { type: 'video', url: video },
      ],
      likes: 67
    },
    {
      id: 2,
      user: {
        id: 'sneha456',
        name: "Sneha",
        avatar: Aarav,
      },
      timestamp: "1 day ago",
      content: "Taking a moment to slow down, breathe, and focus on myself. 🧘‍♀️ Self-care isn't selfish - it's necessary. ❤️",
      media: [
        { type: 'video', url: video }
      ],
      hashtags: ["#SelfCare", "#MeTime", "#Wellness"]
    }
  ];

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div className="user-profile">
          <img src={profile} alt="profile" className="profile-pic" />
          <div className="welcome-text">
            <span>Welcome Back,</span>
            <h2 onClick={() => handleProfileClick(user?.uid)} className="profile-link">
              {user?.displayName?.split(' ')[0]}
            </h2>
          </div>
        </div>
      </div>

      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img 
                src={post.user.avatar} 
                alt={post.user.name} 
                className="user-avatar"
                onClick={() => handleProfileClick(post.user.id)}
              />
              <div className="post-info">
                <h3 
                  className="profile-link"
                  onClick={() => handleProfileClick(post.user.id)}
                >
                  {post.user.name}
                </h3>
                <span className="timestamp">{post.timestamp}</span>
              </div>
            </div>

            <p className="post-content">{post.content}</p>
            
            {post.hashtags && (
              <div className="hashtags">
                {post.hashtags.map((tag, index) => (
                  <span key={index} className="hashtag">{tag}</span>
                ))}
              </div>
            )}

            {post.media && (
              <div className={`media-grid media-count-${post.media.length}`}>
                {post.media.map((media, index) => (
                  <div key={index} className="media-item">
                    {media.type === 'video' ? (
                      <video src={media.url} controls />
                    ) : (
                      <img src={media.url} alt={`Post media ${index + 1}`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="post-actions">
              <button className="like-button">
                <span>❤️</span>
                <span>{post.likes}</span>
              </button>
              <button className="share-button" onClick={handleShare}>
                <span>↗️ Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-post-button" onClick={handleCreatePost}>
        <span>+</span>
      </button>
    </div>
  );
}

export default Feed; 