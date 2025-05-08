'use client';

import { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSearchTerm, addItem } from '@/store/features/tableSlice';
import {
  Search,
  Download,
  MoreVertical,
  Share,
  SlidersVertical,
  Plus,
  PlusCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import TableItemForm from '@/components/forms/TableItemForm';

const TableActions = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.table.searchTerm);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="py-4 flex flex-1 max-w-4xl justify-between items-center">
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by Property, Jurisdiction, Parcel Number or Client"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="pl-9 pr-4"
          />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <SlidersVertical className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="capitalize" onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize">
              <Download className="w-4 h-4 mr-2" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <TableItemForm onClose={() => setIsFormOpen(false)} />
      </Dialog>
    </div>
  );
};

export default TableActions;
