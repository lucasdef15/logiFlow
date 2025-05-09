import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';

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

  const features = [
    'Real-time tracking and analytics',
    'Smart route optimization',
    'Team collaboration tools',
    'Customer notification system',
    'Mobile app for drivers',
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
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16'>
      <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Left Side */}
        <section
          ref={leftSideRef}
          className='bg-gradient-to-br from-blue-50 to-gray-50 text-gray-800 rounded-3xl p-10 flex flex-col justify-center shadow-xl transition-shadow duration-300 hover:shadow-2xl'
        >
          <h2 className='text-4xl font-bold mb-5 tracking-tight'>
            Transform Your Logistics
          </h2>
          <p className='text-lg leading-relaxed mb-8 text-gray-600'>
            Experience the power of TrackFlow with a 14-day free trial.
            Streamline operations, cut costs, and boost efficiency with our
            cutting-edge platform.
          </p>
          <ul className='space-y-5 mb-8'>
            {features.map((feature, index) => (
              <li key={index} className='flex items-center gap-4'>
                <span className='w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full'>
                  <svg
                    className='w-5 h-5 text-blue-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </span>
                <span className='text-gray-700'>{feature}</span>
              </li>
            ))}
          </ul>
          <Card className='p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
            <div className='flex items-start gap-4'>
              <div className='w-full aspect-[1/1] rounded-full overflow-hidden max-w-[60px]'>
                <img
                  className='w-full h-full object-cover object-center'
                  src={'/assets/avatars/maria.webp'}
                  alt={'tita'}
                />
              </div>
              <div>
                <p className='text-lg font-semibold text-gray-800'>
                  Sarah Johnson
                </p>
                <p className='text-sm text-gray-500'>
                  Logistics Manager, XYZ Logistics
                </p>
                <p className='text-gray-600 mt-2 leading-relaxed'>
                  "TrackFlow has completely transformed how we manage our
                  deliveries. We've seen a 25% reduction in fuel costs and our
                  customers love real-time tracking."
                </p>
              </div>
            </div>
          </Card>
          <div className='bg-blue-200 p-5 rounded-xl mt-6 text-gray-700'>
            <p>
              <strong>No credit card required</strong> to start your 14-day
              trial. Cancel anytime during the trial period.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section
          ref={formRef}
          className='bg-white rounded-3xl p-10 shadow-xl flex flex-col justify-center transition-shadow duration-300 hover:shadow-2xl'
        >
          <h1 className='text-3xl font-bold text-gray-800 mb-4 tracking-tight'>
            Start Your 14-Day Free Trial
          </h1>
          <p className='text-gray-600 mb-8 leading-relaxed'>
            Join TrackFlow today and discover how our platform can revolutionize
            your logistics operations.
          </p>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
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
                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors bg-gray-50'
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
                className='block text-sm font-medium text-gray-700 mb-2'
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
                className='w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors bg-gray-50'
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
                className='h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded'
                required
              />
              <label htmlFor='terms' className='text-sm text-gray-600'>
                I agree to the{' '}
                <a href='/terms' className='text-blue-500 hover:underline'>
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <span className='text-red-500 text-xs'>{errors.terms}</span>
            )}
            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors shadow-sm hover:shadow-md'
            >
              Start Free Trial
            </button>
          </form>
          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default FreeTrialPage;
