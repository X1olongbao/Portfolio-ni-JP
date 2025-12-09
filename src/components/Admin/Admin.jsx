import { useState, useEffect } from 'react';
import './Admin.css';
import { cardData } from '../data';
import IconPicker from './IconPicker';
import SocialIconPicker from './SocialIconPicker';
import ImageUpload from './ImageUpload';
import { supabase } from '../../lib/supabase';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [showSocialPicker, setShowSocialPicker] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  // Load data from Supabase
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if Supabase is configured
        if (!supabase) {
          console.log('Supabase not configured in Admin, using fallback data');
          // Use fallback data
          const fallbackData = {
            name: "John Paul Cruz",
            profession: "Web Developer & Virtual Assistant",
            greeting: "Hi, I'm",
            tagline: "Building digital experiences with passion",
            aboutMe: "A curious and critical thinker who embraces challenges and takes risks to grow. Staying active in sports has shaped my discipline, resilience, and teamwork—qualities I bring into my journey as a web developer and freelance virtual assistant.",
            skills: [
              { label: "Frontend", list: "React, JavaScript, HTML, CSS" },
              { label: "Backend", list: "Supabase, Node.js" },
              { label: "Tools", list: "Git, Figma, VS Code" },
              { label: "Soft Skills", list: "Teamwork, Communication, Problem Solving" }
            ],
            experiences: [
              {
                icon: "fa-code",
                title: "Web Development",
                description: "Creating responsive and modern web applications",
                details: ["React & JavaScript", "Responsive Design", "Modern UI/UX"]
              },
              {
                icon: "fa-headset",
                title: "Virtual Assistant",
                description: "Providing professional administrative support",
                details: ["Task Management", "Communication", "Organization"]
              },
              {
                icon: "fa-database",
                title: "Backend Integration",
                description: "Working with databases and APIs",
                details: ["Supabase", "REST APIs", "Data Management"]
              }
            ],
            socialLinks: {
              github: "https://github.com",
              linkedin: "https://linkedin.com",
              email: "mailto:contact@example.com"
            }
          };
          
          setPortfolioData(fallbackData);
          setProfileImage(null);
          
          // Convert social_links object to array for the new UI
          const linksArray = [];
          if (fallbackData.socialLinks) {
            Object.entries(fallbackData.socialLinks).forEach(([key, url]) => {
              if (url && url !== '#') {
                linksArray.push({
                  platform: key.charAt(0).toUpperCase() + key.slice(1),
                  icon: `fa-${key}`,
                  url: url
                });
              }
            });
          }
          setSocialLinks(linksArray);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('portfolio_data')
          .select('*')
          .eq('user_id', 'default')
          .single();

        if (error) {
          console.error('Error loading data:', error);
          setLoading(false);
          return;
        }

        if (data) {
          setPortfolioData({
            name: data.name,
            profession: data.profession,
            greeting: data.greeting,
            tagline: data.tagline,
            aboutMe: data.about_me,
            skills: data.skills,
            experiences: data.experiences,
            socialLinks: data.social_links
          });
          
          // Set profile image
          setProfileImage(data.profile_image);
          
          // Convert social_links object to array for the new UI
          const linksArray = [];
          if (data.social_links) {
            Object.entries(data.social_links).forEach(([key, url]) => {
              if (url && url !== '#') {
                linksArray.push({
                  platform: key.charAt(0).toUpperCase() + key.slice(1),
                  icon: `fa-${key}`,
                  url: url
                });
              }
            });
          }
          setSocialLinks(linksArray);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleSave = async () => {
    try {
      if (!supabase) {
        console.log('Supabase not configured - changes saved locally only');
        setSaveMessage('⚠️ Supabase not configured. Changes are not persisted.');
        setTimeout(() => setSaveMessage(''), 4000);
        return;
      }

      // Convert socialLinks array back to object format for database
      const socialLinksObject = {};
      socialLinks.forEach(link => {
        const key = link.platform.toLowerCase();
        socialLinksObject[key] = link.url;
      });

      const { error } = await supabase
        .from('portfolio_data')
        .update({
          name: portfolioData.name,
          profession: portfolioData.profession,
          greeting: portfolioData.greeting,
          tagline: portfolioData.tagline,
          about_me: portfolioData.aboutMe,
          skills: portfolioData.skills,
          experiences: portfolioData.experiences,
          social_links: socialLinksObject,
          profile_image: profileImage,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', 'default');

      if (error) {
        console.error('Error saving:', error);
        setSaveMessage('Error saving changes!');
      } else {
        setSaveMessage('Changes saved successfully!');
      }
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setSaveMessage('Error saving changes!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };



  const updateField = (field, value) => {
    setPortfolioData(prev => ({ ...prev, [field]: value }));
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...portfolioData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setPortfolioData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, { label: 'New Skill', list: '' }]
    }));
  };

  const deleteSkill = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...portfolioData.experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setPortfolioData(prev => ({ ...prev, experiences: newExperiences }));
  };

  const updateExperienceDetail = (expIndex, detailIndex, value) => {
    const newExperiences = [...portfolioData.experiences];
    newExperiences[expIndex].details[detailIndex] = value;
    setPortfolioData(prev => ({ ...prev, experiences: newExperiences }));
  };

  const addExperienceDetail = (expIndex) => {
    const newExperiences = [...portfolioData.experiences];
    newExperiences[expIndex].details.push('New detail');
    setPortfolioData(prev => ({ ...prev, experiences: newExperiences }));
  };

  const deleteExperienceDetail = (expIndex, detailIndex) => {
    const newExperiences = [...portfolioData.experiences];
    newExperiences[expIndex].details = newExperiences[expIndex].details.filter((_, i) => i !== detailIndex);
    setPortfolioData(prev => ({ ...prev, experiences: newExperiences }));
  };

  if (!isAuthenticated) {
    return (
      <section className="admin-section">
        <div className="admin-login-container">
          <div className="login-card">
            <div className="login-header">
              <i className="fas fa-lock"></i>
              <h2>Admin Access</h2>
              <p>Please enter your credentials</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fas fa-user"></i>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-key"></i>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" className="login-button">
                <span>Login</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  if (loading || !portfolioData) {
    return (
      <section className="admin-section">
        <div style={{ textAlign: 'center', color: 'white' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem' }}></i>
          <p style={{ marginTop: '1rem' }}>Loading data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Portfolio Editor</h1>
          <div className="header-actions">
            <button onClick={handleSave} className="save-button">
              <i className="fas fa-save"></i>
              Save Changes
            </button>
            <button onClick={() => window.location.href = '/'} className="logout-button">
              <i className="fas fa-home"></i>
              Back to Portfolio
            </button>
          </div>
        </div>

        {saveMessage && <div className="save-message">{saveMessage}</div>}
        
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <i className="fas fa-code"></i>
            Skills
          </button>
          <button 
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <i className="fas fa-briefcase"></i>
            Experience
          </button>
          <button 
            className={`tab-button ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <i className="fas fa-share-alt"></i>
            Social Links
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'profile' && (
            <div className="edit-section">
              <h2><i className="fas fa-user-edit"></i> Profile Information</h2>
              
              <ImageUpload
                currentImage={profileImage}
                onImageChange={(imageData) => setProfileImage(imageData)}
              />
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={portfolioData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label>Profession/Title</label>
                <input
                  type="text"
                  value={portfolioData.profession}
                  onChange={(e) => updateField('profession', e.target.value)}
                  placeholder="Your profession"
                />
              </div>

              <div className="form-group">
                <label>Greeting Text</label>
                <input
                  type="text"
                  value={portfolioData.greeting}
                  onChange={(e) => updateField('greeting', e.target.value)}
                  placeholder="Hello, I'm"
                />
              </div>

              <div className="form-group">
                <label>Tagline</label>
                <textarea
                  value={portfolioData.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder="Your tagline"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>About Me</label>
                <textarea
                  value={portfolioData.aboutMe}
                  onChange={(e) => updateField('aboutMe', e.target.value)}
                  placeholder="About yourself"
                  rows="4"
                />
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="edit-section">
              <div className="section-header-admin">
                <h2><i className="fas fa-code"></i> Skills Management</h2>
                <button onClick={addSkill} className="add-button">
                  <i className="fas fa-plus"></i>
                  Add Skill
                </button>
              </div>

              {portfolioData.skills.map((skill, index) => (
                <div key={index} className="edit-card">
                  <div className="card-header-admin">
                    <h3>Skill Category {index + 1}</h3>
                    <button 
                      onClick={() => deleteSkill(index)} 
                      className="delete-button"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      value={skill.label}
                      onChange={(e) => updateSkill(index, 'label', e.target.value)}
                      placeholder="e.g., Frontend"
                    />
                  </div>

                  <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input
                      type="text"
                      value={skill.list}
                      onChange={(e) => updateSkill(index, 'list', e.target.value)}
                      placeholder="e.g., React, JavaScript, HTML"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="edit-section">
              <h2><i className="fas fa-briefcase"></i> Experience Cards</h2>

              {portfolioData.experiences.map((exp, expIndex) => (
                <div key={expIndex} className="edit-card">
                  <h3>Experience {expIndex + 1}</h3>
                  
                  <div className="form-group">
                    <label>Icon</label>
                    <button
                      type="button"
                      className="icon-select-button"
                      onClick={() => {
                        setCurrentIconIndex(expIndex);
                        setShowIconPicker(true);
                      }}
                    >
                      <i className={`fas ${exp.icon}`}></i>
                      <span>Change Icon</span>
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
                      placeholder="Experience title"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(expIndex, 'description', e.target.value)}
                      placeholder="Experience description"
                      rows="2"
                    />
                  </div>

                  <div className="form-group">
                    <label>Details</label>
                    {exp.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="detail-input">
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) => updateExperienceDetail(expIndex, detailIndex, e.target.value)}
                          placeholder="Detail point"
                        />
                        <button 
                          onClick={() => deleteExperienceDetail(expIndex, detailIndex)}
                          className="delete-detail-button"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => addExperienceDetail(expIndex)}
                      className="add-detail-button"
                    >
                      <i className="fas fa-plus"></i>
                      Add Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'social' && (
            <div className="edit-section">
              <div className="section-header-admin">
                <h2><i className="fas fa-share-alt"></i> Social Media Links</h2>
                {socialLinks.length < 3 && (
                  <button 
                    onClick={() => setShowSocialPicker(true)} 
                    className="add-button"
                  >
                    <i className="fas fa-plus"></i>
                    Add Social Link
                  </button>
                )}
              </div>

              {socialLinks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--light-text)' }}>
                  <i className="fas fa-share-alt" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}></i>
                  <p>No social links added yet. Click "Add Social Link" to get started!</p>
                </div>
              )}

              {socialLinks.map((link, index) => (
                <div key={index} className="edit-card">
                  <div className="card-header-admin">
                    <h3>
                      <i className={`fab ${link.icon}`} style={{ marginRight: '0.5rem' }}></i>
                      {link.platform}
                    </h3>
                    <button 
                      onClick={() => {
                        const newLinks = socialLinks.filter((_, i) => i !== index);
                        setSocialLinks(newLinks);
                      }} 
                      className="delete-button"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...socialLinks];
                        newLinks[index].url = e.target.value;
                        setSocialLinks(newLinks);
                      }}
                      placeholder={link.placeholder || `https://${link.platform.toLowerCase()}.com/username`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showIconPicker && (
        <IconPicker
          selectedIcon={currentIconIndex !== null ? portfolioData.experiences[currentIconIndex].icon : ''}
          onSelectIcon={(iconClass) => {
            if (currentIconIndex !== null) {
              updateExperience(currentIconIndex, 'icon', iconClass);
            }
          }}
          onClose={() => {
            setShowIconPicker(false);
            setCurrentIconIndex(null);
          }}
        />
      )}

      {showSocialPicker && (
        <SocialIconPicker
          onSelect={(platform) => {
            if (socialLinks.length < 3) {
              setSocialLinks([...socialLinks, {
                platform: platform.name,
                icon: platform.icon,
                url: '',
                placeholder: platform.placeholder
              }]);
            }
          }}
          onClose={() => setShowSocialPicker(false)}
        />
      )}
    </section>
  );
}

export default Admin;
