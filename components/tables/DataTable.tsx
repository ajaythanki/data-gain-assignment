'use client';

import { useState, useMemo } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSort, deleteItem } from '@/store/features/tableSlice';
import { TableItem, TableColumn } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Download, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TableItemForm from '@/components/forms/TableItemForm';
import TablePagination from './TablePagination';
import { Dialog } from '@/components/ui/dialog';

interface DataTableProps {
  columns: TableColumn[];
}

const DataTable = ({ columns }: DataTableProps) => {
  const dispatch = useAppDispatch();
  const { filteredItems, sort, pagination } = useAppSelector((state) => state.table);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const currentItems = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    return filteredItems.slice(startIndex, startIndex + pagination.pageSize);
  }, [filteredItems, pagination.page, pagination.pageSize]);

  const handleSort = (column: string) => {
    const newDirection = sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ column, direction: newDirection }));
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map((item) => item.id));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEdit = (item: TableItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="w-full overflow-auto rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedRows.length === currentItems.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500"
                >
                  {column.sortable ? (
                    <button
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort(column.accessor)}
                    >
                      <span>{column.label}</span>
                      <span className="flex flex-col">
                        <ChevronUp
                          size={14}
                          className={cn(
                            'text-muted-foreground transition-colors',
                            sort.column === column.accessor && sort.direction === 'asc'
                              ? 'text-primary'
                              : 'opacity-50'
                          )}
                        />
                        <ChevronDown
                          size={14}
                          className={cn(
                            'text-muted-foreground -mt-1 transition-colors',
                            sort.column === column.accessor && sort.direction === 'desc'
                              ? 'text-primary'
                              : 'opacity-50'
                          )}
                        />
                      </span>
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              <th className="w-12 px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedRows.includes(item.id)}
                    onCheckedChange={() => handleSelectRow(item.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td key={`${item.id}-${column.id}`} className="px-4 py-3 text-sm text-gray-900">
                    {column.render
                      ? column.render(item[column.accessor], item)
                      : item[column.accessor]}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="capitalize" onClick={() => handleEdit(item)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem className="capitalize">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        {selectedItem && <TableItemForm item={selectedItem} onClose={handleFormClose} />}
      </Dialog>
    </div>
  );
};

export default DataTable;
