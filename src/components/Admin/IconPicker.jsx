import { useState } from 'react';
import './IconPicker.css';

// Popular Font Awesome icons
const iconList = [
  { name: 'Video', class: 'fa-video' },
  { name: 'Camera', class: 'fa-camera' },
  { name: 'Film', class: 'fa-film' },
  { name: 'Photo', class: 'fa-image' },
  { name: 'Music', class: 'fa-music' },
  { name: 'Headphones', class: 'fa-headphones' },
  { name: 'Microphone', class: 'fa-microphone' },
  { name: 'Code', class: 'fa-code' },
  { name: 'Laptop Code', class: 'fa-laptop-code' },
  { name: 'Terminal', class: 'fa-terminal' },
  { name: 'Bug', class: 'fa-bug' },
  { name: 'Database', class: 'fa-database' },
  { name: 'Server', class: 'fa-server' },
  { name: 'Cloud', class: 'fa-cloud' },
  { name: 'Briefcase', class: 'fa-briefcase' },
  { name: 'Chart Line', class: 'fa-chart-line' },
  { name: 'Chart Bar', class: 'fa-chart-bar' },
  { name: 'Chart Pie', class: 'fa-chart-pie' },
  { name: 'Pencil', class: 'fa-pencil-alt' },
  { name: 'Pen', class: 'fa-pen' },
  { name: 'Paint Brush', class: 'fa-paint-brush' },
  { name: 'Palette', class: 'fa-palette' },
  { name: 'Book', class: 'fa-book' },
  { name: 'Graduation Cap', class: 'fa-graduation-cap' },
  { name: 'User', class: 'fa-user' },
  { name: 'Users', class: 'fa-users' },
  { name: 'User Tie', class: 'fa-user-tie' },
  { name: 'Envelope', class: 'fa-envelope' },
  { name: 'Phone', class: 'fa-phone' },
  { name: 'Mobile', class: 'fa-mobile-alt' },
  { name: 'Globe', class: 'fa-globe' },
  { name: 'Map', class: 'fa-map' },
  { name: 'Location', class: 'fa-map-marker-alt' },
  { name: 'Rocket', class: 'fa-rocket' },
  { name: 'Star', class: 'fa-star' },
  { name: 'Heart', class: 'fa-heart' },
  { name: 'Lightbulb', class: 'fa-lightbulb' },
  { name: 'Cog', class: 'fa-cog' },
  { name: 'Tools', class: 'fa-tools' },
  { name: 'Wrench', class: 'fa-wrench' },
  { name: 'Hammer', class: 'fa-hammer' },
  { name: 'Clipboard', class: 'fa-clipboard' },
  { name: 'File', class: 'fa-file' },
  { name: 'Folder', class: 'fa-folder' },
  { name: 'Download', class: 'fa-download' },
  { name: 'Upload', class: 'fa-upload' },
  { name: 'Share', class: 'fa-share-alt' },
  { name: 'Link', class: 'fa-link' },
  { name: 'Lock', class: 'fa-lock' },
  { name: 'Key', class: 'fa-key' },
  { name: 'Shield', class: 'fa-shield-alt' },
  { name: 'Check', class: 'fa-check' },
  { name: 'Times', class: 'fa-times' },
  { name: 'Plus', class: 'fa-plus' },
  { name: 'Minus', class: 'fa-minus' },
  { name: 'Search', class: 'fa-search' },
  { name: 'Filter', class: 'fa-filter' },
  { name: 'Shopping Cart', class: 'fa-shopping-cart' },
  { name: 'Credit Card', class: 'fa-credit-card' },
  { name: 'Money', class: 'fa-dollar-sign' },
  { name: 'Calculator', class: 'fa-calculator' },
  { name: 'Calendar', class: 'fa-calendar' },
  { name: 'Clock', class: 'fa-clock' },
  { name: 'Bell', class: 'fa-bell' },
  { name: 'Comment', class: 'fa-comment' },
  { name: 'Comments', class: 'fa-comments' },
  { name: 'Thumbs Up', class: 'fa-thumbs-up' },
  { name: 'Trophy', class: 'fa-trophy' },
  { name: 'Award', class: 'fa-award' },
  { name: 'Medal', class: 'fa-medal' },
  { name: 'Gift', class: 'fa-gift' },
  { name: 'Gamepad', class: 'fa-gamepad' },
  { name: 'Puzzle', class: 'fa-puzzle-piece' },
  { name: 'Cube', class: 'fa-cube' },
  { name: 'Box', class: 'fa-box' },
  { name: 'Truck', class: 'fa-truck' },
  { name: 'Plane', class: 'fa-plane' },
  { name: 'Car', class: 'fa-car' },
  { name: 'Bicycle', class: 'fa-bicycle' },
  { name: 'Coffee', class: 'fa-coffee' },
  { name: 'Pizza', class: 'fa-pizza-slice' },
  { name: 'Utensils', class: 'fa-utensils' },
  { name: 'Home', class: 'fa-home' },
  { name: 'Building', class: 'fa-building' },
  { name: 'Store', class: 'fa-store' },
  { name: 'Hospital', class: 'fa-hospital' },
  { name: 'Dumbbell', class: 'fa-dumbbell' },
  { name: 'Running', class: 'fa-running' },
  { name: 'Basketball', class: 'fa-basketball-ball' },
  { name: 'Football', class: 'fa-football-ball' },
  { name: 'Smile', class: 'fa-smile' },
  { name: 'Laugh', class: 'fa-laugh' },
  { name: 'Grin', class: 'fa-grin' },
];

function IconPicker({ selectedIcon, onSelectIcon, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = iconList.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (iconClass) => {
    onSelectIcon(iconClass);
    onClose();
  };

  return (
    <div className="icon-picker-overlay" onClick={onClose}>
      <div className="icon-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="icon-picker-header">
          <h3><i className="fas fa-icons"></i> Choose an Icon</h3>
          <button className="close-picker" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="icon-picker-search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="icon-picker-grid">
          {filteredIcons.map((icon) => (
            <button
              key={icon.class}
              className={`icon-picker-item ${selectedIcon === icon.class ? 'selected' : ''}`}
              onClick={() => handleSelect(icon.class)}
              title={icon.name}
            >
              <i className={`fas ${icon.class}`}></i>
              <span>{icon.name}</span>
            </button>
          ))}
        </div>

        {filteredIcons.length === 0 && (
          <div className="no-icons-found">
            <i className="fas fa-search"></i>
            <p>No icons found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IconPicker;
