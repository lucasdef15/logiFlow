import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogIn, Menu } from 'lucide-react';
import { Button } from './ui/button';
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

interface MobileNavProps {
  hasNotifications: boolean;
  notifications: Notification[];
}

const MobileNav = ({ hasNotifications, notifications }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsPopoverOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <div className='relative flex gap-5 sm:hidden'>
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

      {/* Mobile Nav Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          onClick={handleOpen}
          className='cursor-pointer bg-blue-50 p-2 rounded-full md:hidden'
        >
          <Menu size={24} />
        </SheetTrigger>

        <SheetContent className='sm:max-w-xs'>
          <SheetHeader>
            <div className='flex justify-start gap-4 items-center'>
              <SheetTitle className='text-lg font-semibold'>Menu</SheetTitle>
              <Button
                className='p-2 rounded-full cursor-pointer bg-blue-600 text-white hover:bg-blue-400 transition-colors duration-300 ease-in-out'
                onClick={handleClose}
              >
                <LogIn size={20} />
              </Button>
            </div>
          </SheetHeader>
          <SheetDescription>
            <nav>
              <ul className='flex flex-col justify-center items-center gap-6 text-lg text-[var(--muted-foreground)] font-medium'>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Home
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Features
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Pricing
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Contact
                </li>
                <li
                  onClick={handleClose}
                  className='cursor-pointer hover:text-blue-600 transition'
                >
                  Dashboard
                </li>
              </ul>
            </nav>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
