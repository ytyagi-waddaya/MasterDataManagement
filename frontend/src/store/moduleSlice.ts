import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModuleUpdatedPayload {
  moduleId: string;
  name?: string;
}

interface ModuleState {
  updatedEvent: ModuleUpdatedPayload | null;
}

const initialState: ModuleState = {
  updatedEvent: null,
};

const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    moduleUpdated: (state, action: PayloadAction<ModuleUpdatedPayload>) => {
      state.updatedEvent = action.payload;
    },
  },
});

export const { moduleUpdated } = moduleSlice.actions;
export default moduleSlice.reducer;
