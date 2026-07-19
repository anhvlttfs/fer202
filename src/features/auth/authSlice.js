import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import md5 from "blueimp-md5";

const JSON_SERVER_URL = "http://localhost:5000";
const USER_COLLECTION = "user";
const AUTH_STORAGE_KEY = "authUser";

const loadStoredUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    return null;
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const passwordHash = md5(password || "");

    // Try hitting the json-server endpoint first
    try {
      const res = await fetch(
        `${JSON_SERVER_URL}/${USER_COLLECTION}?email=${encodeURIComponent(email)}`,
      );
      if (res.ok) {
        const users = await res.json();
        const user = Array.isArray(users)
          ? users.find((u) => u.email === email)
          : users[0];
        if (user && user.passwordHash === passwordHash)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        return thunkAPI.rejectWithValue("Invalid credentials");
      }
    } catch (e) {
      // ignore and fallback to local db
    }

    return thunkAPI.rejectWithValue("Invalid credentials");
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: loadStoredUser(), status: "idle", error: null },
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;

        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify(action.payload),
          );
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
