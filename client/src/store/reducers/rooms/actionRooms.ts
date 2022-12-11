import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/api";

export const getCurrentRooms = createAsyncThunk(
    'rooms/getCurrentRooms',
    async (params: { id: string }) => {
      const response = await api.get(`api/rooms/${params.id}`);
      return { response, params };
    }
  );

export const getAllRooms = createAsyncThunk(
    'rooms/getAllRooms',
    async () => {
        const response = await api.get(`api/rooms`)
        return {response}
    }
)