import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, MessageCircleMore } from 'lucide-react';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [webGLError, _setWebGLError] = useState(false);

  const nameErrorRef = useRef<HTMLSpanElement>(null);
  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const companyErrorRef = useRef<HTMLSpanElement>(null);
  const subjectErrorRef = useRef<HTMLSpanElement>(null);
  const messageErrorRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title animation
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

    // Form fields animation
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

    // Contact info animation
    if (contactInfoRef.current?.children) {
      gsap.fromTo(
        contactInfoRef.current.children,
        { opacity: 0, x: 30, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
          },
        }
      );
    }

    // Background fade-in
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

    if (errors.name && nameErrorRef.current) animateError(nameErrorRef);
    if (errors.email && emailErrorRef.current) animateError(emailErrorRef);
    if (errors.company && companyErrorRef.current)
      animateError(companyErrorRef);
    if (errors.subject && subjectErrorRef.current)
      animateError(subjectErrorRef);
    if (errors.message && messageErrorRef.current)
      animateError(messageErrorRef);
  }, [errors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name.trim() === '' ? 'Nome é obrigatório' : '',
      email: formData.email.trim() === '' ? 'E-mail é obrigatório' : '',
      company: formData.company.trim() === '' ? 'Empresa é obrigatória' : '',
      subject: formData.subject.trim() === '' ? 'Assunto é obrigatório' : '',
      message: formData.message.trim() === '' ? 'Mensagem é obrigatória' : '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      console.log('Dados enviados:', formData);
      // Backend submission logic here
    }
  };

  return (
    <div className='relative w-full min-h-screen bg-gray-100 dark:bg-[#0d111c] text-gray-900 dark:text-white py-20 px-4 overflow-hidden'>
      {/* Background Effect */}
      <div
        ref={backgroundRef}
        className='absolute inset-0 w-full h-full z-0 opacity-50 bg-gradient-to-r from-blue-100/20 dark:from-[#00b7eb]/20 to-transparent'
      />

      {/* Gradient Transition */}
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-100 dark:to-[#0d111c] z-10 pointer-events-none' />

      {/* WebGL Error Fallback */}
      {webGLError && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-900 dark:text-white z-20'>
          Your browser does not support WebGL. Please try a different browser or
          update your graphics drivers.
        </div>
      )}

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto z-10'>
        <section ref={titleRef} className='text-center mb-12'>
          <h2 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-blue-600 dark:text-[#00b7eb]'>
            Get in Touch
          </h2>
          <p className='text-gray-600 dark:text-white/80 text-base sm:text-lg font-medium mt-4 max-w-md mx-auto'>
            Have questions or need support? Our team is here to provide
            personalized assistance and quick responses.
          </p>
        </section>

        <div className='flex flex-col lg:flex-row gap-8 w-full'>
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='flex-1 bg-white/80 dark:bg-[#1a1f2b]/80 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50'
          >
            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6'>
              Send Us a Message
            </h3>

            {/* Name */}
            <div className='mb-5'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 dark:text-white/80 mb-1'
              >
                Full Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                value={formData.name}
                onChange={handleChange}
                className='w-full bg-gray-50 dark:bg-[#2a2f3b] border border-blue-200/50 dark:border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#00b7eb] focus:border-blue-500 dark:focus:border-[#00b7eb] transition-colors'
                placeholder='Your name'
                aria-describedby='name-error'
              />
              {errors.name && (
                <span
                  ref={nameErrorRef}
                  id='name-error'
                  className='text-red-500 text-xs mt-1'
                >
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
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
                className='w-full bg-gray-50 dark:bg-[#2a2f3b] border border-blue-200/50 dark:border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#00b7eb] focus:border-blue-500 dark:focus:border-[#00b7eb] transition-colors'
                placeholder='your@email.com'
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

            {/* Company */}
            <div className='mb-5'>
              <label
                htmlFor='company'
                className='block text-sm font-medium text-gray-700 dark:text-white/80 mb-1'
              >
                Company
              </label>
              <input
                id='company'
                name='company'
                type='text'
                value={formData.company}
                onChange={handleChange}
                className='w-full bg-gray-50 dark:bg-[#2a2f3b] border border-blue-200/50 dark:border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#00b7eb] focus:border-blue-500 dark:focus:border-[#00b7eb] transition-colors'
                placeholder='Company name'
                aria-describedby='company-error'
              />
              {errors.company && (
                <span
                  ref={companyErrorRef}
                  id='company-error'
                  className='text-red-500 text-xs mt-1'
                >
                  {errors.company}
                </span>
              )}
            </div>

            {/* Subject */}
            <div className='mb-5'>
              <label
                htmlFor='subject'
                className='block text-sm font-medium text-gray-700 dark:text-white/80 mb-1'
              >
                Subject
              </label>
              <input
                id='subject'
                name='subject'
                type='text'
                value={formData.subject}
                onChange={handleChange}
                className='w-full bg-gray-50 dark:bg-[#2a2f3b] border border-blue-200/50 dark:border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#00b7eb] focus:border-blue-500 dark:focus:border-[#00b7eb] transition-colors'
                placeholder='Reason for contact'
                aria-describedby='subject-error'
              />
              {errors.subject && (
                <span
                  ref={subjectErrorRef}
                  id='subject-error'
                  className='text-red-500 text-xs mt-1'
                >
                  {errors.subject}
                </span>
              )}
            </div>

            {/* Message */}
            <div className='mb-6'>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700 dark:text-white/80 mb-1'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className='w-full bg-gray-50 dark:bg-[#2a2f3b] border border-blue-200/50 dark:border-[#00b7eb]/30 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#00b7eb] focus:border-blue-500 dark:focus:border-[#00b7eb] transition-colors resize-none'
                placeholder='How can we assist you?'
                aria-describedby='message-error'
              />
              {errors.message && (
                <span
                  ref={messageErrorRef}
                  id='message-error'
                  className='text-red-500 text-xs mt-1'
                >
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full bg-blue-500 dark:bg-[#00b7eb] hover:bg-blue-600 dark:hover:bg-[#0084ff] cursor-pointer text-white font-semibold py-3 rounded-lg transition-all duration-300'
              aria-label='Submit contact form'
            >
              Send Message
            </Button>
          </form>

          {/* Contact Information */}
          <section
            ref={contactInfoRef}
            className='lg:w-[40%] flex flex-col bg-white/80 dark:bg-[#1a1f2b]/80 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50'
          >
            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-8'>
              Contact Information
            </h3>
            <ul className='space-y-8'>
              {/* Email */}
              <li className='flex items-start gap-4 group hover:scale-105 transition-transform duration-300'>
                <span className='p-3 bg-blue-100/80 dark:bg-[#00b7eb]/20 text-blue-500 dark:text-[#00b7eb] rounded-full group-hover:bg-blue-200/80 dark:group-hover:bg-[#00b7eb]/40'>
                  <Mail size={24} />
                </span>
                <div>
                  <span className='text-base font-semibold text-gray-900 dark:text-white'>
                    Email
                  </span>
                  <p className='text-gray-600 dark:text-white/70 text-sm mt-1'>
                    contato@fastflow.com
                  </p>
                  <p className='text-gray-600 dark:text-white/70 text-sm'>
                    suporte@fastflow.com
                  </p>
                </div>
              </li>
              {/* Phone */}
              <li className='flex items-start gap-4 group hover:scale-105 transition-transform duration-300'>
                <span className='p-3 bg-blue-100/80 dark:bg-[#00b7eb]/20 text-blue-500 dark:text-[#00b7eb] rounded-full group-hover:bg-blue-200/80 dark:group-hover:bg-[#00b7eb]/40'>
                  <Phone size={24} />
                </span>
                <div>
                  <span className='text-base font-semibold text-gray-900 dark:text-white'>
                    Phone
                  </span>
                  <p className='text-gray-600 dark:text-white/70 text-sm mt-1'>
                    (11) 3456-7890
                  </p>
                  <p className='text-gray-600 dark:text-white/70 text-sm'>
                    (11) 98765-4321
                  </p>
                </div>
              </li>
              {/* WhatsApp */}
              <li className='flex items-start gap-4 group hover:scale-105 transition-transform duration-300'>
                <span className='p-3 bg-blue-100/80 dark:bg-[#00b7eb]/20 text-blue-500 dark:text-[#00b7eb] rounded-full group-hover:bg-blue-200/80 dark:group-hover:bg-[#00b7eb]/40'>
                  <MessageCircleMore size={24} />
                </span>
                <div>
                  <span className='text-base font-semibold text-gray-900 dark:text-white'>
                    WhatsApp
                  </span>
                  <p className='text-gray-600 dark:text-white/70 text-sm mt-1'>
                    (11) 91234-5678
                  </p>
                </div>
              </li>
              {/* Address */}
              <li className='flex items-start gap-4 group hover:scale-105 transition-transform duration-300'>
                <span className='p-3 bg-blue-100/80 dark:bg-[#00b7eb]/20 text-blue-500 dark:text-[#00b7eb] rounded-full group-hover:bg-blue-200/80 dark:group-hover:bg-[#00b7eb]/40'>
                  <MapPin size={24} />
                </span>
                <div>
                  <span className='text-base font-semibold text-gray-900 dark:text-white'>
                    Address
                  </span>
                  <p className='text-gray-600 dark:text-white/70 text-sm mt-1'>
                    Av. Paulista, 1000 - São Paulo
                  </p>
                  <p className='text-gray-600 dark:text-white/70 text-sm underline cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors duration-200'>
                    <a
                      href='https://maps.google.com/?q=Av.+Paulista,+1000'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Ver no Google Maps
                    </a>
                  </p>
                </div>
              </li>
              {/* Business Hours */}
              <li className='flex items-start gap-4 group hover:scale-105 transition-transform duration-300'>
                <span className='p-3 bg-blue-100/80 dark:bg-[#00b7eb]/20 text-blue-500 dark:text-[#00b7eb] rounded-full group-hover:bg-blue-200/80 dark:group-hover:bg-[#00b7eb]/40'>
                  <Clock size={24} />
                </span>
                <div>
                  <span className='text-base font-semibold text-gray-900 dark:text-white'>
                    Business Hours
                  </span>
                  <p className='text-gray-600 dark:text-white/70 text-sm mt-1'>
                    Mon-Fri — 09:00 to 18:00
                  </p>
                  <p className='text-gray-600 dark:text-white/70 text-sm'>
                    Sat — 09:00 to 13:00
                  </p>
                </div>
              </li>
            </ul>

            {/* Call to Action */}
            <div className='mt-10'>
              <a
                href='/contato'
                className='flex flex-row gap-2 w-fit bg-blue-500 dark:bg-[#00b7eb] text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-[#00a0cc] transition-all duration-300'
              >
                Fale Conosco
                <MessageCircleMore />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
