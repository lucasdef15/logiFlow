import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Truck, MapPin, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FreeTrialPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
    general: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const newErrors = {
      email:
        formData.email.trim() === ''
          ? 'E-mail é obrigatório'
          : !validateEmail(formData.email)
          ? 'Digite um e-mail válido'
          : '',
      password:
        formData.password.trim() === ''
          ? 'Senha é obrigatória'
          : formData.password.length < 6
          ? 'A senha deve ter pelo menos 6 caracteres'
          : '',
      confirmPassword:
        formData.confirmPassword.trim() === ''
          ? 'Confirmação de senha é obrigatória'
          : formData.confirmPassword !== formData.password
          ? 'As senhas não coincidem'
          : '',
      terms: !formData.terms ? 'Você deve aceitar os termos' : '',
      general: '',
    };

    setErrors(newErrors);

    const hasClientErrors = Object.values(newErrors).some(
      (error) => error !== ''
    );
    if (hasClientErrors) return;

    try {
      const response = await fetch('http://www.logiflow.io/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          terms: formData.terms,
        }),
      });

      const data = await response.json();

      if (data.success) {
        login({
          token: data.data.token,
          user: data.data.user,
          company: data.data.company,
        });

        if (data.data.meta?.redirectTo) {
          navigate(data.data.meta.redirectTo);
        } else {
          navigate('/dashboard');
        }
      } else {
        // Handle server-side errors
        const serverErrors = data.error || {};
        setErrors({
          email: serverErrors.email || '',
          password: serverErrors.password || '',
          confirmPassword: serverErrors.confirmPassword || '',
          terms: serverErrors.terms || '',
          general: data.message || 'Erro ao registrar',
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: 'Erro na conexão com o servidor.',
      });
      console.error(error);
    }
  };

  return (
    <div className='relative w-full min-h-screen bg-gray-100 dark:bg-[#0d111c] text-gray-900 dark:text-white py-20 px-4 overflow-hidden'>
      {/* WebGL Background Placeholder */}
      <div
        ref={backgroundRef}
        className='absolute inset-0 w-full h-full z-0 opacity-50 bg-gradient-to-r from-blue-100/20 dark:from-[#00b7eb]/20 to-transparent'
      />

      {/* Gradient Transition */}
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-100 dark:to-[#0d111c] z-10 pointer-events-none' />

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Left Side */}
        <section
          ref={leftSideRef}
          className='bg-white/80 dark:bg-[#1a1f2b]/80 rounded-3xl p-10 shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50 flex flex-col justify-center'
        >
          <h2 className='text-4xl font-bold text-blue-600 dark:text-[#00b7eb] mb-5 tracking-tight'>
            Transform Your Logistics
          </h2>
          <p className='text-gray-600 dark:text-white/80 text-lg leading-relaxed mb-8'>
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
                <span className='p-2 bg-blue-100/80 dark:bg-[#00b7eb]/20 text-blue-500 dark:text-[#00b7eb] rounded-full group-hover:bg-blue-200/80 dark:group-hover:bg-[#00b7eb]/40'>
                  {feature.icon}
                </span>
                <span className='text-gray-600 dark:text-white/70'>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
          <Card className='p-6 bg-gray-50/80 dark:bg-[#2a2f3b]/80 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
            <div className='flex items-start gap-4'>
              <div className='w-40 aspect-square rounded-full overflow-hidden'>
                <img
                  className='w-full h-full object-cover object-center'
                  src={'/assets/avatars/maria.webp'}
                  alt={'Sarah Johnson'}
                />
              </div>
              <div>
                <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Sarah Johnson
                </p>
                <p className='text-sm text-gray-500 dark:text-white/60'>
                  Logistics Manager, XYZ Logistics
                </p>
                <p className='text-gray-600 dark:text-white/70 mt-2 leading-relaxed'>
                  "TrackFlow has completely transformed how we manage our
                  deliveries. We've seen a 25% reduction in fuel costs and our
                  customers love real-time tracking."
                </p>
              </div>
            </div>
          </Card>
          <div className='bg-blue-200 dark:bg-[#00b7eb]/20 p-5 rounded-xl mt-6 text-gray-600 dark:text-white/80'>
            <p>
              <strong>No credit card required</strong> to start your 14-day
              trial. Cancel anytime during the trial period.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section
          ref={formRef}
          className='bg-white/80 dark:bg-[#1a1f2b]/80 rounded-3xl p-10 shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50 flex flex-col justify-center'
        >
          <h1 className='text-3xl font-bold text-blue-600 dark:text-[#00b7eb] mb-4 tracking-tight'>
            Start Your 14-Day Free Trial
          </h1>
          <p className='text-gray-600 dark:text-white/80 mb-8 leading-relaxed'>
            Join TrackFlow today and discover how our platform can revolutionize
            your logistics operations.
          </p>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {errors.general && (
              <div className='bg-red-100 dark:bg-red-900/80 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4 text-sm flex items-start gap-2'>
                <svg
                  className='w-5 h-5 mt-0.5 flex-shrink-0 text-red-500 dark:text-red-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01M4.93 19h14.14c1.04 0 1.67-1.15 1.14-2.04L13.14 4.21c-.52-.89-1.76-.89-2.28 0L3.79 16.96c-.52.89.1 2.04 1.14 2.04z'
                  />
                </svg>
                <span>{errors.general}</span>
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-white/80 mb-2'
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
                className={cn(
                  'w-full bg-white dark:bg-[#2a2f3b] border rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:ring-2 transition-colors',
                  errors.email || errors.general
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-[#00b7eb]/30 focus:ring-[#00b7eb] focus:border-[#00b7eb]'
                )}
                required
              />
              {errors.email && (
                <span className='text-red-500 text-xs mt-2'>
                  {errors.email}
                </span>
              )}
            </div>

            <div className='mb-5 relative'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-black/70 dark:text-white/80 mb-1'
              >
                Senha
              </label>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={cn(
                  'w-full bg-white dark:bg-[#2a2f3b] border rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:ring-2 transition-colors pr-10', // Adiciona padding à direita
                  errors.password || errors.general
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-[#00b7eb]/30 focus:ring-[#00b7eb] focus:border-[#00b7eb]'
                )}
                placeholder='Sua senha'
                aria-describedby='password-error'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-9 text-gray-500 hover:text-[#00b7eb] focus:outline-none'
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <span
                  id='password-error'
                  className='text-red-500 text-xs mt-1 block'
                >
                  {errors.password}
                </span>
              )}
            </div>

            <div className='mb-5'>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-black/70 dark:text-white/80 mb-1'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Re-enter your password'
                className={cn(
                  'w-full bg-white dark:bg-[#2a2f3b] border rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:ring-2 transition-colors pr-10', // Adiciona padding à direita
                  errors.confirmPassword || errors.general
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-[#00b7eb]/30 focus:ring-[#00b7eb] focus:border-[#00b7eb]'
                )}
              />
              {errors.confirmPassword && (
                <span className='text-red-500 text-xs mt-2'>
                  {errors.confirmPassword}
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
                className='h-5 w-5 text-blue-500 dark:text-[#00b7eb] focus:ring-blue-500 dark:focus:ring-[#00b7eb] border-blue-200/50 dark:border-[#00b7eb]/30 rounded'
                required
              />
              <label
                htmlFor='terms'
                className='text-sm text-gray-700 dark:text-white/80'
              >
                I agree to the{' '}
                <a
                  href='/terms'
                  className='text-blue-500 dark:text-[#00b7eb] hover:underline'
                >
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <span className='text-red-500 text-xs'>{errors.terms}</span>
            )}
            <button
              type='submit'
              className='w-full cursor-pointer bg-blue-500 dark:bg-[#00b7eb] hover:bg-blue-600 dark:hover:bg-[#0084ff] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md'
            >
              Start Free Trial
            </button>
          </form>
          <p className='text-center text-sm text-gray-500 dark:text-white/60 mt-6'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-blue-500 dark:text-[#00b7eb] hover:underline'
            >
              Login
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default FreeTrialPage;
