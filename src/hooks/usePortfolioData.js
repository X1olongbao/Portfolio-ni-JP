import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Fallback data when Supabase is not configured
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
  },
  profileImage: null
};

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if Supabase is configured
        if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
          console.log('Supabase not configured, using fallback data');
          setPortfolioData(fallbackData);
          setLoading(false);
          return;
        }

        // Fetch data from Supabase
        const { data, error } = await supabase
          .from('portfolio_data')
          .select('*')
          .eq('user_id', 'default')
          .single();

        if (error) {
          console.error('Error loading data:', error);
          console.log('Using fallback data');
          setPortfolioData(fallbackData);
          setLoading(false);
          return;
        }

        if (data) {
          // Transform database format to app format
          setPortfolioData({
            name: data.name,
            profession: data.profession,
            greeting: data.greeting,
            tagline: data.tagline,
            aboutMe: data.about_me,
            skills: data.skills,
            experiences: data.experiences,
            socialLinks: data.social_links,
            profileImage: data.profile_image
          });
        }
      } catch (error) {
        console.error('Error:', error);
        console.log('Using fallback data');
        setPortfolioData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Subscribe to real-time changes only if Supabase is configured
    if (supabase && import.meta.env.VITE_SUPABASE_URL) {
      const subscription = supabase
        .channel('portfolio_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'portfolio_data',
            filter: 'user_id=eq.default'
          }, 
          (payload) => {
            console.log('Data changed:', payload);
            loadData();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  return { portfolioData, loading };
};
