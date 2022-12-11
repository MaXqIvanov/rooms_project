import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../plugins/api';
import { HeadersDefaults } from 'axios';
import { getAllRooms, getCurrentRooms } from './actionRooms';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}
export interface User {
  _id: string;
  name: string;
  production_time: number;
  warranty_obligations: number;
  terms_of_payment: number;
  lot_price: number;
}
export interface IRoom {
  _id: string;
  name: string;
  title: string;
  users: User[];
  current_user: number;
  __v: number;
}
interface IRoomSlice{
  rooms: IRoom | object[],
  current_room: IRoom,
  current_time: number,
  current_user_index: number,
  loading: boolean,
}

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    current_room: {} as IRoom,
    current_time: 0,
    current_user_index: 0,
    loading: true,
  },
  reducers: {
    changeCurrentTime(state: IRoomSlice){
      if(state.current_time >= 120){
        state.current_time = 0
        if(state.current_user_index === state.current_room.users.length - 1){
          state.current_user_index = 0
        }else {
          state.current_user_index += 1;
        }
      }else{
        state.current_time = state.current_time + 1
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentRooms.pending, (state: IRoomSlice, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(getCurrentRooms.fulfilled, (state: IRoomSlice, { payload }: PayloadAction<any>) => {
      console.log(payload)
      state.loading = false
      state.current_time = payload.response.data.time
      state.current_room = payload.response.data.room
      state.current_user_index = payload.response.data.user
    });
    builder.addCase(getCurrentRooms.rejected, (state: IRoomSlice) => {
      state.loading = false;
    });
    // getAllRooms
    builder.addCase(getAllRooms.pending, (state: IRoomSlice, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(getAllRooms.fulfilled, (state: IRoomSlice, { payload }: PayloadAction<any>) => {
      console.log(payload)
      state.loading = false
      state.rooms = payload.response.data
    });
    builder.addCase(getAllRooms.rejected, (state: IRoomSlice) => {
      state.loading = false;
    });
  },
});

export default RoomsSlice.reducer;
export const { changeCurrentTime } = RoomsSlice.actions;