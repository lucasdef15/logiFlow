import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionNames from './ui/SectionNames';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FreeTrial = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const listRef = useRef<(HTMLLIElement | null)[]>([]);
  const ulRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const svgTopRef = useRef<SVGSVGElement>(null);
  const svgBottomRef = useRef<SVGSVGElement | null>(null);
  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const companyErrorRef = useRef<HTMLSpanElement>(null);
  const passwordErrorRef = useRef<HTMLSpanElement>(null);
  const confirmPasswordErrorRef = useRef<HTMLSpanElement>(null);
  const generalErrorRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

  useGSAP(
    () => {
      try {
        // Simple title animation without ScrollTrigger to ensure visibility
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'expo.inOut' }
          );
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        // SVG animations (morphing and scaling)
        if (svgTopRef.current) {
          tl.fromTo(
            svgTopRef.current,
            { scale: 0.8, opacity: 0, rotation: 10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1.2,
              ease: 'expo.inOut',
            }
          );
        }

        const topPath = svgTopRef.current?.querySelector('path');
        if (topPath) {
          tl.fromTo(
            topPath,
            {
              attr: {
                d: 'M50,20 C80,-10 150,10 170,80 C190,150 130,170 90,190 C50,210 20,180 10,120 C0,60 20,40 50,20 Z',
              },
            },
            {
              attr: {
                d: 'M40,30 C90,0 160,20 180,90 C200,160 140,180 100,200 C60,220 20,170 10,110 C0,50 10,40 40,30 Z',
              },
              duration: 1.5,
              ease: 'power4.inOut',
            },
            0
          );
        }

        if (svgBottomRef.current) {
          tl.fromTo(
            svgBottomRef.current,
            { scale: 0.8, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1.2,
              ease: 'expo.inOut',
            },
            0.2
          );
        }

        const bottomPath = svgBottomRef.current?.querySelector('path');
        if (bottomPath) {
          tl.fromTo(
            bottomPath,
            {
              attr: {
                d: 'M60,20 C100,-10 160,30 170,90 C180,150 130,170 80,170 C30,170 10,120 20,70 C30,40 40,30 60,20 Z',
              },
            },
            {
              attr: {
                d: 'M50,30 C110,0 170,40 180,100 C190,160 130,180 90,180 C50,180 10,130 20,80 C30,50 40,40 50,30 Z',
              },
              duration: 1.5,
              ease: 'power4.inOut',
            },
            0.2
          );
        }

        // Subtitle animation
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.inOut' },
          0.6
        );

        // List items animation
        tl.fromTo(
          listRef.current,
          { opacity: 0, x: -50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.4)',
          },
          0.8
        ).fromTo(
          listRef.current.map((el) => el?.querySelector('svg path')),
          { strokeDasharray: 100, strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.inOut',
          },
          0.8
        );

        // Form animation
        tl.fromTo(
          formRef.current,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.inOut',
          },
          1
        );

        // Button hover effect
        const ctx = gsap.context(() => {
          const button = buttonRef.current;
          if (button) {
            button.addEventListener('mouseenter', () => {
              gsap.to(button, {
                scale: 1.05,
                boxShadow: '0px 8px 24px rgba(14, 165, 233, 0.4)',
                backgroundColor: '#0284c7',
                duration: 0.3,
                ease: 'power2.out',
              });
            });
            button.addEventListener('mouseleave', () => {
              gsap.to(button, {
                scale: 1,
                boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                backgroundColor: '#0ea5e9',
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          }
        }, formRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('GSAP Animation Error:', error);
      }
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    const animateError = (
      ref: React.RefObject<HTMLSpanElement | HTMLDivElement | null>
    ) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    };

    if (errors.email) animateError(emailErrorRef);
    if (errors.company) animateError(companyErrorRef);
    if (errors.password) animateError(passwordErrorRef);
    if (errors.confirmPassword) animateError(confirmPasswordErrorRef);
    if (errors.general) animateError(generalErrorRef);
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
      general: '',
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
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
      company:
        formData.company.trim() === '' ? 'Nome da empresa é obrigatório' : '',
      password:
        formData.password.trim() === ''
          ? 'Senha é obrigatória'
          : !validatePassword(formData.password)
          ? 'A senha deve ter pelo menos 8 caracteres'
          : '',
      confirmPassword:
        formData.confirmPassword.trim() === ''
          ? 'Confirmação de senha é obrigatória'
          : formData.confirmPassword !== formData.password
          ? 'As senhas não coincidem'
          : '',
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
          company: formData.company,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Handle successful free trial registration (e.g., redirect or show success message)
        window.location.href = '/free-trial-success'; // Example redirect
      } else {
        // Handle server-side errors
        const serverErrors = data.error || {};
        setErrors({
          email: serverErrors.email || '',
          company: serverErrors.company || '',
          password: serverErrors.password || '',
          confirmPassword: serverErrors.confirmPassword || '',
          general: data.message || 'Erro ao iniciar o teste gratuito',
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
    <div
      id='free-trial'
      ref={containerRef}
      className='bg-[#0EA5E9] dark:bg-gray-900 relative min-h-[90vh]'
    >
      <div className='w-full max-w-[1128px] mx-auto pt-10 p-4 flex flex-col items-center'>
        <div className='w-full flex justify-center items-center mb-10 z-10'>
          <SectionNames sectionName={'Free Trial'} />
        </div>
        <svg
          ref={svgTopRef}
          className='absolute top-[20px] right-10 z-[0] text-[#27AEEB] dark:text-cyan-700/10'
          width='450'
          height='450'
          viewBox='0 0 200 250'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='currentColor'
            d='M40,30 C90,0 160,20 180,90 C200,160 140,180 100,200 C60,220 20,170 10,110 C0,50 10,40 40,30 Z'
          />
        </svg>

        <div className='w-full p-5 flex z-20 flex-col md:flex-row md:justify-center md:items-start items-start gap-10 md:gap-4'>
          <section className='w-[100%] md:w-[55%] md:text-left text-center max-w-[600px] flex flex-col gap-5 justify-center'>
            <h2
              ref={titleRef}
              className='text-white dark:text-cyan-200 text-5xl font-bold'
              style={{ opacity: 1, transform: 'none' }}
            >
              Try FastFlow for Free
            </h2>

            <p
              ref={subtitleRef}
              className='text-gray-100 dark:text-gray-300 opacity-90'
            >
              Testing FastFlow is easy and commitment-free. Get started now and
              see the difference in your company's logistics.
            </p>

            <ul ref={ulRef} className='text-white dark:text-gray-200 space-y-3'>
              {[
                '14-day free trial period',
                'Access to all features of the basic plan',
                'No credit card required',
                'Support throughout the entire trial period',
              ].map((text, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    listRef.current[index] = el;
                  }}
                  className='flex items-center gap-2'
                >
                  <span className='w-5 h-5 flex items-center justify-center bg-white/20 dark:bg-cyan-700/30 rounded-full'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5 text-white dark:text-cyan-200'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            ref={formRef}
            className='w-[100%] md:w-[40%] py-16 px-4 bg-[#ffffff]/10 dark:bg-gray-800/80 rounded-2xl shadow-xl mx-auto backdrop-blur-md'
          >
            <h3 className='text-white dark:text-cyan-200 text-3xl font-bold mb-6 text-center'>
              Start Your Free Trial
            </h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* General Error */}
              {errors.general && (
                <div
                  ref={generalErrorRef}
                  className='bg-red-100 dark:bg-red-900/80 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4 text-sm flex items-start gap-2'
                >
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

              <div className='flex flex-col'>
                <label
                  htmlFor='email'
                  className='text-white dark:text-gray-200 text-sm mb-1'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    'px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-700/80 text-black dark:text-gray-200 focus:outline-none focus:ring-2 transition-colors',
                    errors.email || errors.general
                      ? 'border-red-600 focus:ring-red-600 focus:border-red-600'
                      : 'focus:ring-sky-400 dark:focus:ring-cyan-400'
                  )}
                  placeholder='your@email.com'
                  aria-describedby='email-error'
                />
                {errors.email && (
                  <span
                    ref={emailErrorRef}
                    id='email-error'
                    className='text-red-600 text-xs mt-1'
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='company'
                  className='text-white dark:text-gray-200 text-sm mb-1'
                >
                  Company
                </label>
                <input
                  type='text'
                  id='company'
                  name='company'
                  value={formData.company}
                  onChange={handleChange}
                  className={cn(
                    'px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-700/80 text-black dark:text-gray-200 focus:outline-none focus:ring-2 transition-colors',
                    errors.company || errors.general
                      ? 'border-red-600 focus:ring-red-600 focus:border-red-600'
                      : 'focus:ring-sky-400 dark:focus:ring-cyan-400'
                  )}
                  placeholder='Your Company Name'
                  aria-describedby='company-error'
                />
                {errors.company && (
                  <span
                    ref={companyErrorRef}
                    id='company-error'
                    className='text-red-600 text-xs mt-1'
                  >
                    {errors.company}
                  </span>
                )}
              </div>

              <div className='mb-5 relative'>
                <label
                  htmlFor='password'
                  className='block text-sm text-white dark:text-gray-200 mb-1'
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
                    ref={passwordErrorRef}
                    id='password-error'
                    className='text-red-500 text-xs mt-1 block'
                  >
                    {errors.password}
                  </span>
                )}
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='confirmPassword'
                  className='text-white dark:text-gray-200 text-sm mb-1'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={cn(
                    'px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-700/80 text-black dark:text-gray-200 focus:outline-none focus:ring-2 transition-colors',
                    errors.confirmPassword || errors.general
                      ? 'border-red-600 focus:ring-red-600 focus:border-red-600'
                      : 'focus:ring-sky-400 dark:focus:ring-cyan-400'
                  )}
                  placeholder='Confirm your password'
                  aria-describedby='confirmPassword-error'
                />
                {errors.confirmPassword && (
                  <span
                    ref={confirmPasswordErrorRef}
                    id='confirmPassword-error'
                    className='text-red-600 text-xs mt-1'
                  >
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                ref={buttonRef}
                type='submit'
                className='w-full mt-6 bg-sky-500 dark:bg-cyan-600 cursor-pointer hover:bg-sky-600 dark:hover:bg-cyan-700 text-white dark:text-gray-100 font-bold py-3 rounded-xl transition duration-300'
              >
                Start Free Trial
              </button>
            </form>
          </section>
        </div>

        <svg
          ref={svgBottomRef}
          className='absolute bottom-[150px] left-50 z-[-1] sm:z-[-1] md:z-[0] text-[#27AEEB] dark:text-cyan-700/10'
          width='450'
          height='450'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='currentColor'
            d='M50,30 C110,0 170,40 180,100 C190,160 130,180 90,180 C50,180 10,130 20,80 C30,50 40,40 50,30 Z'
          />
        </svg>
      </div>
    </div>
  );
};

export default FreeTrial;
