import Features from '@/components/Features';
import Footer from '@/components/Footer';
import FreeTrial from '@/components/FreeTrial';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />

      <Features />

      <Testimonials />
      <FreeTrial />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;
