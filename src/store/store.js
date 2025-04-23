'use client';
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});
