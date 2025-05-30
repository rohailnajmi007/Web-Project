import React from 'react';
import Hero from '../Components/Hero';
import LatestCollection from '../Components/LatestCollection';
import BestSeller from '../Components/BestSeller';
import OurPolicy from '../Components/OurPolicy';
import NewsletterBox from '../Components/NewsLetterBox';
const Home = () => {
  return (
    <main>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </main>
  );
};

export default Home;