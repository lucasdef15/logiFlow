import { useState } from 'react';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import PopOverComp from './ui/PopOverComp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/Theme-provider';
import { Moon, Sun } from 'lucide-react';

type Notification = {
  id: React.Key | null | undefined;
  title: string;
  message: string;
  timestamp: Date;
};

interface DesktopNavProps {
  hasNotifications: boolean;
  notifications: Notification[];
  className?: string;
}

const DesktopNav = ({
  // hasNotifications,
  // notifications,
  className,
}: DesktopNavProps) => {
  const [_isOpen, _setIsOpen] = useState(false);
  const [_isPopoverOpen, _setIsPopoverOpen] = useState(false);
  const [_selectedNotification, _setSelectedNotification] =
    useState<Notification | null>(null);
  const [_isDialogOpen, _setIsDialogOpen] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 768) {
  //       _setIsOpen(false);
  //       _setIsPopoverOpen(false);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // const handleNotificationClick = (notification: Notification) => {
  //   setSelectedNotification(notification);
  //   setIsPopoverOpen(false);
  //   setIsDialogOpen(true);
  // };

  const location = useLocation();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === '/') {
      const hero = document.getElementById('top');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <nav className='hidden sm:flex flex-row'>
        <ul
          className={`flex flex-row justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 ${className}`}
        >
          <li
            onClick={handleClick}
            className='relative group cursor-pointer transition-transform duration-300 hover:scale-105'
          >
            Home
            <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
          </li>
          <a href='#features'>
            <li className='relative group cursor-pointer transition-transform duration-300 hover:scale-105'>
              Features
              <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
            </li>
          </a>
          <a href='#pricing'>
            <li className='relative group cursor-pointer transition-transform duration-300 hover:scale-105'>
              Pricing
              <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
            </li>
          </a>
          <Link to={'contact'}>
            <li className='relative group cursor-pointer transition-transform duration-300 hover:scale-105'>
              Contact
              <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
            </li>
          </Link>
          <Link to={'about'}>
            <li className='relative group cursor-pointer transition-transform duration-300 hover:scale-105'>
              About
              <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
            </li>
          </Link>
        </ul>
      </nav>

      <section className='hidden sm:flex items-center justify-center gap-5'>
        {/* Notification Popover */}
        {/* <PopOverComp
          notifications={notifications}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          hasNotifications={hasNotifications}
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          handleNotificationClick={handleNotificationClick}
          className='bg-[#0f0f1b] border-blue-500/30 text-gray-200 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
        /> */}

        {/* Notification Dialog */}
        {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className='bg-[#0f0f1b] border-blue-500/30 text-gray-200 p-2 sm:p-4 shadow-[0_0_8px_rgba(59,130,246,0.3)]'>
            <DialogHeader>
              <DialogTitle className='text-blue-300 text-sm sm:text-base'>
                {selectedNotification?.title}
              </DialogTitle>
              <DialogDescription className='text-gray-200 text-xs sm:text-sm'>
                {selectedNotification?.message}
                <br />
                <span className='text-blue-400 text-xs block mt-2'>
                  {selectedNotification?.timestamp &&
                    formatDistanceToNow(selectedNotification.timestamp, {
                      addSuffix: true,
                    })}
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}

        <section className='flex items-center justify-center gap-5'>
          <div>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition'
              aria-label='Toggle theme'
            >
              {theme === 'dark' ? (
                <Sun className='w-5 h-5' />
              ) : (
                <Moon className='w-5 h-5' />
              )}
            </button>
          </div>
          <Button
            onClick={() => navigate('/login')}
            className='cursor-pointer bg-[#00b7eb] text-white hover:bg-[#0084ff] shadow-[0_0_6px_rgba(59,130,246,0.5)] hover:shadow-[0_0_10px_rgba(59,130,246,0.7)] transition-all duration-300 ease-in-out hover:scale-105'
          >
            <LogIn className='w-4 h-4 mr-2' /> Login
          </Button>
        </section>
      </section>
    </>
  );
};

export default DesktopNav;
