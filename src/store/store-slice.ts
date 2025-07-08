import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SeedState {
  seedPhrase: string[];
}

const initialState: SeedState = {
  seedPhrase: [],
};

export const seedSlice = createSlice({
  name: "seed",
  initialState,
  reducers: {
    createSeed: (state, action: PayloadAction<{ seedPhrase: string[] }>) => {
      state.seedPhrase = action.payload.seedPhrase;
    },
  },
});

// Action creators are generated for each case reducer function
export const {createSeed} = seedSlice.actions;

export default seedSlice.reducer;
