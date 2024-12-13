import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Shareposts.css';

function Shareposts() {
  const navigate = useNavigate();
  const currentUrl = window.location.href;

  const socialPlatforms = [
    { name: 'Twitter', icon: '🐦', color: '#1DA1F2', bgColor: '#E8F5FD' },
    { name: 'Facebook', icon: '📘', color: '#1877F2', bgColor: '#E7F0FF' },
    { name: 'Reddit', icon: '🔴', color: '#FF4500', bgColor: '#FFF1EC' },
    { name: 'Discord', icon: '💬', color: '#5865F2', bgColor: '#EEF0FF' },
    { name: 'WhatsApp', icon: '💚', color: '#25D366', bgColor: '#E7F7ED' },
    { name: 'Messenger', icon: '💙', color: '#0084FF', bgColor: '#E5F1FF' },
    { name: 'Telegram', icon: '📬', color: '#0088CC', bgColor: '#E5F6FF' },
    { name: 'Instagram', icon: '📸', color: '#E4405F', bgColor: '#FFEEF2' }
  ];

  const handleShare = (platform) => {
    let shareUrl;

    switch (platform) {
      case 'Twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'Reddit':
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'WhatsApp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
        break;
      case 'Telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        shareUrl = currentUrl;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="share-modal-overlay">
      <div className="share-modal">
        <div className="share-modal-header">
          <h2>Share post</h2>
          <button className="close-button" onClick={() => navigate(-1)}>×</button>
        </div>

        <div className="social-grid">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              className="social-button"
              onClick={() => handleShare(platform.name)}
              style={{
                '--platform-color': platform.color,
                '--platform-bg-color': platform.bgColor
              }}
            >
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
            </button>
          ))}
        </div>

        <div className="page-link-section">
          <h3>Page Link</h3>
          <div className="link-copy-container">
            <input
              type="text"
              value={currentUrl}
              readOnly
              className="link-input"
            />
            <button className="copy-button" onClick={handleCopyLink}>
              📋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shareposts;