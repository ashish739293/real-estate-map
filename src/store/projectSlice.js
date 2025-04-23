// store/projectSlice.js
'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],        // ← renamed from `projects`
  loading: true,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.list = action.payload;   // ← here, too
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProjects, setLoading } = projectsSlice.actions;
export default projectsSlice.reducer;
