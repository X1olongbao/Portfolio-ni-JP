import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch data from Supabase
        const { data, error } = await supabase
          .from('portfolio_data')
          .select('*')
          .eq('user_id', 'default')
          .single();

        if (error) {
          console.error('Error loading data:', error);
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
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Subscribe to real-time changes
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
  }, []);

  return { portfolioData, loading };
};
