import { LocalUser } from '@comp/Dashboard/UserRow';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserSession {
  name: string | null;
  email: string;
  token: string;
}

type SesssionState = {
  user: UserSession | null;
  data: {
    users: LocalUser[];
  } | null;
  selectAll: boolean;
};

const initialState: SesssionState = {
  user: null,
  data: null,
  selectAll: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAuthSession(
      state: SesssionState,
      action: PayloadAction<{ user: UserSession | null }>
    ) {
      state.user = action.payload.user;
    },
    setSession(state: SesssionState, action: PayloadAction<{ data?: any }>) {
      state.data = action.payload.data;
    },
    setSelectAll(
      state: SesssionState,
      action: PayloadAction<{ selectAll: boolean }>
    ) {
      state.selectAll = action.payload.selectAll;
    },
    clearSession(state: SesssionState) {
      state.user = null;
      state.data = null;
    },
  },
});

export const { setAuthSession, setSession, setSelectAll, clearSession } =
  sessionSlice.actions;
export default sessionSlice.reducer;
