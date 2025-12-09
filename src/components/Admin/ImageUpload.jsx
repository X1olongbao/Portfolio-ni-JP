import { useState } from 'react';
import './ImageUpload.css';

function ImageUpload({ currentImage, onImageChange }) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setUploading(true);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        onImageChange(base64String);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">Profile Photo</label>
      
      <div className="image-upload-area">
        {preview ? (
          <div className="image-preview-wrapper">
            <div className="image-preview-container">
              <img src={preview} alt="Profile preview" className="image-preview" />
            </div>
            <div className="image-actions">
              <label className="change-image-button">
                <i className="fas fa-camera"></i>
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
              <button 
                type="button"
                onClick={handleRemove} 
                className="remove-image-button"
              >
                <i className="fas fa-trash"></i>
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label className="upload-placeholder">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div className="upload-icon">
              {uploading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-cloud-upload-alt"></i>
              )}
            </div>
            <p className="upload-text">
              {uploading ? 'Uploading...' : 'Click to upload profile photo'}
            </p>
            <p className="upload-hint">PNG, JPG up to 5MB</p>
          </label>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
