import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    initialCandidates: [],
    approvedCandidates: [],
    rejectedCandidates: [],
  },
  reducers: {
    loadInitialCandidates: (state, action) => {
      state.initialCandidates = action.payload;
    },
    addCandidate: (state, action) => {
      state.initialCandidates.push(action.payload);
    },
    loadApprovedCandidates: (state, action) => {
      state.approvedCandidates = action.payload;
    },
    loadRejectedCandidates: (state, action) => {
      state.rejectedCandidates = action.payload;
    },
    approveCandidate: (state, action) => {
      state.initialCandidates = state.initialCandidates.filter(
        candidate => candidate.id !== action.payload.oldCandidate.id
      );
      state.approvedCandidates.unshift(action.payload.payload);
    },

    rejectCandidate: (state, action) => {
      state.initialCandidates = state.initialCandidates.filter(
        candidate => candidate.id !== action.payload.oldCandidate.id
      );
      state.rejectedCandidates.unshift(action.payload.payload);
    }

  },
});

export const candidateAction = candidateSlice.actions;
export default candidateSlice.reducer;
