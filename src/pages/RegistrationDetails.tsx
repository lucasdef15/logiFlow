import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMaskInput } from 'react-imask';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Phone {
  type: string;
  number: string;
}

interface CompanyAddress {
  addressStreet: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  addressZipCode: string;
}

interface FormData {
  companyName: string;
  companyDocument: {
    type: string;
    value: string;
  };
  companyPhones: Phone[];
  companyAddress: CompanyAddress;
  terms: boolean;
}

const RegistrationDetails = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyDocument: {
      type: 'CNPJ',
      value: '',
    },
    companyPhones: [],
    companyAddress: {
      addressStreet: '',
      addressNumber: '',
      addressNeighborhood: '',
      addressCity: '',
      addressState: '',
      addressCountry: 'Brasil',
      addressZipCode: '',
    },
    terms: false,
  });

  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [phoneType, setPhoneType] = useState('BR');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    companyName: '',
    companyDocument: '',
    companyPhones: '',
    addressStreet: '',
    addressNumber: '',
    addressNeighborhood: '',
    addressCity: '',
    addressState: '',
    addressZipCode: '',
    terms: '',
    general: '',
  });

  const companyNameErrorRef = useRef<HTMLSpanElement>(null);
  const companyDocumentErrorRef = useRef<HTMLSpanElement>(null);
  const companyPhonesErrorRef = useRef<HTMLSpanElement>(null);
  const addressStreetErrorRef = useRef<HTMLSpanElement>(null);
  const addressNumberErrorRef = useRef<HTMLSpanElement>(null);
  const addressNeighborhoodErrorRef = useRef<HTMLSpanElement>(null);
  const addressCityErrorRef = useRef<HTMLSpanElement>(null);
  const addressStateErrorRef = useRef<HTMLSpanElement>(null);
  const addressZipCodeErrorRef = useRef<HTMLSpanElement>(null);
  const termsErrorRef = useRef<HTMLSpanElement>(null);
  const generalErrorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

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

    if (errors.companyName) animateError(companyNameErrorRef);
    if (errors.companyDocument) animateError(companyDocumentErrorRef);
    if (errors.companyPhones) animateError(companyPhonesErrorRef);
    if (errors.addressStreet) animateError(addressStreetErrorRef);
    if (errors.addressNumber) animateError(addressNumberErrorRef);
    if (errors.addressNeighborhood) animateError(addressNeighborhoodErrorRef);
    if (errors.addressCity) animateError(addressCityErrorRef);
    if (errors.addressState) animateError(addressStateErrorRef);
    if (errors.addressZipCode) animateError(addressZipCodeErrorRef);
    if (errors.terms) animateError(termsErrorRef);
    if (errors.general) animateError(generalErrorRef);
  }, [errors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name === 'companyDocument') {
      setFormData((prev) => ({
        ...prev,
        companyDocument: {
          ...prev.companyDocument,
          value: value,
        },
      }));
    } else if (
      name === 'addressStreet' ||
      name === 'addressNumber' ||
      name === 'addressNeighborhood' ||
      name === 'addressCity' ||
      name === 'addressState' ||
      name === 'addressZipCode'
    ) {
      setFormData((prev) => ({
        ...prev,
        companyAddress: {
          ...prev.companyAddress,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    setErrors({
      ...errors,
      [name]: '',
      general: '',
    });
  };

  const handleNewPhoneChange = (value: string) => {
    setNewPhoneNumber(value);
  };

  const handlePhoneTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneType(e.target.value);
    setNewPhoneNumber('');
  };

  const addPhone = () => {
    if (newPhoneNumber.trim()) {
      setFormData((prev) => ({
        ...prev,
        companyPhones: [
          ...prev.companyPhones,
          { type: phoneType, number: newPhoneNumber },
        ],
      }));
      setNewPhoneNumber('');
      setErrors((prev) => ({ ...prev, companyPhones: '', general: '' }));
    }
  };

  const removePhone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      companyPhones: prev.companyPhones.filter((_, i) => i !== index),
    }));
  };

  const validateCNPJ = (cnpj: string) => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(cnpj);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex =
      phoneType === 'BR' ? /^\+55\s\d{2}\s\d{5}-\d{4}$/ : /^\+1\s\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {
      companyName:
        formData.companyName.trim() === ''
          ? 'Nome da empresa é obrigatório'
          : '',
      companyDocument:
        formData.companyDocument.value.trim() === ''
          ? 'CNPJ é obrigatório'
          : !validateCNPJ(formData.companyDocument.value)
          ? 'Digite um CNPJ válido (ex: 12.345.678/0001-99)'
          : '',
      companyPhones:
        formData.companyPhones.length === 0
          ? 'Pelo menos um telefone é obrigatório'
          : formData.companyPhones.some((phone) => !validatePhone(phone.number))
          ? 'Número de telefone inválido'
          : '',
      addressStreet:
        formData.companyAddress.addressStreet.trim() === ''
          ? 'Rua é obrigatória'
          : '',
      addressNumber:
        formData.companyAddress.addressNumber.trim() === ''
          ? 'Número é obrigatório'
          : '',
      addressNeighborhood:
        formData.companyAddress.addressNeighborhood.trim() === ''
          ? 'Bairro é obrigatório'
          : '',
      addressCity:
        formData.companyAddress.addressCity.trim() === ''
          ? 'Cidade é obrigatória'
          : '',
      addressState:
        formData.companyAddress.addressState.trim() === ''
          ? 'Estado é obrigatório'
          : '',
      addressZipCode:
        formData.companyAddress.addressZipCode.trim() === ''
          ? 'CEP é obrigatório'
          : '',
      terms: !formData.terms ? 'Você deve aceitar os termos' : '',
      general: '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      try {
        const {
          addressStreet,
          addressNumber,
          addressNeighborhood,
          addressCity,
          addressState,
          addressCountry,
          addressZipCode,
        } = formData.companyAddress;
        const registrationData = {
          userId: crypto.randomUUID(),
          companyId: crypto.randomUUID(),
          companyName: formData.companyName,
          companyDocument: formData.companyDocument,
          companyPhones: formData.companyPhones,
          companyAddress: {
            ...formData.companyAddress,
            addressFormatted: `${addressStreet}, ${addressNumber}, ${addressNeighborhood}, ${addressCity} - ${addressState}, ${addressCountry}, CEP: ${addressZipCode}`,
          },
        };

        const response = await fetch('http://www.logiflow.io/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }

        console.log('Dados enviados com sucesso:', registrationData);
      } catch (error) {
        console.error('Registration error:', error);
        setErrors((prev) => ({
          ...prev,
          general: 'Erro ao processar o registro. Tente novamente.',
        }));
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className='relative w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-4 overflow-hidden'>
      <div
        ref={backgroundRef}
        className='absolute inset-0 w-full h-full z-0 opacity-30 bg-gradient-to-r from-blue-200/20 dark:from-cyan-500/20 to-transparent'
      />
      <div className='relative max-w-5xl mx-auto z-10'>
        <section ref={titleRef} className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-blue-700 dark:text-cyan-400'>
            Cadastro Empresarial no LogFlow
          </h2>
          <p className='text-gray-600 dark:text-gray-300 text-lg mt-4 max-w-lg mx-auto'>
            Registre sua empresa para acessar nossa plataforma de gestão de
            entregas inteligente.
          </p>
        </section>

        <div className='flex justify-center'>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-300/50 dark:hover:shadow-cyan-500/50'
          >
            <h3 className='text-4xl text-center font-semibold text-gray-900 dark:text-white mb-8'>
              Criar Conta Empresarial
            </h3>

            {errors.general && (
              <div
                ref={generalErrorRef}
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm flex items-start gap-2'
              >
                <svg
                  className='w-5 h-5 mt-0.5 flex-shrink-0 text-red-500'
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

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Left Column: Company Info */}
              <div>
                <div className='mb-6'>
                  <label
                    htmlFor='companyName'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    Nome da Empresa
                  </label>
                  <input
                    id='companyName'
                    name='companyName'
                    type='text'
                    value={formData.companyName}
                    onChange={handleChange}
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.companyName || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='Nome da sua empresa'
                    aria-describedby='companyName-error'
                  />
                  {errors.companyName && (
                    <span
                      ref={companyNameErrorRef}
                      id='companyName-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.companyName}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='companyDocument'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    CNPJ
                  </label>
                  <IMaskInput
                    id='companyDocument'
                    name='companyDocument'
                    mask='00.000.000/0000-00'
                    value={formData.companyDocument.value}
                    onAccept={(value: string) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyDocument: { ...prev.companyDocument, value },
                      }))
                    }
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.companyDocument || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='12.345.678/0001-99'
                    aria-describedby='companyDocument-error'
                  />
                  {errors.companyDocument && (
                    <span
                      ref={companyDocumentErrorRef}
                      id='companyDocument-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.companyDocument}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                    Telefones da Empresa
                  </label>
                  <div>
                    {formData.companyPhones.map((phone, index) => (
                      <div key={index} className='flex items-center mb-2'>
                        <span className='text-sm text-gray-600 dark:text-gray-300'>
                          {phone.type}: {phone.number}
                        </span>
                        <button
                          type='button'
                          onClick={() => removePhone(index)}
                          className='ml-2 text-red-500 hover:text-red-600 text-sm'
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <div className='flex items-center gap-2'>
                      <select
                        value={phoneType}
                        onChange={handlePhoneTypeChange}
                        className={cn(
                          'w-1/3 bg-white dark:bg-gray-700 border rounded-lg px-2 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                          errors.companyPhones || errors.general
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                        )}
                      >
                        <option value='BR'>BR (+55)</option>
                        <option value='USA'>EUA (+1)</option>
                      </select>
                      <IMaskInput
                        mask={
                          phoneType === 'BR'
                            ? '+55 00 00000-0000'
                            : '+1 000-0000'
                        }
                        value={newPhoneNumber}
                        onAccept={(value: string) =>
                          handleNewPhoneChange(value)
                        }
                        className={cn(
                          'w-2/3 bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                          errors.companyPhones || errors.general
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                        )}
                        placeholder={
                          phoneType === 'BR'
                            ? '+55 11 91234-5678'
                            : '+1 123-4567'
                        }
                      />
                      <button
                        type='button'
                        onClick={addPhone}
                        className='bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold py-2 px-3 rounded text-sm transition-colors'
                        disabled={!newPhoneNumber.trim()}
                      >
                        Adicionar
                      </button>
                    </div>
                    {errors.companyPhones && (
                      <span
                        ref={companyPhonesErrorRef}
                        id='companyPhones-error'
                        className='text-red-500 text-xs mt-1'
                      >
                        {errors.companyPhones}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Address Info */}
              <div>
                <div className='mb-6'>
                  <label
                    htmlFor='addressStreet'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    Rua
                  </label>
                  <input
                    id='addressStreet'
                    name='addressStreet'
                    type='text'
                    value={formData.companyAddress.addressStreet}
                    onChange={handleChange}
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.addressStreet || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='Rua Exemplo'
                    aria-describedby='addressStreet-error'
                  />
                  {errors.addressStreet && (
                    <span
                      ref={addressStreetErrorRef}
                      id='addressStreet-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.addressStreet}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='addressNumber'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    Número
                  </label>
                  <input
                    id='addressNumber'
                    name='addressNumber'
                    type='text'
                    value={formData.companyAddress.addressNumber}
                    onChange={handleChange}
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.addressNumber || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='123'
                    aria-describedby='addressNumber-error'
                  />
                  {errors.addressNumber && (
                    <span
                      ref={addressNumberErrorRef}
                      id='addressNumber-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.addressNumber}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='addressNeighborhood'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    Bairro
                  </label>
                  <input
                    id='addressNeighborhood'
                    name='addressNeighborhood'
                    type='text'
                    value={formData.companyAddress.addressNeighborhood}
                    onChange={handleChange}
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.addressNeighborhood || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='Centro'
                    aria-describedby='addressNeighborhood-error'
                  />
                  {errors.addressNeighborhood && (
                    <span
                      ref={addressNeighborhoodErrorRef}
                      id='addressNeighborhood-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.addressNeighborhood}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='addressCity'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    Cidade
                  </label>
                  <input
                    id='addressCity'
                    name='addressCity'
                    type='text'
                    value={formData.companyAddress.addressCity}
                    onChange={handleChange}
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.addressCity || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='São Paulo'
                    aria-describedby='addressCity-error'
                  />
                  {errors.addressCity && (
                    <span
                      ref={addressCityErrorRef}
                      id='addressCity-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.addressCity}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='addressState'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    Estado
                  </label>
                  <input
                    id='addressState'
                    name='addressState'
                    type='text'
                    value={formData.companyAddress.addressState}
                    onChange={handleChange}
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.addressState || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='SP'
                    aria-describedby='addressState-error'
                  />
                  {errors.addressState && (
                    <span
                      ref={addressStateErrorRef}
                      id='addressState-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.addressState}
                    </span>
                  )}
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='addressZipCode'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'
                  >
                    CEP
                  </label>
                  <IMaskInput
                    id='addressZipCode'
                    name='addressZipCode'
                    mask='00000-000'
                    value={formData.companyAddress.addressZipCode}
                    onAccept={(value: string) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyAddress: {
                          ...prev.companyAddress,
                          addressZipCode: value,
                        },
                      }))
                    }
                    className={cn(
                      'w-full bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 transition-colors',
                      errors.addressZipCode || errors.general
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500'
                    )}
                    placeholder='01000-000'
                    aria-describedby='addressZipCode-error'
                  />
                  {errors.addressZipCode && (
                    <span
                      ref={addressZipCodeErrorRef}
                      id='addressZipCode-error'
                      className='text-red-500 text-xs mt-1'
                    >
                      {errors.addressZipCode}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className='mb-6'>
              <label
                htmlFor='terms'
                className='flex items-center text-sm text-gray-700 dark:text-gray-200'
              >
                <input
                  type='checkbox'
                  id='terms'
                  name='terms'
                  checked={formData.terms}
                  onChange={handleChange}
                  className={cn(
                    'mr-2 h-4 w-4 rounded-sm appearance-none border border-gray-400 checked:bg-cyan-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 transition',
                    errors.terms || errors.general ? 'border-red-500' : ''
                  )}
                />
                Aceito os
                <Link
                  to='/terms'
                  className='text-blue-600 dark:text-cyan-400 hover:underline ml-1'
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

            <div className='w-full flex items-center justify-center'>
              <Button
                type='submit'
                className=' bg-blue-600 dark:bg-cyan-500 cursor-pointer hover:bg-blue-700 dark:hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-all duration-300'
                aria-label='Criar conta empresarial'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Criar Conta Empresarial'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
