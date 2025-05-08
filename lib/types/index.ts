// Common types used throughout the application

// Sidebar item type
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

// Table item type for generic data
export interface TableItem {
  id: string;
  [key: string]: any;
}

// Calendar event type
export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'event' | 'reminder';
  color?: string;
  description?: string;
}

// Table column definition
export interface TableColumn {
  id: string;
  label: string;
  accessor: string;
  sortable?: boolean;
  render?: (value: any, item: TableItem) => React.ReactNode;
}

// Sort direction type
export type SortDirection = 'asc' | 'desc';

// Sort state type
export interface SortState {
  column: string;
  direction: SortDirection;
}

// Pagination state type
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
