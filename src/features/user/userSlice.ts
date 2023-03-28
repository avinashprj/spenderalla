import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeCurrency, createUser, getUser } from "services/firebase/ferestore/firestore";
import { Currency, Email, Error, IUser, Status, UID, UserID } from "types/types";

interface IState {
  user: IUser;
  status: Status;
  error: Error;
}

const initialState: IState = {
  user: { currency: '', email: '', userId: '' },
  status: 'idle',
  error: null
}

export const initUser = createAsyncThunk('user/createUser', async ({ uid, email }: { uid: UID; email: Email }, { rejectWithValue }) => {
  try {
    const user = await createUser({ uid, email })
    return user
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const fetchUser = createAsyncThunk('user/fetchUser', async (uid: UID, { rejectWithValue }) => {
  try {
    const data = await getUser(uid)
    return data
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const currencyChange = createAsyncThunk('user/currency', async ({userId, currency}: {userId: UserID; currency: Currency}, { rejectWithValue }) => {
  try {
    const data = await changeCurrency(userId, currency)
    return data
  } catch (err) {
    return rejectWithValue(err)
  }
})


export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {userId: "", currency: "", email: ""}
      state.status = "idle"
    }
  },
  extraReducers: builder => {
    builder
      .addCase(initUser.pending, (state) => {
        state.error = null;
        state.status = 'loading'
      })
      .addCase(initUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = 'succeeded'
      })
      .addCase(initUser.rejected, (state, action) => {
        state.error = action.payload as null
        state.status = 'failed'
      })
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as null
        state.status = 'failed'
      })
      .addCase(currencyChange.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(currencyChange.fulfilled, (state, action) => {
        state.user.currency = action.payload
        state.status = 'succeeded'
      })
      .addCase(currencyChange.rejected, (state, action) => {
        state.error = action.payload as null
        state.status = 'failed'
      })
  }
})

export default userSlice.reducer
export const { clearUser } = userSlice.actions

export const statusUser = state => state.user.status
export const user = state => state.user.user