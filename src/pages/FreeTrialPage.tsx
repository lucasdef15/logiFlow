import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Truck, MapPin, Users, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FreeTrialPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    terms: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    terms: '',
  });

  const formRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      text: 'Real-time tracking and analytics',
      icon: <MapPin className='text-[#00b7eb]' />,
    },
    {
      text: 'Smart route optimization',
      icon: <Truck className='text-[#00b7eb]' />,
    },
    {
      text: 'Team collaboration tools',
      icon: <Users className='text-[#00b7eb]' />,
    },
    {
      text: 'Customer notification system',
      icon: <Clock className='text-[#00b7eb]' />,
    },
    {
      text: 'Mobile app for drivers',
      icon: <Truck className='text-[#00b7eb]' />,
    },
  ];

  useEffect(() => {
    if (formRef.current?.children) {
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
            end: 'bottom 20%',
          },
        }
      );
    }
    if (leftSideRef.current?.children) {
      gsap.fromTo(
        leftSideRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: leftSideRef.current,
            start: 'top 90%',
            end: 'bottom 20%',
          },
        }
      );
    }
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: backgroundRef.current,
            start: 'top 100%',
            end: 'bottom 20%',
          },
        }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: formData.email.trim() === '' ? 'Email is required' : '',
      password: formData.password.trim() === '' ? 'Password is required' : '',
      terms: !formData.terms ? 'You must agree to the terms' : '',
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      console.log('Form submitted:', formData);
      // Add backend submission logic here
    }
  };

  return (
    <div className='relative w-full min-h-screen bg-[#0d111c] text-white py-20 px-4 overflow-hidden'>
      {/* WebGL Background Placeholder */}
      <div
        ref={backgroundRef}
        className='absolute inset-0 w-full h-full z-0 opacity-50 bg-gradient-to-r from-[#00b7eb]/20 to-transparent'
      />

      {/* Gradient Transition */}
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0d111c] z-10 pointer-events-none' />

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Left Side */}
        <section
          ref={leftSideRef}
          className='bg-[#1a1f2b]/80 rounded-3xl p-10 shadow-lg transition-all duration-300 hover:shadow-cyan-500/50 flex flex-col justify-center'
        >
          <h2 className='text-4xl font-bold text-[#00b7eb] mb-5 tracking-tight'>
            Transform Your Logistics
          </h2>
          <p className='text-white/80 text-lg leading-relaxed mb-8'>
            Experience the power of TrackFlow with a 14-day free trial.
            Streamline operations, cut costs, and boost efficiency with our
            cutting-edge platform.
          </p>
          <ul className='space-y-5 mb-8'>
            {features.map((feature, index) => (
              <li
                key={index}
                className='flex items-center gap-4 group hover:scale-105 transition-transform duration-300'
              >
                <span className='p-2 bg-[#00b7eb]/20 text-[#00b7eb] rounded-full group-hover:bg-[#00b7eb]/40'>
                  {feature.icon}
                </span>
                <span className='text-white/70'>{feature.text}</span>
              </li>
            ))}
          </ul>
          <Card className='p-6 bg-[#2a2f3b]/80 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
            <div className='flex items-start gap-4'>
              <div className='w-40 aspect-square rounded-full overflow-hidden'>
                <img
                  className='w-full h-full object-cover object-center'
                  src={'/assets/avatars/maria.webp'}
                  alt={'Sarah Johnson'}
                />
              </div>
              <div>
                <p className='text-lg font-semibold text-white'>
                  Sarah Johnson
                </p>
                <p className='text-sm text-white/60'>
                  Logistics Manager, XYZ Logistics
                </p>
                <p className='text-white/70 mt-2 leading-relaxed'>
                  "TrackFlow has completely transformed how we manage our
                  deliveries. We've seen a 25% reduction in fuel costs and our
                  customers love real-time tracking."
                </p>
              </div>
            </div>
          </Card>
          <div className='bg-[#00b7eb]/20 p-5 rounded-xl mt-6 text-white/80'>
            <p>
              <strong>No credit card required</strong> to start your 14-day
              trial. Cancel anytime during the trial period.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section
          ref={formRef}
          className='bg-[#1a1f2b]/80 rounded-3xl p-10 shadow-lg transition-all duration-300 hover:shadow-cyan-500/50 flex flex-col justify-center'
        >
          <h1 className='text-3xl font-bold text-[#00b7eb] mb-4 tracking-tight'>
            Start Your 14-Day Free Trial
          </h1>
          <p className='text-white/80 mb-8 leading-relaxed'>
            Join TrackFlow today and discover how our platform can revolutionize
            your logistics operations.
          </p>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-white/80 mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='you@company.com'
                className='w-full bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
                required
              />
              {errors.email && (
                <span className='text-red-500 text-xs mt-2'>
                  {errors.email}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-white/80 mb-2'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Create a secure password'
                className='w-full bg-[#2a2f3b] border border-[#00b7eb]/30 rounded-lg px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#00b7eb] focus:border-[#00b7eb] transition-colors'
                required
              />
              {errors.password && (
                <span className='text-red-500 text-xs mt-2'>
                  {errors.password}
                </span>
              )}
            </div>
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                id='terms'
                name='terms'
                checked={formData.terms}
                onChange={handleChange}
                className='h-5 w-5 text-[#00b7eb] focus:ring-[#00b7eb] border-[#00b7eb]/30 rounded'
                required
              />
              <label htmlFor='terms' className='text-sm text-white/80'>
                I agree to the{' '}
                <a href='/terms' className='text-[#00b7eb] hover:underline'>
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <span className='text-red-500 text-xs'>{errors.terms}</span>
            )}
            <button
              type='submit'
              className='w-full bg-[#00b7eb] hover:bg-[#0084ff] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md'
            >
              Start Free Trial
            </button>
          </form>
          <p className='text-center text-sm text-white/60 mt-6'>
            Already have an account?{' '}
            <Link to='/login' className='text-[#00b7eb] hover:underline'>
              Login
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default FreeTrialPage;
