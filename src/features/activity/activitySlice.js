import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getActivity, initialActivity } from "services/firebase/ferestore/firestore"

const initialState = {
  activity: [],
  error: null,
  status: 'idle'
}

export const createActivity = createAsyncThunk('activity/create', async (userId, { rejectWithValue }) => {
  try {
    const activity = await initialActivity(userId)
    return activity
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const activityFetch = createAsyncThunk('activity/fetch', async ({userId, date}, { rejectWithValue }) => {
  try {
    const activity = await getActivity(userId, date)
    return activity
  } catch (err) {
    return rejectWithValue(err)
  }
})

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    previousMonthCurrent: (state, action) => {
      state.activity[action.payload].current = true
      state.activity[action.payload + 1].current = false
    },
    nextMonthCurrent: (state, action) => {
      state.activity[action.payload].current = true
      state.activity[action.payload - 1].current = false
    },
    clearActivity: (state) => {
      state.activity = []
      state.status = "idle"
    } 
  },
  extraReducers: builder => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.activity.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'failed'
      })
      .addCase(activityFetch.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(activityFetch.fulfilled, (state, action) => {
        state.activity = action.payload
        state.status = 'succeeded'
      })
      .addCase(activityFetch.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'failed'
      })
  }
})

export default activitySlice.reducer
export const { previousMonthCurrent, nextMonthCurrent, clearActivity } = activitySlice.actions

export const statusActivity = state => state.activity.status
export const activity = state => state.activity.activity
export const currentActivity = state => state.activity.activity.find(el => el.current)
