import { ChartColumnIncreasing } from 'lucide-react';
import CardWithLabelIcon from './ui/CardWithLabelIcon';
import { Bell } from 'lucide-react';
import { CloudOff } from 'lucide-react';
import { Code } from 'lucide-react';
import { ClockArrowUp } from 'lucide-react';
import { Map } from 'lucide-react';
import { Compass } from 'lucide-react';
import { CloudCog } from 'lucide-react';
import { Users } from 'lucide-react';
import SectionNames from './ui/SectionNames';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const titleRef1 = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (titleRef1.current?.children) {
      gsap.fromTo(
        titleRef1.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power1.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: titleRef1?.current,
            start: 'top 80%',
            end: 'bottom 5%',
            toggleActions: 'play reverse play stop',
            once: false,
          },
        }
      );
    }
  }, []);

  useGSAP(() => {
    if (cardsRef.current?.children) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, []);

  return (
    <div
      id='features'
      className='w-full max-w-[1128px] mx-auto mt-20 p-4 bg-[#Fefefe]'
    >
      <section
        ref={titleRef1}
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
        className=' flex flex-wrap gap-7 justify-center items-center'
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
