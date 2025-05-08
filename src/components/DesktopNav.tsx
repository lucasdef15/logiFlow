import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bell, LogIn } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PopOverComp from './ui/PopOverComp';

type Notification = {
  id: React.Key | null | undefined;
  title: string;
  message: string;
  timestamp: Date;
};

interface DesktopNavProps {
  hasNotifications: boolean;
  notifications: Notification[];
}

const DesktopNav = ({ hasNotifications, notifications }: DesktopNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
        setIsPopoverOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsPopoverOpen(false);
    setIsDialogOpen(true);
  };
  return (
    <>
      <nav className='hidden sm:flex flex-row'>
        <ul className='flex flex-row justify-center items-center gap-4 text-[.9rem] text-[var(--muted-foreground)] font-medium'>
          <li className='relative group cursor-pointer transition-colors duration-300 hover:text-[var(--primary)]'>
            Home
            <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
          </li>
          <a href='#features'>
            <li className='relative group cursor-pointer transition-colors duration-300 hover:text-[var(--primary)]'>
              Features
              <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
            </li>
          </a>
          <a href='#pricing'>
            <li className='relative group cursor-pointer transition-colors duration-300 hover:text-[var(--primary)]'>
              Pricing
              <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
            </li>
          </a>
          <li className='relative group cursor-pointer transition-colors duration-300 hover:text-[var(--primary)]'>
            Contact
            <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
          </li>
          <li className='relative group cursor-pointer transition-colors duration-300 hover:text-[var(--primary)]'>
            Dashboard
            <span className='absolute left-0 -bottom-[2px] w-full h-[2px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left'></span>
          </li>
        </ul>
      </nav>

      <section className='hidden sm:flex items-center justify-center gap-5 mt-4 sm:mt-0'>
        {/* Notification Popover */}
        <PopOverComp
          notifications={notifications}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          hasNotifications={hasNotifications}
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          handleNotificationClick={handleNotificationClick}
        />

        {/* Notification Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedNotification?.title}</DialogTitle>
              <DialogDescription>
                {selectedNotification?.message}
                <br />
                <span className='text-xs text-muted-foreground block mt-2'>
                  {selectedNotification?.timestamp &&
                    formatDistanceToNow(selectedNotification.timestamp, {
                      addSuffix: true,
                    })}
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button className='cursor-pointer bg-blue-600 text-[var(--card)] hover:bg-blue-400 transition-colors duration-300 ease-in-out'>
          <LogIn /> Login
        </Button>
      </section>
    </>
  );
};

export default DesktopNav;
