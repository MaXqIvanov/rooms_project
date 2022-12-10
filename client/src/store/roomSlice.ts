import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/api';
import { HeadersDefaults } from 'axios';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getRooms = createAsyncThunk(
  'rooms/getRooms',
  async (params: { login: string; password: string; nav: CallableFunction }) => {
    const response = await api.post(`accounts/auth/`, {
      login: params.login,
      password: params.password,
    });
    return { response, params };
  }
);

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    loading: true as boolean,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getRooms.pending, (state: any, action: PayloadAction) => {
      if (state.first_render) {
        state.loading = true;
      }
    });
    builder.addCase(getRooms.fulfilled, (state: any, { payload }: PayloadAction<any>) => {
        state.loading = false
    });
    builder.addCase(getRooms.rejected, (state: any) => {
      state.loading = false;
    });
  },
});

export default RoomsSlice.reducer;
export const { } = RoomsSlice.actions;