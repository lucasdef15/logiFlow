import { Button } from './ui/button';
import { ChevronRight, ArrowRight, Truck, Package, Clock } from 'lucide-react';
import IconWithLabel from './ui/IconWithLabel';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import HeroExperience from './ModelsComponents/HeroModels/HeroExperience';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec3 color1 = vec3(0.02, 0.03, 0.05);       // Very dark blue, near black
    vec3 color2 = vec3(0.051, 0.067, 0.110);   // Dark blue #0d111c
    vec3 color3 = vec3(0.0, 0.3, 0.5);         // Dark cyan
    vec3 color4 = vec3(0.0, 0.718, 0.922);     // Bright cyan #00b7eb
    float mixFactor1 = sin(time * 0.1 + vUv.x * 3.0) * 0.5 + 0.5;
    float mixFactor2 = cos(time * 0.1 + vUv.y * 3.0) * 0.5 + 0.5;
    vec3 color = mix(mix(color1, color2, vUv.y), mix(color3, color4, vUv.x), mixFactor1 * 0.6 + mixFactor2 * 0.4);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const Hero = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [webGLError, setWebGLError] = useState(false);

  const navigate = useNavigate();

  const detectWebGL = () => {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return gl && gl instanceof WebGLRenderingContext;
  };

  useGSAP(
    () => {
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      if (titleRef.current?.children) {
        gsap.from(Array.from(titleRef.current.children), {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        });
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 8,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      if (buttonsRef.current?.children) {
        gsap.from(Array.from(buttonsRef.current.children), {
          opacity: 0,
          y: 10,
          scale: 0.98,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
        });
      }

      if (iconsRef.current?.children) {
        gsap.from(Array.from(iconsRef.current.children), {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: 'power1.out',
          stagger: 0.1,
        });
      }

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.99,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      const ctx = gsap.context(() => {
        if (buttonsRef.current) {
          const btns = buttonsRef.current.querySelectorAll('.hero-btn');
          btns.forEach((btn) => {
            const isOutline = (btn as HTMLElement).dataset.gsap === 'outline';

            btn.addEventListener('mouseenter', () => {
              gsap.to(btn, {
                scale: 1.03,
                boxShadow: '0px 4px 12px rgba(0, 132, 255, 0.1)',
                backgroundColor: isOutline ? '#0073e6' : '#0073e6',
                borderColor: '#0073e6',
                color: '#ffffff',
                duration: 0.25,
                ease: 'power1.out',
              });
            });

            btn.addEventListener('mouseleave', () => {
              gsap.to(btn, {
                scale: 1,
                boxShadow: '0px 0px 0px rgba(0,0,0,0)',
                backgroundColor: isOutline ? 'transparent' : '#00b7eb',
                borderColor: '#00b7eb',
                color: isOutline ? '#00b7eb' : '#ffffff',
                duration: 0.25,
                ease: 'power1.out',
                clearProps: 'backgroundColor,borderColor,color',
              });
            });
          });
        }
      }, buttonsRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (!canvasRef.current) {
      setWebGLError(true);
      return;
    }

    if (!detectWebGL()) {
      setWebGLError(true);
      return;
    }

    try {
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 1);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 3;

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 1, 1).normalize();
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x404040, 1));

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { time: { value: 0 } },
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let animationId: number;
      const animate = (time: number) => {
        animationId = requestAnimationFrame(animate);
        material.uniforms.time.value = time * 0.001;
        renderer.render(scene, camera);
      };
      animate(0);

      const handleResize = () =>
        renderer.setSize(window.innerWidth, window.innerHeight);
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    } catch (error) {
      setWebGLError(true);
    }
  }, []);

  const handleStartFreeClick = () => {
    navigate('/free-trial');
  };

  const words = ['everyone', 'businesses', 'drivers', 'companies', 'you'];
  const [wordIndex, setWordIndex] = useState(0);
  const dynamicTextRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dynamicTextRef.current) {
        gsap.to(dynamicTextRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          onComplete: () => {
            setWordIndex((prev) => (prev + 1) % words.length);
            gsap.fromTo(
              dynamicTextRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4 }
            );
          },
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      id='top'
      className='relative w-full  mx-auto px-4 min-h-[100vh] flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-10 bg-[#0f0f1b] text-white overflow-hidden'
    >
      {!webGLError && (
        <canvas ref={canvasRef} className='absolute inset-0 z-0' />
      )}
      <div className='w-full max-w-[95%] sm:max-w-[80%] mx-auto relative flex flex-col lg:flex-row justify-between items-center gap-5 sm:gap-10'>
        <section className='w-full lg:w-[70%] flex flex-col justify-center items-center lg:items-start gap-6 z-10'>
          <span
            ref={badgeRef}
            className='bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-semibold shadow'
          >
            Introduction Track Flow
          </span>
          <div
            ref={titleRef}
            className='flex flex-col gap-1 text-center lg:text-left'
          >
            <span className='text-3xl sm:text-5xl lg:text-6xl font-bold flex gap-2  justify-center lg:justify-start'>
              <span className='text-[#00b7eb] whitespace-nowrap'>
                Smart logistics
              </span>
              <span className='text-white'>for</span>
            </span>
            <span
              ref={dynamicTextRef}
              className='text-3xl sm:text-5xl lg:text-6xl font-bold text-white inline-block'
            >
              {words[wordIndex]}
            </span>
          </div>
          <p
            ref={subtitleRef}
            className='text-white/80 text-base sm:text-lg font-medium mt-2 text-center lg:text-left'
          >
            Optimize deliveries, reduce costs, and make better decisions with
            our AI-powered logistics platform. Real-time tracking, intelligent
            route planning, and powerful analytics in one place.
          </p>
          <div
            ref={buttonsRef}
            className='flex flex-col sm:flex-row items-center justify-between gap-4 w-full sm:w-auto h-full'
          >
            <Button
              onClick={handleStartFreeClick}
              className='flex-1 inline-flex items-center bg-[#00b7eb] cursor-pointer hover:bg-[#0084ff] text-white font-semibold py-3 px-6 text-base transition-all duration-300 hero-btn'
              data-gsap='primary'
            >
              Get Started Free <ArrowRight className='ml-2' />
            </Button>

            <Button
              onClick={handleStartFreeClick}
              variant='outline'
              className='flex-1 inline-flex items-center bg-transparent cursor-pointer border border-[#00b7eb] text-[#00b7eb] hover:bg-[#0084ff] hover:text-white hover:border-[#0084ff] font-semibold py-3 px-6 text-base transition-all duration-300 hero-btn'
              data-gsap='outline'
            >
              Book a Demo <ChevronRight className='ml-2' />
            </Button>
          </div>

          <div
            ref={iconsRef}
            className='flex flex-wrap gap-4 mt-4 justify-center lg:justify-start'
          >
            <IconWithLabel
              icon={<Truck className='w-6 h-6' />}
              color='blue'
              label='Real-time Tracking'
            />
            <IconWithLabel
              icon={<Package className='w-6 h-6' />}
              color='cyan'
              label='Smart Delivery'
            />
            <IconWithLabel
              icon={<Clock className='w-6 h-6' />}
              color='orange'
              label='Time Savings'
            />
          </div>
        </section>
        <section
          ref={imageRef}
          className='w-full relative flex justify-center lg:justify-end items-center z-5'
        >
          <div className='absolute w-[3700px] h-[90vh] bottom-[-700px] left-[-1625px] md:left-[-1600px] md:bottom-[-270px] lg:left-[-1400px] mx-auto z-5'>
            <HeroExperience />
          </div>
        </section>
      </div>

      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0d111c] z-10 pointer-events-none' />

      {webGLError && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white z-20'>
          Your browser does not support WebGL. Please try a different browser or
          update your graphics drivers.
        </div>
      )}
    </div>
  );
};

export default Hero;
