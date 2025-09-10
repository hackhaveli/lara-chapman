import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import MarketInsights from './components/MarketInsights';
import NeighborhoodSpotlight from './components/NeighborhoodSpotlight';
import Services from './components/Services';
import WhyChooseLara from './components/WhyChooseLara';
import Testimonials from './components/Testimonials';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Header />
      <Hero />
      <Intro />
      <MarketInsights />
      <NeighborhoodSpotlight />
      <Services />
      <WhyChooseLara />
      <Testimonials />
      <ClosingCTA />
      <Footer />
    </div>
  );
}

export default App;