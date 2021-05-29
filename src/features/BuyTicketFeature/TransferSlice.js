const { createSlice } = require('@reduxjs/toolkit');

const transferSlice = createSlice({
	name: 'transfer',
	initialState: {
		transfer: [],
		listTicket: {},
	},
	reducers: {
		pushListTransfer(state, action) {
			const newTransfer = action.payload;
			state.transfer = newTransfer;
		},
		getPostByDateAndTime(state, action) {
			const newTransfer = action.payload;
			state.transfer = newTransfer;
		},
		getListTicket(state, action) {
			const listTicket = action.payload;
			state.listTicket = listTicket;
		},
	},
});

const { actions, reducer } = transferSlice;
export const { pushListTransfer, getListTicket } = actions;
export default reducer;
