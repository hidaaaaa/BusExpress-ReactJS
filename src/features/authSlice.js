import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from 'api/authApi';

export const register = createAsyncThunk('user/register', async (payload) => {
	//call api
	const data = await authApi.register(payload);

	//save to local storage
	localStorage.setItem('access_token', data.token);
	localStorage.setItem('user', JSON.stringify(data.info));

	return data.info;
});

export const login = createAsyncThunk('user/login', async (payload) => {
	//call api
	const data = await authApi.login(payload);
	//save to local storage
	localStorage.setItem('access_token', data.token);
	localStorage.setItem('user', JSON.stringify(data.info));

	return data.info;
});

const authSlice = createSlice({
	name: 'user',
	initialState: {
		current: JSON.parse(localStorage.getItem('user')) || {},
		settings: {},
	},
	reducers: {
		logout(state, action) {
			localStorage.removeItem('user');
			localStorage.removeItem('access_token');

			state.current = {};
		},
	},
	extraReducers: {
		[register.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
		[login.fulfilled]: (state, action) => {
			state.current = action.payload;
		},
	},
});

const { actions, reducer } = authSlice;
export const { logout } = actions;
export default reducer;
