import { useEffect, useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

type Notification = {
  id: number;
  title: string;
  message: string;
  type?: string;
  read?: boolean;
  timestamp?: string;
};

const Header = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('/data/notifications.json')
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  const hasNotifications = notifications.length > 0;

  return (
    <header className='bg-[var(--card)] w-full shadow-lg'>
      <nav className='bg-[var(--card)]  w-full max-w-[1128px] mx-auto flex  flex-row justify-between p-4'>
        <section className='flex items-center justify-center gap-2 '>
          <img
            className='max-w-[30px]'
            src='/assets/images/logo.svg'
            alt='logo svg'
          />
          <div className='font-sans tracking-wide'>
            <span className='text-blue-600 font-bold'>Log</span>
            <span className='text-blue-300 font-bold'>Flow</span>
          </div>
        </section>
        <DesktopNav
          hasNotifications={hasNotifications}
          notifications={notifications}
        />
        <MobileNav
          notifications={notifications}
          hasNotifications={hasNotifications}
        />
      </nav>
    </header>
  );
};

export default Header;
