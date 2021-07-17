import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from 'api/authApi';

export const register = createAsyncThunk('user/register', async (payload) => {
	//call api
	const data = await authApi.register(payload);

	//save to local storage
	localStorage.setItem('access_token', data.token);
	localStorage.setItem('user', JSON.stringify(data.user));

	return data.user;
});

const authSlice = createSlice({
	name: 'user',
	initialState: {
		current: {},
		settings: {},
	},
	reducers: {},
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
	},
});

const { reducer } = authSlice;
export default reducer;
