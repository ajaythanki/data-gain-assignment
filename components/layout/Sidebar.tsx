'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleSidebar } from '@/store/features/sidebarSlice';
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderOpen,
  FileCheck,
  FileSpreadsheet,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: Users,
    path: '/accounts',
  },
  {
    id: 'batches',
    label: 'Batches',
    icon: FolderOpen,
    path: '/batches',
  },
  {
    id: 'resolution',
    label: 'Resolution',
    icon: FileCheck,
    path: '/resolution',
  },
  {
    id: 'assessments',
    label: 'Assessments',
    icon: FileSpreadsheet,
    path: '/assessments',
  },
  {
    id: 'appeal-letter',
    label: 'Appeal Letter',
    icon: FileText,
    path: '/appeal-letter',
  },
  {
    id: 'summary',
    label: 'Summary',
    icon: FileText,
    path: '/summary',
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const expanded = useAppSelector((state) => state.sidebar.expanded);
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div
      className={`fixed left-5 top-10 z-30 flex h-[85vh] mt-16 flex-col bg-[#1B2B3F] text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
        expanded ? 'w-[212px]' : 'w-16'
      }`}
    >
      <nav className="flex-1 space-y-2 px-2 py-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                'flex items-center rounded-md px-3 py-4 text-sm font-medium transition-colors',
                isActive ? 'bg-[#FFFFFF33]' : 'text-gray-300 hover:bg-[#FFFFFF33] hover:text-white',
                !expanded && 'justify-center'
              )}
              title={!expanded ? item.label : undefined}
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 ${expanded ? 'mr-3' : ''}`} />
              {expanded && (
                <span className="whitespace-nowrap overflow-hidden transition-opacity duration-300">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-700 p-4">
        <Link
          href="/settings"
          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-[#40E0D0]/5 hover:text-[#40E0D0] ${
            !expanded ? 'justify-center' : ''
          }`}
          title={!expanded ? 'Settings' : undefined}
        >
          <Settings className={`h-5 w-5 flex-shrink-0 ${expanded ? 'mr-3' : ''}`} />
          {expanded && <span className="transition-opacity duration-300">Settings</span>}
        </Link>
        <button
          className={`mt-2 flex w-full items-center rounded-md bg-[#40E0D0] px-3 py-2 text-sm font-medium text-[#1B2B3F] transition-colors hover:bg-[#40E0D0]/90 ${
            !expanded ? 'justify-center' : ''
          }`}
          title={!expanded ? 'Logout' : undefined}
        >
          <LogOut className={`h-5 w-5 flex-shrink-0 ${expanded ? 'mr-3' : ''}`} />
          {expanded && <span className="transition-opacity duration-300">Logout</span>}
        </button>
      </div>
      <div
        className="absolute top-0 -right-4 flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-xl cursor-pointer transition-all duration-300 hover:shadow-md"
        onClick={() => dispatch(toggleSidebar())}
      >
        <ChevronRight
          className={`transition-transform duration-300 text-[#40E0D0] ${expanded ? 'rotate-180' : ''}`}
          size={22}
        />
      </div>
    </div>
  );
};

export default Sidebar;
