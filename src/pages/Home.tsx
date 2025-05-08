import Features from '@/components/Features';
import FreeTrial from '@/components/FreeTrial';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <div className='bg-[#fefefe] pt-1 pb-20'>
        <Features />
      </div>
      <Testimonials />
      <FreeTrial />
    </>
  );
};

export default Home;
