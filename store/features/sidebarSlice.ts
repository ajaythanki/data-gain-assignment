import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  expanded: boolean;
}

const initialState: SidebarState = {
  expanded: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.expanded = !state.expanded;
    },
    setSidebarExpanded: (state, action: PayloadAction<boolean>) => {
      state.expanded = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarExpanded } = sidebarSlice.actions;

export default sidebarSlice.reducer;
