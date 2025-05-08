'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks/useAppSelector';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const expanded = useAppSelector((state) => state.sidebar.expanded);

  useEffect(() => {
    if (expanded && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [expanded]);

  return (
    <div className="flex p-5 min-h-screen bg-background">
      <Header />
      <div
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          expanded ? 'ml-64' : 'ml-16'
        )}
      >
        <main className="mt-24 px-6">
          <Sidebar />
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
