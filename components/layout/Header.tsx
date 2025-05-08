'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell, ChevronDown, Search, Grid, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Input } from '../ui/input';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="fixed top-0 transition-all duration-300 ease-in-out bg-[#F6F7F8] backdrop-blur-md flex items-center justify-between w-full h-16">
      <header
        className={cn(
          'mt-5 h-16 border-b bg-white border-gray-200 py-3 px-6 flex items-center justify-between rounded-xl shadow-lg',
          'w-[calc(100%-20px)]'
        )}
      >
        {/* Logo section */}
        <div className="flex h-16 items-center px-4">
          <span className="hidden sm:block">
            <Image src="./logo.png" alt="Property Tax Logo" width={158} height={36} />
          </span>
          <span className="block sm:hidden">
            <Image src="./logo.png" alt="Property Tax Logo" width={100} height={24} />
          </span>
        </div>

        {/* Mobile menu button - only visible on small screens */}
        <button className="block md:hidden ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Client workspace section - hidden on smallest screens */}
        <div className="hidden sm:flex items-center">
          <span className="text-gray-700 mr-2 text-sm md:text-base">Client Workspace:</span>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs mr-1">
              C
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Search and icons section */}
        <div
          className={cn(
            'flex items-center',
            mobileMenuOpen
              ? 'flex-col absolute top-16 left-0 right-0 bg-white shadow-lg z-50 p-4 space-y-4'
              : '',
            'md:flex-row'
          )}
        >
          <div
            className={cn(
              'relative mr-0 md:mr-6 w-full',
              mobileMenuOpen ? 'block' : 'hidden md:block'
            )}
          >
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search"
              className="pl-9 h-9 w-full md:w-[200px] bg-gray-50 border-gray-200"
            />
          </div>

          <div
            className={cn(
              'flex items-center space-x-4',
              mobileMenuOpen ? 'flex w-full justify-end pt-2' : ''
            )}
          >
            <div className="hidden sm:flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs mr-1">
                C
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                AK
              </div>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <Grid className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
