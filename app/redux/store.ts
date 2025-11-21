import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type SampleState = { value: string };

const initialState: SampleState = { value: 'hello' };

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setValue } = sampleSlice.actions;

export const store = configureStore({
  reducer: {
    sample: sampleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
