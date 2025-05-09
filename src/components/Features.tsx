import { ChartColumnIncreasing } from 'lucide-react';
import CardWithLabelIcon from './ui/CardWithLabelIcon';
import {
  Bell,
  CloudOff,
  Code,
  ClockArrowUp,
  Map,
  Compass,
  CloudCog,
  Users,
} from 'lucide-react';
import SectionNames from './ui/SectionNames';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Title section animation (staggered entrance with subtle lift)
      tl.fromTo(
        titleRef.current?.children ? Array.from(titleRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.inOut',
          stagger: 0.15,
        }
      );

      // Cards animation (staggered entrance with scale and slight rotation)
      tl.fromTo(
        Array.from(cardsRef.current?.children || []),
        { opacity: 0, y: 40, scale: 0.95, rotationX: 5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          stagger: 0.1,
        },
        '-=0.4'
      );

      // Card hover effects
      const ctx = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(cardsRef.current?.children || [])
          .forEach((card) => {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                scale: 1.03,
                y: -5,
                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out',
              });
            });

            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                scale: 1,
                y: 0,
                boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
                duration: 0.3,
                ease: 'power2.out',
              });
            });
          });
      }, cardsRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id='features'
      className='w-full max-w-[1128px] mx-auto mt-20 p-4 bg-[#Fefefe]'
    >
      <section
        ref={titleRef}
        className='flex flex-col items-center justify-center text-center gap-1 mb-15'
      >
        <SectionNames sectionName='Features' />
        <h2 className='font-bold text-3xl mb-3'>
          Everything you need to manage logistics
        </h2>
        <p className='w-full max-w-[550px] mx-auto text-[.9rem] text-[var(--text-muted-soft)] font-medium leading-[1.2]'>
          Track Flow combines powerful functionality with ease of use to create
          the perfect solution for businesses of any size.
        </p>
      </section>

      <section
        ref={cardsRef}
        className='flex flex-wrap gap-7 justify-center items-center'
      >
        <CardWithLabelIcon
          icon={<ChartColumnIncreasing />}
          color='blue'
          title='Intelligent Dashboard'
          description='Centralized overview of all logistics operations with customizable KPIs and real-time updates.'
        />
        <CardWithLabelIcon
          icon={<Bell />}
          color='cyan'
          title='Automatic Notifications'
          description='Stay informed with instant alerts for delays, completions, and other critical events.'
        />
        <CardWithLabelIcon
          icon={<CloudOff />}
          color='orange'
          title='Offline Mode'
          description='Delivery drivers can continue working without interruption even when connectivity is lost.'
        />
        <CardWithLabelIcon
          icon={<Code />}
          color='blue'
          title='API Integration'
          description='Seamlessly connect with your existing systems and third-party services.'
        />
        <CardWithLabelIcon
          icon={<ClockArrowUp />}
          color='cyan'
          title='Route History'
          description='Comprehensive records of all deliveries for auditing and performance analysis.'
        />
        <CardWithLabelIcon
          icon={<Map />}
          color='orange'
          title='Real-time Visualization'
          description='Interactive maps showing vehicle locations, delivery status, and traffic conditions.'
        />
        <CardWithLabelIcon
          icon={<Compass />}
          color='blue'
          title='AI Route Optimization'
          description='Smart algorithms that calculate the most efficient routes based on multiple factors.'
        />
        <CardWithLabelIcon
          icon={<CloudCog />}
          color='cyan'
          title='Cloud-based Platform'
          description='Access your logistics data from anywhere, with automatic backups and updates.'
        />
        <CardWithLabelIcon
          icon={<Users />}
          color='orange'
          title='Team Management'
          description='Assign tasks, monitor performance, and manage your entire delivery team.'
        />
      </section>
    </div>
  );
};

export default Features;
