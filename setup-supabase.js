import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://faytxzperxhlxqhbcmnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheXR4enBlcnhobHhxaGJjbW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzI2NzgsImV4cCI6MjA4MDg0ODY3OH0.glt93cRyJK_1uhbp7Bt72iytRb8_ef9v2afdqh6Ramw';

const supabase = createClient(supabaseUrl, supabaseKey);

const initialData = {
  user_id: 'default',
  name: 'John Paul Cruz',
  profession: 'Web Developer & Virtual Assistant',
  greeting: "Hi, I'm",
  tagline: 'Building digital experiences with passion',
  about_me: 'A curious and critical thinker who embraces challenges and takes risks to grow. Staying active in sports has shaped my discipline, resilience, and teamwork—qualities I bring into my journey as a web developer and freelance virtual assistant.',
  skills: [
    { label: 'Frontend', list: 'React, JavaScript, HTML, CSS' },
    { label: 'Backend', list: 'Supabase, Node.js' },
    { label: 'Tools', list: 'Git, Figma, VS Code' },
    { label: 'Soft Skills', list: 'Teamwork, Communication, Problem Solving' }
  ],
  experiences: [
    {
      icon: 'fa-code',
      title: 'Web Development',
      description: 'Creating responsive and modern web applications',
      details: ['React & JavaScript', 'Responsive Design', 'Modern UI/UX']
    },
    {
      icon: 'fa-headset',
      title: 'Virtual Assistant',
      description: 'Providing professional administrative support',
      details: ['Task Management', 'Communication', 'Organization']
    },
    {
      icon: 'fa-database',
      title: 'Backend Integration',
      description: 'Working with databases and APIs',
      details: ['Supabase', 'REST APIs', 'Data Management']
    }
  ],
  social_links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@example.com'
  },
  profile_image: null
};

async function setupData() {
  console.log('Setting up initial data in Supabase...');
  
  // Check if data already exists
  const { data: existing, error: checkError } = await supabase
    .from('portfolio_data')
    .select('*')
    .eq('user_id', 'default')
    .single();

  if (existing) {
    console.log('Data already exists. Updating...');
    const { error } = await supabase
      .from('portfolio_data')
      .update(initialData)
      .eq('user_id', 'default');
    
    if (error) {
      console.error('Error updating data:', error);
    } else {
      console.log('✅ Data updated successfully!');
    }
  } else {
    console.log('Inserting initial data...');
    const { error } = await supabase
      .from('portfolio_data')
      .insert([initialData]);
    
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('✅ Initial data inserted successfully!');
    }
  }
}

setupData();
