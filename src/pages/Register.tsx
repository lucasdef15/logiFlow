import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Register = () => {
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

  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const passwordErrorRef = useRef<HTMLSpanElement>(null);
  const confirmPasswordErrorRef = useRef<HTMLSpanElement>(null);
  const termsErrorRef = useRef<HTMLSpanElement>(null);
  const generalErrorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  useGSAP(() => {
    if (titleRef.current?.children) {
      gsap.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
          },
        }
      );
    }

    if (formRef.current?.children) {
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
          },
        }
      );
    }

    if (footerRef.current?.children) {
      gsap.fromTo(
        footerRef.current.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
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

  useGSAP(() => {
    const animateError = (ref: React.RefObject<HTMLSpanElement | null>) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    };

    if (errors.email) animateError(emailErrorRef);
    if (errors.password) animateError(passwordErrorRef);
    if (errors.confirmPassword) animateError(confirmPasswordErrorRef);
    if (errors.terms) animateError(termsErrorRef);
    if (errors.general) animateError(generalErrorRef);
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
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
      <div
        ref={backgroundRef}
        className='absolute inset-0 w-full h-full z-0 opacity-50 bg-gradient-to-r from-blue-100/20 dark:from-[#00b7eb]/20 to-transparent'
      />
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-100 dark:to-[#0d111c] z-10 pointer-events-none' />
      <div className='relative max-w-7xl mx-auto z-10'>
        <section ref={titleRef} className='text-center mb-12'>
          <h2 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-blue-600 dark:text-[#00b7eb]'>
            Registre-se no LogFlow
          </h2>
          <p className='text-gray-600 dark:text-white/80 text-base sm:text-lg font-medium mt-4 max-w-md mx-auto'>
            Crie sua conta para acessar o sistema inteligente de gestão de
            entregas
          </p>
        </section>

        <div className='flex justify-center'>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='w-full max-w-md bg-white/80 dark:bg-[#1a1f2b]/80 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50'
          >
            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6'>
              Criar Conta
            </h3>

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

            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-white/80 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  'w-full bg-white dark:bg-[#2a2f3b] border rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:ring-2 transition-colors',
                  errors.email || errors.general
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-[#00b7eb]/30 focus:ring-[#00b7eb] focus:border-[#00b7eb]'
                )}
                placeholder='seu@email.com'
                aria-describedby='email-error'
              />
              {errors.email && (
                <span
                  ref={emailErrorRef}
                  id='email-error'
                  className='text-red-500 text-xs mt-1'
                >
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
                  ref={passwordErrorRef}
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

            <div className='mb-6'>
              <label
                htmlFor='terms'
                className='flex items-center text-sm text-gray-700 dark:text-white/80'
              >
                <input
                  type='checkbox'
                  id='terms'
                  name='terms'
                  checked={formData.terms}
                  onChange={handleChange}
                  className={`mr-2 h-4 w-4 rounded-sm appearance-none border border-gray-400 checked:bg-[#00b7eb] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00b7eb] transition ${
                    errors.password || errors.general
                      ? 'border-red-500 text-red-500'
                      : ''
                  }`}
                />
                Aceito os
                <Link
                  to='/terms'
                  className='text-blue-500 dark:text-[#00b7eb] hover:underline ml-1'
                >
                  Termos e Condições
                </Link>
              </label>
              {errors.terms && (
                <span
                  ref={termsErrorRef}
                  id='terms-error'
                  className='text-red-500 text-xs mt-1'
                >
                  {errors.terms}
                </span>
              )}
            </div>

            <Button
              type='submit'
              className='w-full bg-blue-500 dark:bg-[#00b7eb] hover:bg-blue-600 dark:hover:bg-[#0084ff] cursor-pointer text-white font-semibold py-3 rounded-lg transition-all duration-300'
              aria-label='Criar conta'
            >
              Criar Conta
            </Button>

            <div
              ref={footerRef}
              className='mt-6 text-center text-sm text-gray-600 dark:text-white/80'
            >
              <p>
                Já tem uma conta?
                <Link
                  to='/login'
                  className='text-blue-500 dark:text-[#00b7eb] hover:underline'
                >
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
