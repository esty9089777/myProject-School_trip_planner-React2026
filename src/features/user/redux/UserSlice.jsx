import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi } from './api';

// יצירת פעולה אסינכרונית לרישום משתמש
export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      return data; // המידע הזה יעבור ל-fulfilled
    } catch (error) {
      return rejectWithValue(error.message); // המידע יעבור ל-rejected
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    // פונקציה לאיפוס מצב ההרשמה (למשל כשעוזבים את העמוד)
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentUser = action.payload; // שמירת המשתמש הרשום בסטייט
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload; // שמירת הודעת השגיאה בסטייט
      });
  }
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;