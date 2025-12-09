import { useState } from 'react';
import './IconPicker.css';

// Popular social media platforms
const socialPlatforms = [
  { name: 'GitHub', icon: 'fa-github', placeholder: 'https://github.com/username' },
  { name: 'LinkedIn', icon: 'fa-linkedin', placeholder: 'https://linkedin.com/in/username' },
  { name: 'Facebook', icon: 'fa-facebook', placeholder: 'https://facebook.com/username' },
  { name: 'Twitter', icon: 'fa-twitter', placeholder: 'https://twitter.com/username' },
  { name: 'Instagram', icon: 'fa-instagram', placeholder: 'https://instagram.com/username' },
  { name: 'YouTube', icon: 'fa-youtube', placeholder: 'https://youtube.com/@username' },
  { name: 'TikTok', icon: 'fa-tiktok', placeholder: 'https://tiktok.com/@username' },
  { name: 'Discord', icon: 'fa-discord', placeholder: 'https://discord.gg/invite' },
  { name: 'Telegram', icon: 'fa-telegram', placeholder: 'https://t.me/username' },
  { name: 'WhatsApp', icon: 'fa-whatsapp', placeholder: 'https://wa.me/1234567890' },
  { name: 'Dribbble', icon: 'fa-dribbble', placeholder: 'https://dribbble.com/username' },
  { name: 'Behance', icon: 'fa-behance', placeholder: 'https://behance.net/username' },
  { name: 'Medium', icon: 'fa-medium', placeholder: 'https://medium.com/@username' },
  { name: 'Dev.to', icon: 'fa-dev', placeholder: 'https://dev.to/username' },
  { name: 'Stack Overflow', icon: 'fa-stack-overflow', placeholder: 'https://stackoverflow.com/users/id' },
  { name: 'Reddit', icon: 'fa-reddit', placeholder: 'https://reddit.com/u/username' },
  { name: 'Twitch', icon: 'fa-twitch', placeholder: 'https://twitch.tv/username' },
  { name: 'Spotify', icon: 'fa-spotify', placeholder: 'https://open.spotify.com/user/id' },
  { name: 'Pinterest', icon: 'fa-pinterest', placeholder: 'https://pinterest.com/username' },
  { name: 'Snapchat', icon: 'fa-snapchat', placeholder: 'https://snapchat.com/add/username' },
];

function SocialIconPicker({ onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlatforms = socialPlatforms.filter(platform =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (platform) => {
    onSelect(platform);
    onClose();
  };

  return (
    <div className="icon-picker-overlay" onClick={onClose}>
      <div className="icon-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="icon-picker-header">
          <h3><i className="fas fa-share-alt"></i> Choose Social Platform</h3>
          <button className="close-picker" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="icon-picker-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search platforms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="icon-picker-grid">
          {filteredPlatforms.map((platform) => (
            <button
              key={platform.name}
              className="icon-picker-item"
              onClick={() => handleSelect(platform)}
              title={platform.name}
            >
              <i className={`fab ${platform.icon}`}></i>
              <span>{platform.name}</span>
            </button>
          ))}
        </div>

        {filteredPlatforms.length === 0 && (
          <div className="no-icons-found">
            <i className="fas fa-search"></i>
            <p>No platforms found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SocialIconPicker;
