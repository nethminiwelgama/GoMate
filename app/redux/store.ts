import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type SampleState = { 
  value: string;
  user: {
    name: string;
    email: string;
  } | null;
};

const initialState: SampleState = { 
  value: 'hello',
  user: null
};

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setUser(state, action: PayloadAction<{ name: string; email: string } | null>) {
      state.user = action.payload;
    },
  },
});

export const { setValue, setUser } = sampleSlice.actions;

export const store = configureStore({
  reducer: {
    sample: sampleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;