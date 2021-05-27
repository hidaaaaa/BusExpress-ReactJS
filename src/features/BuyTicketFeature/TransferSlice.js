const { createSlice } = require('@reduxjs/toolkit');

const transferSlice = createSlice({
	name: 'transfer',
	initialState: {
		transfer: [],
	},
	reducers: {
		pushListTransfer(state, action) {
			const newTransfer = action.payload;
			state.transfer = newTransfer;
		},
	},
});

const { actions, reducer } = transferSlice;
export const { pushListTransfer } = actions;
export default reducer;
