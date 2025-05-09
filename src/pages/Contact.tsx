import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
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

  const nameErrorRef = useRef<HTMLSpanElement>(null);
  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const companyErrorRef = useRef<HTMLSpanElement>(null);
  const subjectErrorRef = useRef<HTMLSpanElement>(null);
  const messageErrorRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

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
    if (contactInfoRef.current?.children) {
      gsap.fromTo(
        contactInfoRef.current.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 85%',
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
    if (errors.email && emailErrorRef.current !== null)
      animateError(emailErrorRef);
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
    <div className='flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-16 bg-gray-50 min-h-screen'>
      <section ref={titleRef} className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800 mb-3 tracking-tight'>
          Entre em Contato
        </h2>
        <p className='text-gray-600 max-w-md mx-auto leading-relaxed'>
          Tem dúvidas ou precisa de ajuda? Nossa equipe está pronta para
          oferecer suporte personalizado e respostas rápidas.
        </p>
      </section>

      <div className='flex flex-col md:flex-row gap-8 w-full max-w-6xl'>
        {/* Formulário */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex-1 bg-white p-8 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-md'
        >
          <h3 className='text-xl font-semibold text-gray-800 mb-6'>
            Envie uma Mensagem
          </h3>

          {/* Nome */}
          <div className='mb-5'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Nome Completo
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='Seu nome'
            />
            {errors.name && (
              <span ref={nameErrorRef} className='text-red-500 text-xs mt-1'>
                {errors.name}
              </span>
            )}
          </div>

          {/* E-mail */}
          <div className='mb-5'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              E-mail
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='seu@email.com'
            />
            {errors.email && (
              <span ref={emailErrorRef} className='text-red-500 text-xs mt-1'>
                {errors.email}
              </span>
            )}
          </div>

          {/* Empresa */}
          <div className='mb-5'>
            <label
              htmlFor='company'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Empresa
            </label>
            <input
              id='company'
              name='company'
              type='text'
              value={formData.company}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='Nome da empresa'
            />
            {errors.company && (
              <span ref={companyErrorRef} className='text-red-500 text-xs mt-1'>
                {errors.company}
              </span>
            )}
          </div>

          {/* Assunto */}
          <div className='mb-5'>
            <label
              htmlFor='subject'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Assunto
            </label>
            <input
              id='subject'
              name='subject'
              type='text'
              value={formData.subject}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='Motivo do contato'
            />
            {errors.subject && (
              <span ref={subjectErrorRef} className='text-red-500 text-xs mt-1'>
                {errors.subject}
              </span>
            )}
          </div>

          {/* Mensagem */}
          <div className='mb-6'>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Mensagem
            </label>
            <textarea
              id='message'
              name='message'
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none'
              placeholder='Como podemos ajudar?'
            />
            {errors.message && (
              <span ref={messageErrorRef} className='text-red-500 text-xs mt-1'>
                {errors.message}
              </span>
            )}
          </div>

          {/* Botão */}
          <Button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-3 rounded-lg transition-colors'
          >
            Enviar Mensagem
          </Button>
        </form>

        {/* Informações de Contato */}
        <section
          ref={contactInfoRef}
          className='flex-1 bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-md'
        >
          <h3 className='text-xl font-semibold text-gray-800 mb-6'>
            Informações de Contato
          </h3>
          <ul className='space-y-6'>
            <li className='flex items-start gap-4'>
              <span className='p-2 bg-blue-100 text-blue-600 rounded-full'>
                <Mail size={20} />
              </span>
              <div>
                <span className='text-sm font-medium text-gray-700'>
                  E-mail
                </span>
                <p className='text-gray-600'>contato@fastflow.com</p>
                <p className='text-gray-600'>suporte@fastflow.com</p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <span className='p-2 bg-blue-100 text-blue-600 rounded-full'>
                <Phone size={20} />
              </span>
              <div>
                <span className='text-sm font-medium text-gray-700'>
                  Telefone
                </span>
                <p className='text-gray-600'>(11) 3456-7890</p>
                <p className='text-gray-600'>(11) 98765-4321</p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <span className='p-2 bg-blue-100 text-blue-600 rounded-full'>
                <MapPin size={20} />
              </span>
              <div>
                <span className='text-sm font-medium text-gray-700'>
                  Endereço
                </span>
                <p className='text-gray-600'>Av. Paulista, 1000 - São Paulo</p>
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <span className='p-2 bg-blue-100 text-blue-600 rounded-full'>
                <Clock size={20} />
              </span>
              <div>
                <span className='text-sm font-medium text-gray-700'>
                  Horário de Atendimento
                </span>
                <p className='text-gray-600'>Seg a Sex — 09:00 às 18:00</p>
                <p className='text-gray-600'>Sábado — 09:00 às 13:00</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Contact;
