import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableItem, SortState, PaginationState } from '@/lib/types';

// Mock data for initial table content
const mockTableData: TableItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: `item-${i + 1}`,
  name: `Item ${i + 1}`,
  category: `Category ${(i % 5) + 1}`,
  status: ['Active', 'Inactive', 'Pending', 'Archived'][i % 4],
  date: new Date(2025, 0, i + 1).toISOString(),
  amount: Math.floor(Math.random() * 10000) / 100,
}));

interface TableState {
  items: TableItem[];
  filteredItems: TableItem[];
  searchTerm: string;
  sort: SortState;
  pagination: PaginationState;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  items: mockTableData,
  filteredItems: mockTableData,
  searchTerm: '',
  sort: {
    column: 'name',
    direction: 'asc',
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: mockTableData.length,
  },
  loading: false,
  error: null,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TableItem[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.pagination.total = action.payload.length;
    },
    addItem: (state, action: PayloadAction<TableItem>) => {
      state.items.push(action.payload);
      state.filteredItems = applyFilters(state);
      state.pagination.total = state.filteredItems.length;
    },
    updateItem: (state, action: PayloadAction<TableItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = applyFilters(state);
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.filteredItems = applyFilters(state);
      state.pagination.total = state.filteredItems.length;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredItems = applyFilters(state);
      state.pagination.total = state.filteredItems.length;
      state.pagination.page = 1;
    },
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
      state.filteredItems = applyFilters(state);
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Helper function to apply filters, sort, and search
const applyFilters = (state: TableState): TableItem[] => {
  // Apply search filter
  let result = state.items;

  if (state.searchTerm) {
    const searchLower = state.searchTerm.toLowerCase();
    result = result.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(searchLower))
    );
  }

  // Apply sorting
  result = [...result].sort((a, b) => {
    const aValue = a[state.sort.column];
    const bValue = b[state.sort.column];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return state.sort.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return state.sort.direction === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
  });

  return result;
};

export const {
  setItems,
  addItem,
  updateItem,
  deleteItem,
  setSearchTerm,
  setSort,
  setPagination,
  setLoading,
  setError,
} = tableSlice.actions;

export default tableSlice.reducer;
