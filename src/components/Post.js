import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/Post.css';

function Post({ post }) {
  const { user, content, media, timestamp, likes } = post;

  return (
    <div className="post">
      <div className="post-header">
        <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
        <div className="post-info">
          <h3>{user.displayName}</h3>
          <span className="timestamp">
            {formatDistanceToNow(timestamp.toDate(), { addSuffix: true })}
          </span>
        </div>
      </div>

      <p className="post-content">{content}</p>

      {media && media.length > 0 && (
        <div className={`media-grid media-count-${media.length}`}>
          {media.map((url, index) => (
            <div key={index} className="media-item">
              {url.includes('video') ? (
                <video src={url} controls />
              ) : (
                <img src={url} alt={`Post media ${index + 1}`} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="post-actions">
        <button className="like-button">
          <span className="like-icon">❤️</span>
          <span>{likes?.length || 0}</span>
        </button>
        <button className="share-button">
          Share
        </button>
      </div>
    </div>
  );
}

export default Post; 