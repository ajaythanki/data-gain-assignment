'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/tables/DataTable';
import TableActions from '@/components/tables/TableActions';
import { TableColumn } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import TablePagination from '@/components/tables/TablePagination';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setPagination } from '@/store/features/tableSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export default function Home() {
  const { pagination } = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();

  const columns: TableColumn[] = useMemo(
    () => [
      {
        id: 'name',
        label: 'Name',
        accessor: 'name',
        sortable: true,
      },
      {
        id: 'category',
        label: 'Category',
        accessor: 'category',
        sortable: true,
      },
      {
        id: 'status',
        label: 'Status',
        accessor: 'status',
        sortable: true,
        render: (value) => {
          const statusColors = {
            Active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
            Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
            Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
            Archived: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
          };

          return (
            <Badge
              variant="outline"
              className={cn('font-medium', statusColors[value as keyof typeof statusColors])}
            >
              {value}
            </Badge>
          );
        },
      },
      {
        id: 'date',
        label: 'Date',
        accessor: 'date',
        sortable: true,
        render: (value) => format(new Date(value), 'MMM d, yyyy'),
      },
      {
        id: 'amount',
        label: 'Amount',
        accessor: 'amount',
        sortable: true,
        render: (value) => `$${value.toFixed(2)}`,
      },
    ],
    []
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    dispatch(setPagination({ pageSize: newPageSize, page: 1 }));
  };
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between px-6">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-medium text-gray-800">Appeal Letter</h1>
              <div className="ml-2 bg-[#f87171] text-white text-xs font-medium rounded-full px-2 py-0.5">
                05
              </div>
            </div>
            <Separator orientation="horizontal" className="h-1 rounded-sm bg-[#3FC3AC]" />
          </div>
        </div>
        <Card className="bg-white shadow-md p-6 pb-0">
          <div className="flex flex-col  items-center justify-between h-[65vh]">
            <div className="ml-auto w-full max-w-4xl">
              <TableActions />
            </div>
            <DataTable columns={columns} />
          </div>
          <TablePagination
            currentPage={pagination.page}
            pageSize={pagination.pageSize}
            totalItems={pagination.total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Card>
      </div>
    </Layout>
  );
}
